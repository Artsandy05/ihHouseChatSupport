import WebSocket from 'ws';
import { hasValue } from '../../../common/gameutils';
import Message from '../../models/Message'; 
import Conversation from '../../models/Conversation';
import User from '../../models/User';
import { GameData } from '../game/Code';
import { makeLog } from '../../utils/logic';
import Log from '../../models/Log';
import { Op } from 'sequelize';
import createEncryptor from '../../utils/createEncryptor';

const fs = require('fs');
const path = require('path');

interface UserInfo {
  id: number;                           // User's ID
  uuid: string;                         // Unique identifier (UUID)
  firstName: string;                    // First name of the user
  lastName: string;                     // Last name of the user
  nickName: string;                     // Nickname of the user
  role: string;                         // Role (e.g. 'player')
  mobile: string;                       // Mobile number of the user
  isActive: boolean;                    // Whether the user is active or not
  game: string;                         // Game the user is associated with (e.g. 'zodiac', 'dos')
  isPlayerInChatSupport?: boolean;      // Optional: Indicates if the player is in chat support
}

const wss = new WebSocket.Server({ noServer: true });
const clients: Set<WebSocket> = new Set();
const activeCSR: Set<WebSocket> = new Set<UserInfo>();
const activePlayer: Set<WebSocket> = new Set<UserInfo>();
const activePlayerInChatSupport: Set<WebSocket> = new Set<UserInfo>();
const PING_INTERVAL_CONN_USERS = 1000;
let pingIntervalIdConnUsers: NodeJS.Timeout | null = null;
const encryptor = createEncryptor(process.env.ENCRYPTION_SECRET);



const PING_INTERVAL = 10000;
let pingIntervalId: NodeJS.Timeout | null = null;

function liveChat(fastify) {
  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "src/live_chat"), // Path to your chatImages folder
    prefix: `${process.env.PREFIX}/imgs`,  // The prefix for frontend access
  });
  
  fastify.server.on('upgrade', async (request, socket, head) => {
    const url = new URL(request.url, 'http://localhost');
    const path = url.pathname;
    
    if (path === '/api/livechat') {
      try {
        const queryParams = url.searchParams;
        const encryptedUserInfo = queryParams.get('userInfo');
        let isPlayerInChatSupport = queryParams.get('isPlayerInChatSupport');
        if (hasValue(encryptedUserInfo)) {
          const decrypted = encryptor.decryptParams(encryptedUserInfo);
          const userData: UserInfo = decrypted;
            if (hasValue(isPlayerInChatSupport)) {
              const booleanValueIsPlayerInChatSupport = JSON.parse(isPlayerInChatSupport.toLowerCase());
              userData.isPlayerInChatSupport = booleanValueIsPlayerInChatSupport;
            }else{
              userData.isPlayerInChatSupport = false;
            }
          wss.handleUpgrade(request, socket, head, async (ws) => {
            wss.emit('connection', ws, userData);
          });
        }
        
      } catch (err) {
        console.error('JWT token verification failed:', err.message);
        socket.destroy();
      }
    }
  });
  
  wss.on('connection', async (socket: WebSocket, userData) => {
    console.log(`User connected: ${JSON.stringify(userData.id)}`);
    let finalUserInfo;

    

    const userDataTransformed = {
        id: userData ? userData.id : parseInt(userData.id),
        firstName: userData.first_name || userData.firstName,
        lastName: userData.last_name || userData.lastName,
        mobile: userData.mobile_number || userData.mobile,
        email: userData.email || userData.email,
        role: userData.role, 
        isActive: true,
        status: 'active',
        isMobileVerified: true,
        actionStatus: 'approved'
    };

    const [user, created] = await User.findOrCreate({
        where: { id: userDataTransformed.id },
        defaults: userDataTransformed
    });

    // If user was found (not created), update with any new data
    if (!created) {
        await user.update(userDataTransformed);
    }
    

    finalUserInfo = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        nickName: user.nickName,
        role: user.role,
        mobile: user.mobile,
        isActive: user.isActive,
        game: userData.game,
        isPlayerInChatSupport: userData.isPlayerInChatSupport
    };
    

    if (finalUserInfo.role === 'player' && !finalUserInfo.isPlayerInChatSupport) {
        await User.update(
            { isActive: false }, // Set isActive to false
            { where: { id: finalUserInfo.id } } // Update the user with the specific uuid
        );

        const response = JSON.stringify({
          event: 'updateActivestatus',
          data: {activeStatusUpdated:true}
        });
        
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
    }

    if (finalUserInfo.role === 'player' && finalUserInfo.isPlayerInChatSupport) {
        await User.update(
            { isActive: true }, // Set isActive to false
            { where: { id: finalUserInfo.id } } // Update the user with the specific uuid
        );
        const response = JSON.stringify({
          event: 'updateActivestatus',
          data: {activeStatusUpdated:true}
        });
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
    }
    
    
    if (finalUserInfo.role === 'csr') {
      activeCSR.add(finalUserInfo);
    
      const currentTimestamp = new Date();
      const startTimestamp = new Date(currentTimestamp.getTime() - 60000); // 1 minute before
      const endTimestamp = new Date(currentTimestamp.getTime() + 60000); // 1 minute after
    
      try {
        // Deleting logs within a 1-minute range of currentTimestamp
        const deletedExistingLog = await Log.destroy({
          where: {
            associatedId: finalUserInfo.id,
            createdAt: {
              [Op.between]: [startTimestamp, endTimestamp], // Matches logs within 1 minute range
            },
            description: "CSR Active",
            functionality: "CSRActiveStatus"
          }
        });
    
    
        // Creating the new log after deletion
        await makeLog(
          `${finalUserInfo?.firstName && finalUserInfo?.lastName
            ? finalUserInfo.firstName + " " + finalUserInfo.lastName + " has been active."
            : finalUserInfo?.uuid + " User Active"}`,
          "CSRActiveStatus",
          "success",
          finalUserInfo?.id,
          "user",
          "CSR Active"
        );
      } catch (error) {
        console.error("Error while deleting or creating log:", error);
      }
    }

    if(finalUserInfo.role === 'player' && finalUserInfo.game !== null){
      activePlayer.add(finalUserInfo);
    }

    if(finalUserInfo.role === 'player' && finalUserInfo.isPlayerInChatSupport){
      activePlayerInChatSupport.add(finalUserInfo);
    }
    
    clients.add(socket);

    socket.on('message', async (message) => {
      const data = JSON.parse(message.toString());
      let gameData: GameData;
      if (data.event === 'sendMessage') {
        const response = JSON.stringify({
          event: 'receiveMessage',
          data: data.data
        });

        
        clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) { 
            client.send(response);
          }
        });
      }

      if (data.event === 'sendSignalToCSLobby') {
        const response = JSON.stringify({
          event: 'receiveSignalFromCSPage',
          data: data.data
        });
        clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }

      if (data.event === 'rateChatReponseSignalToCsr') {
        const response = JSON.stringify({
          event: 'receiveRateChatReponseSignal',
          data: data.data
        });
        clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }

      if (data.event === 'endChatReponseSignalToCsr') {
        const response = JSON.stringify({
          event: 'receiveEndChatReponseSignal',
          data: data.data
        });
        clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }

      
      
      
      if (data.event === 'sendEndChatPrompt') {
        const response = JSON.stringify({
          event: 'receiveEndChatPrompt',
          data: data.data
        });
        clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }

      if (data.event === 'sendRateChatPrompt') {
        const response = JSON.stringify({
          event: 'receiveRateChatPrompt',
          data: data.data
        });
        clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }
      if (data.event === 'sendTicketUpdate') {
        const { conversationId } = data.data;
        const response = JSON.stringify({
          event: 'receivedTicketUpdate',
          data: {conversationId}
        });
        clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }
      

      if (data.event === 'sendTriggerSendGift') {
        const response = JSON.stringify({
          event: 'receivedTriggerSendGift',
          data: data.data
        });
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }

      if (data.event === 'sendGiftImagePopup') {
        const response = JSON.stringify({
          event: 'receivedGiftImagePopup',
          data: data.data
        });
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }

      if (data.event === 'sendDeactivateUserTrigger') {
        const response = JSON.stringify({
          event: 'receiveTriggerDeactivateUser',
          data: data.data
        });
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }

      if (data.event === 'get') {
        const response = JSON.stringify({
          event: 'receiveTriggerDeactivateUser',
          data: data.data
        });
        clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }
    
        if (data.event === 'sendDeactivateUserTrigger') {
          const response = JSON.stringify({
            event: 'receiveTriggerDeactivateUser',
            data: data.data.userId
          });
          clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(response);
            }
          });
        }

        if (data.event === 'sendTypingSignal') {
          const response = JSON.stringify({
            event: 'receiveTypingSignal',
            data: data.data
          });
          clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(response);
            }
          });
        }

        if (data.event === 'updateMessageReadStatus') {
          const response = JSON.stringify({
            event: 'receiveUpdateMessageReadStatus',
            data: data.data
          });
          clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(response);
            }
          });
        }
    

      if (data.event === 'chatSupportSendMessage') {
        const { user, message, conversationId, isImage, file } = data.data;
        
        const userFullData = await User.findByPk(user.id);

        if (isImage && file) {
          // Ensure the directory exists
          const chatImagesDir = path.join(__dirname, `../../public/uploads/images/chatImages`); 
          if (!fs.existsSync(chatImagesDir)) {
              fs.mkdirSync(chatImagesDir, { recursive: true });
          }
  
          // Define the image file path using the message as the filename
          const sanitizedFileName = sanitizeFileName(message);  // Apply sanitization
          const filePath = path.join(chatImagesDir, sanitizedFileName);
  
          // Decode the base64 string and save the image
          const buffer = Buffer.from(file, 'base64');
          fs.writeFileSync(filePath, buffer);  // Write the decoded file to the disk
        }
  
  
        await Message.create({
          conversation_id: conversationId,
          sender_id: userFullData.id,
          message_text: message,
          isRead: false,
          isImage: isImage ? isImage : false,
          isReadByCSR:user.role === 'csr' ? true : false
        });
      
        const messages = await Message.findAll({ where: { conversation_id: conversationId } });
        const conversation = await Conversation.findByPk(conversationId);

        const player = await User.findOne({ where: { id: conversation.player_id } });
        const csr = await User.findOne({ where: { id: conversation.csr_id } });
        const sender = await User.findByPk(userFullData.id);

        const formattedMessages = await Promise.all(messages.map(async (msg) => {
            const senderInfo = await getSenderInfo(msg.sender_id);
            return {
                message_id: msg.id,
                conversation_id: msg.conversation_id,
                sender_id: msg.sender_id,
                message_text: msg.message_text,
                createdAt: msg.createdAt,
                sender_nickName: senderInfo.nickName,
                player_nickName: player.nickName,
                csr_nickName: csr.nickName,
                sender_role: senderInfo.role,
            };
        }));

        const response = JSON.stringify({
          event: 'chatSupportReceiveMessage',
          data: { messages: formattedMessages, conversationId, csr, senderRole:user.role },
        });
      
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(response);
          }
        });
      }
      
    });

    socket.on('close', async (code, reason) => {
      const userId = finalUserInfo.id; 
      
      // Iterate through the map and check the uuid of each key (which should be an object)
      activePlayer.forEach((value, key) => {
          // Assuming key is an object, and we need to compare its uuid with the userId
          if (key.id === userId) {
              activePlayer.delete(key); // Remove the entry based on the object key
          }
      });
  
      console.log(`User disconnected with code: ${code} and reason: ${reason}`);
      
      clients.delete(socket);
      activeCSR.delete(finalUserInfo);

      if (finalUserInfo.role === 'player' && !finalUserInfo.isPlayerInChatSupport) {
          await User.update(
              { isActive: false }, // Set isActive to false
              { where: { id: finalUserInfo.id } } // Update the user with the specific uuid
          );
          const response = JSON.stringify({
            event: 'updateActivestatus',
            data: {activeStatusUpdated:true}
          });
          clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(response);
            }
          });
      }
      
      
  
      if (finalUserInfo.role === 'csr') {
          await User.update(
              { isActive: false }, // Set isActive to false
              { where: { id: finalUserInfo.id } } // Update the user with the specific uuid
          );
          const currentTimestamp = new Date();
          const startTimestamp = new Date(currentTimestamp.getTime() - 60000); // 1 minute before
          const endTimestamp = new Date(currentTimestamp.getTime() + 60000); // 1 minute after
        
          try {
            // Deleting logs within a 1-minute range of currentTimestamp
            const deletedExistingLog = await Log.destroy({
              where: {
                associatedId: finalUserInfo.id,
                createdAt: {
                  [Op.between]: [startTimestamp, endTimestamp], // Matches logs within 1 minute range
                },
                description: "CSR Inactive",
                functionality: "CSRActiveStatus"
              }
            });
        
        
            // Creating the new log after deletion
            await makeLog(
              `${finalUserInfo?.firstName && finalUserInfo?.lastName
                ? finalUserInfo.firstName + " " + finalUserInfo.lastName + " has been inactive."
                : finalUserInfo?.id + " User Inactive"}`,
              "CSRActiveStatus",
              "success",
              finalUserInfo?.id,
              "user",
              "CSR Inactive"
            );
          } catch (error) {
            console.error("Error while deleting or creating log:", error);
          }
      }
    });
  
  
  
  });

  startPingInterval();

  function sanitizeFileName(fileName) {
      return fileName
          .replace(/[<>:"/\\|?*]/g, '_')   // Replace unsafe characters with underscores
          .replace(/\s+/g, '_')            // Replace spaces with underscores
          .toLowerCase();                  // Optionally convert to lowercase
  }

  function extractTokenFromURL(url) {
    const urlParts = url.split('?');
    if (urlParts.length > 1) {
      const queryParams = new URLSearchParams(urlParts[1]);
      return queryParams.get('token');
    }
    return null;
  }

  async function updateConnectedClientsCount(){
    const uniqueActivePlayers = new Set<UserInfo>();
    const activePlayerArray = Array.from(activePlayer);

    // Iterate over the array and add unique users to the Set based on the `uuid`
    activePlayerArray.forEach(user => {
        if (![...uniqueActivePlayers].some(existingUser => existingUser.id === user.id)) {
            uniqueActivePlayers.add(user);
        }
    });
    let connectedClients = {zodiac:0, dos: 0, tres: 0};
    //console.log(uniqueActivePlayers)
    uniqueActivePlayers.forEach(player => {

      if (player.game === 'zodiac') {
        connectedClients.zodiac += 1;
      } else if (player.game === 'dos') {
        connectedClients.dos += 1;
      } else if (player.game === 'tres') {
        connectedClients.tres += 1;
      }
    });

    const response = JSON.stringify({
        event: 'receiveClientsCount',
        data: {
            connectedClients: connectedClients,  // Send updated list of connected clients
        },
    });

    // Send the response to all connected clients
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(response);
        }
    });
  }

  const getSenderInfo = async (id) => {
      const user = await User.findByPk(id);
      return { role: user.role, nickName: user.nickName };
  };

  const verifyToken = async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      console.error('Token verification failed:', err.message);
      reply.code(401).send({ error: 'Token is invalid' });
    }
  };

  
  function startPingInterval() {
    
    pingIntervalId = setInterval(() => {
      const pingMessage = JSON.stringify({
        event: 'websocketPinging',
        data: {
          message: 'Ping'
        }
      });
      clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) { 
          client.send(pingMessage);
        }
      });
    }, PING_INTERVAL);

    pingIntervalIdConnUsers = setInterval(async () => {

      await updateConnectedClientsCount();
    }, PING_INTERVAL_CONN_USERS);
  }
  
  function stopPingInterval() {
    if (pingIntervalId) {
      clearInterval(pingIntervalId);
      pingIntervalId = null;
      console.log('Stopped websocket pinging.');
    }
    if (pingIntervalIdConnUsers) {
      clearInterval(pingIntervalIdConnUsers);
      pingIntervalIdConnUsers = null;
      console.log('Stopped checking conn user.');
    }

  }

  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing WebSocket server.');
    stopPingInterval();
  });
  
  process.on('SIGTERM', async () => {
    console.log('SIGINT signal received: closing WebSocket server.');
    stopPingInterval();
  });

  
}


export default liveChat;
