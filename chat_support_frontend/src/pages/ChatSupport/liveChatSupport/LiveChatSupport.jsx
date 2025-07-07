import React, { useEffect, useState, useContext, useRef } from 'react';
import { Typography, TextField, IconButton, InputAdornment, Menu, MenuItem, Avatar, Box, ListItemIcon, Divider, Paper, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import arrowWhiteLeft from '@assets/images/arrow-white-left.png';
import addIcon from '@assets/images/attachFileIcon.png';
import sendButton from '@assets/images/live-chat-send-button.png';
import chatIcon from '@assets/images/chat-white-icon.png';
import femaleCsrIcon from '@assets/images/csr-female.png';
import happy from '@assets/images/happy-face.png';
import sad from '@assets/images/sad-face.png';
import closeIcon from '@assets/images/closeZodiacButtons.png';
import maleAvatar from '@assets/images/csr-boy-green.png';
import femaleAvatar from '@assets/images/csr-girl-blue.png';
import endchat from '@assets/images/endchat.png';
import typing from "@assets/images/typing.gif";
import styles from './LiveChatSupport.module.scss';
import FileViewer from '../FileViewer';
import { getRequiredUrl } from '../components/common';
import { checkConvoHasConcern, getConcerns, getConvo, getMessagesByConvoId, rateChat, updateConversationConcernId, updateConversationStatus, updateMessageRead } from '../api/chatSupportAPI';
import { ArrowBack, AttachFile, Chat, ChatBubbleOutline, Close, ExitToApp, MoreVert, Send, SentimentVeryDissatisfied, SentimentVerySatisfied, StarRate, StarRateOutlined } from '@mui/icons-material';
import WebSocketManager from '../../../api_services/WebSocketManager';
import back from "@assets/images/arrow-gray-left.png";
import csicon from "@assets/images/chat-support-white-icon.png";
import send from "@assets/images/live-chat-send-button.png";
import attach from "@assets/images/attachFileIcon.png";

const LiveChatSupport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const [concerns, setConcerns] = useState([]); // Assuming concerns is an array of strings
const [hasChosenConcern, setHasChosenConcern] = useState(false);
const [isChatEnded, setIsChatEnded] = useState(false);
const [showEndChatPrompt, setShowEndChatPrompt] = useState(false);
const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
const [hasReceivedMessage, setHasReceivedMessage] = useState(false);

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [userID, setUserID] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDoneFetchingMessages, setIsDoneFetchingMessages] = useState(false);
  const [showRateChatPrompt, setShowRateChatPrompt] = useState(false);
  const [ticket, setTicket] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [isChatRated, setIsChatRated] = useState(false);
  const [playerConvo, setPlayerConvo] = useState(null);
  const [isCSRTyping, setIsCSRTyping] = useState(false);
  const fileInputRef = useRef(null);
  let userInfo;
  const userInfoString = localStorage.getItem('userInfo');
  const data = localStorage.getItem('data');
  if (userInfoString) {
    const userInfoConverted = JSON.parse(userInfoString);
    userInfo = userInfoConverted;
  }
  
  const url = getRequiredUrl(true, userInfo);
  if (!url) {
    throw new Error(`No valid url: ${url}`);
  }
  const wss = useRef(new WebSocketManager(url)).current;
  const getUserId = async () => {
    setUserID(Number(userInfo.id));
    return Number(userInfo.id);
  };

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
  
      // Convert the file to a base64 string
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64File = reader.result.split(',')[1]; // Get the base64 part (without the data URL prefix)
  
        // Extract the file extension from the file name
        const fileExtension = file.name.split('.').pop(); // Get the extension part
  
        // Generate a unique file name using timestamp and the file extension
        const uniqueFileName = `${new Date().getTime()}.${fileExtension}`;
  
        const messageData = {
          event: 'chatSupportSendMessage',
          data: {
            user: userInfo,
            message: uniqueFileName,  // Use the new unique file name with extension
            conversationId: conversationId,
            isImage: true,
            file: base64File,  // Send the base64 file here
          },
        };
  
        // Now send the message with the image data
        await wss.send(JSON.stringify(messageData));
        setMessage('');
      };
  
      reader.readAsDataURL(file);  // This converts the file into a data URL, then we'll extract base64
    }
  };
  
  

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  const handleBackClick = async () => {
    const userId = await getUserId();
    navigate(
      userInfo.role === 'player'
        ? data ? `/chat-support?data=${data}`: '/chat-support'
        : '/game/live-chat-support-lobby',
      userInfo.role !== 'player' && { state: { userInfo, userId } }
    );
  };

  useEffect(() => {
    if (isDoneFetchingMessages) {
        setTimeout(async () => {
          if (messageList.length === 0) {
            await handleSendMessage(true, "Welcome to Karera.Live! We’re here for you 24/7. How can we assist you today?");
          }
        }, 500); 
    }
  }, [messageList.length, isDoneFetchingMessages]);
  
  
  const { conversationId, csr, playerInfo, convoTicket } = location.state || {};

  

  useEffect(() => {
    if(convoTicket){
      setTicket(convoTicket)
    }
  }, [convoTicket]);

  const handleChooseConcern = async (conversationId, concernId, concern) => {
    try {
      await updateConversationConcernId(Number(conversationId), Number(concernId));
      
      const updatedConversations = {
        event: 'sendSignalToCSLobby',
        data: { csrId: csr.id }
      };
      
      await handleSendMessage(false, concern, true);
      await wss.send(JSON.stringify(updatedConversations));
  
    } catch (err) {
      console.error(err);
    }
  
    setHasChosenConcern(true);
  };
  

  useEffect(() => {
    const checkIfHasConcern = async () => {
      const hasChosenConcern = await checkConvoHasConcern(conversationId);
      setHasChosenConcern(hasChosenConcern.data.hasConcern);
    }

    (async () => {
      if(conversationId && userInfo.role === 'player'){
        const convo = await getConvo(conversationId);
        setPlayerConvo(convo.data);
      }
    })();
    
    checkIfHasConcern();
  }, [conversationId]);

  useEffect(() => {
    (async () => {
      if(conversationId && userInfo.role === 'player'){
        const convo = await getConvo(conversationId);
        setPlayerConvo(convo.data);
      }
    })();
  }, [conversationId, hasChosenConcern]);

  

  const fetchMessages = async () => {
    if (conversationId) {
      try {
        const messages = await getMessagesByConvoId(conversationId);
        if (messages) {
          setMessageList(messages.data);
          setIsDoneFetchingMessages(true);
          if(userInfo.role === 'player'){
            await updateMessageRead(conversationId, userInfo.role);
          }
            
          if(hasReceivedMessage){
            setHasReceivedMessage(false);
          }
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const fetchConversation = async () => {
    if (userInfo.role ==='csr') {
      const convo = await getConvo(conversationId);
      console.log(convo, 'convo')
      setTicket(convo.data.conversation.ticket)
      if(convo.data.conversationStatusUpdates.status === 'Closed'){
        setIsChatEnded(true);
      }else{
        setIsChatEnded(false);
      }

      if(convo.data.chatRate){
        setIsChatRated(true);
      }else{
        setIsChatRated(false);
      }
    }
  };
  

  useEffect(() => {
    fetchConversation();
  }, [selectedButton]);


  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!location.state) {
      handleBackClick();
      return;
    }
  }, [location.state,]);

  useEffect(() => {
    const countPlayerMessages = messageList.filter(message => message.sender_role === 'player').length;
    if(countPlayerMessages === 1){
      setHasSentFirstMessage(true);
    }else{
      setHasSentFirstMessage(false);
    }
  }, [messageList]);

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const response = await getConcerns();
        const concernsData = response.data;
        if (concernsData.length > 1) {
          setConcerns(concernsData);
        }
      } catch (error) {
        console.error('Error fetching concerns:', error);
      }
    };

    fetchConcerns();
  }, []);
  

  useEffect(() => {
    const handleMessage = async (event) => {
      const { event: eventType, data } = JSON.parse(event.data);
      if (eventType === 'chatSupportReceiveMessage') {
        if (conversationId === data.conversationId) {
          try {
            setHasReceivedMessage(true);
            fetchMessages();
            const updateMessageReadStatus = {
              event: 'updateMessageReadStatus',
              data: {
                conversationId
              },
            };
      
            // Send the message to WebSocket
            await wss.send(JSON.stringify(updateMessageReadStatus));
        
          } catch (error) {
            console.error('Error handling incoming messages:', error);
          }
        }
      }

      if (eventType === 'receiveEndChatPrompt') {
        if (conversationId === data.conversationId) {
          setShowEndChatPrompt(true); 
        }
      }

      if (eventType === 'receiveEndChatReponseSignal') {
        if (conversationId === data.conversationId) {
          await fetchConversation();
        }
      }

      if (eventType === 'receiveTypingSignal') {
        if (conversationId === data.conversationId && data.role === 'csr') {
          // Check if data.message is not an empty string
          if (data.message && data.message.trim() !== '') {
            setIsCSRTyping(true);  // Set to true if message is not empty
          } else {
            setIsCSRTyping(false); // Set to false if message is empty
          }
        }
      }

      if (eventType === 'receiveRateChatReponseSignal') {
        if (conversationId === data.conversationId) {
          await fetchConversation();
        }
      }

      if (eventType === 'receiveRateChatPrompt') {
        if (conversationId === data.conversationId) {
          setShowRateChatPrompt(true); 
        }
      }

      if (eventType === 'receiveUpdateMessageReadStatus') {
        if (conversationId === data.conversationId) {
          try {
            // Adding a 1-second delay
            await new Promise(resolve => setTimeout(resolve, 1000));
      
            // Fetch messages after the delay
            const messages = await getMessagesByConvoId(conversationId);
            if (messages) {
              setMessageList(messages.data);
            }
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        }
      }

      if (eventType === 'receivedTicketUpdate') {
          if (conversationId === data.conversationId) {
              // Wait for 1 second before fetching the conversation
              await new Promise(resolve => setTimeout(resolve, 1000));
              await fetchConversation();
          }
      }
    

      if (eventType === 'websocketPinging') {
        const message = data.message;
        // console.log(message);
      }
    };
  
    wss.setOnMessage(handleMessage);
  
  }, [wss, conversationId, userInfo]);

  useEffect(() => {
    wss.connect();
    return () => {
      wss.close();
    };
  }, [wss]);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const usedChars = new Set();

  function getUniqueRandomCharacter() {
    if (usedChars.size === characters.length) {
      throw new Error('No more unique characters available.');
    }

    let char;
    do {
      const randomIndex = Math.floor(Math.random() * characters.length);
      char = characters[randomIndex];
    } while (usedChars.has(char));

    usedChars.add(char);
    return char;
  }
  
  
  const handleSendMessage = async (csrAutoMessage = false, concern = false, playerAutoSend = false) => {
    let messageData;
    
    // Handle auto messages first
    if (csrAutoMessage && !concern && csr && hasSentFirstMessage) {
      messageData = {
        event: 'chatSupportSendMessage',
        data: { user: { id: csr.id }, message: "Please tell us your concern", conversationId }
      };
    } else if (csrAutoMessage && concern && csr) {
      messageData = {
        event: 'chatSupportSendMessage',
        data: { user: { id: csr.id }, message: concern, conversationId }
      };
    } else if (!csrAutoMessage && concern && playerAutoSend && userInfo.role === 'player') {
      messageData = {
        event: 'chatSupportSendMessage',
        data: { user: { id: userInfo.id }, message: concern, conversationId }
      };
    } else if (message.trim()) {
      // Trim leading/trailing spaces only for the message being sent
      messageData = {
        event: 'chatSupportSendMessage',
        data: { user: userInfo, message: message.trim(), conversationId }
      };
    }
    
    // If there’s a valid messageData, send it
    if (messageData) {
      await wss.send(JSON.stringify(messageData));
      setMessage('');
    }
  };
  

  useEffect(() => {
    const trigger = async () => {
      if(hasSentFirstMessage){
        await handleSendMessage(true);
      }
    }
    trigger();
  }, [hasSentFirstMessage]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setMessage(input.trim() === '' ? '' : input);
};

useEffect(() => {
  const sendTypingSignal = async () => {
    try {
      const signalData = {
        event: 'sendTypingSignal',
        data: {
          conversationId,
          message,
          role: 'player'
        },
      };

      // Send the message to WebSocket
      wss.send(JSON.stringify(signalData));
    } catch (error) {
      console.error('Error sending typing signal:', error);
    }
  };

  sendTypingSignal();

}, [message]);



  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      if (id) {
        setUserID(id);
      }
    };

    fetchUserId();
  }, []);

  const handleMenuClick = () => {
    setDropdownOpen(prev => !prev); // Toggle dropdown open/close
  };

  const handleEndChat = async () => {
    const endChatPrompt = {
      event: 'sendEndChatPrompt',
      data: { playerInfo, conversationId }
    };

    await wss.send(JSON.stringify(endChatPrompt));
  };

  const handleRateChat = async () => {
    const rateChatPrompt = {
      event: 'sendRateChatPrompt',
      data: { playerInfo, conversationId }
    };

    await wss.send(JSON.stringify(rateChatPrompt));
  };

  const handleSendTicketUpdate = async () => {
    const ticketUpdateData = {
      event: 'sendTicketUpdate',
      data: { conversationId }
    };

    await wss.send(JSON.stringify(ticketUpdateData));
  };

  const rateRespondRateChat = async (rate) => {
    let player_id = 0;
    if(userInfo.role === 'player'){
      player_id = Number(userInfo.id);
    }
    await rateChat(player_id, csr.id, conversationId, rate);
    const rateChatReponseSignalToCsr = {
      event: 'rateChatReponseSignalToCsr',
      data: { conversationId }
    };

    await wss.send(JSON.stringify(rateChatReponseSignalToCsr));
    setShowRateChatPrompt(false);
  };

  const handleClosePrompt = () => {
    setShowEndChatPrompt(false);
  };

  const handleConfirmEndChat = async () => {
    await updateConversationStatus(Number(conversationId), "Closed");
    setIsChatEnded(true);
    setShowEndChatPrompt(false);

    const endChatReponseSignalToCsr = {
      event: 'endChatReponseSignalToCsr',
      data: { conversationId }
    };

    await wss.send(JSON.stringify(endChatReponseSignalToCsr));

    await handleSendMessage(true, "Thank you! Don't hesitate to contact us if you have any questions.");
  };

  const defaultAvatar = csr?.gender === 1 ? maleAvatar : femaleAvatar;


  return (
    <div id={styles.container}>
      <div id={styles.header}>
      <IconButton onClick={handleBackClick} sx={{ color: 'white' }}>
        <Box
          component="img"
          src={back}
          alt="attach"
          sx={{ width: 20}}
        />
      </IconButton>
      
      <div id={styles.csrInfo}>
        <Avatar src={defaultAvatar} sx={{ width: 40, height: 40 }} />
        <Typography variant="body2" id={styles.csrName} sx={{ color: 'black', ml: 1 }}>
          {csr && userInfo.role === 'player' && (
            <>
              <Box component="span" sx={{ fontWeight: 'bold' }}>CS </Box>
              {csr.nickName}
              {playerConvo?.conversation?.ticket && (
                <>
                  <br />
                  <Box component="span" sx={{ fontSize: 13 }}>{playerConvo.conversation.ticket}</Box>
                </>
              )}
            </>
          )}
          {playerInfo && userInfo.role ==='csr' && (
            <>
              <Box component="span" sx={{ fontWeight: 'bold' }}>Player: </Box>
              {playerInfo.first_name}
              <br />
              <Box component="span" sx={{ fontWeight: 'bold' }}>Ticket ID: </Box>
              {ticket}
            </>
          )}
        </Typography>
      </div>
      
      {userInfo.role === 'player' ? (
        <IconButton sx={{ color: 'white', ml: 'auto' }}>
          <Box
          component="img"
          src={csicon}
          alt="attach"
          sx={{ width: 35}}
        />
        </IconButton>
      ) : (
        <>
            <IconButton
              id={styles.menuButton}
              onClick={handleMenuClick}
              sx={{ marginLeft: 'auto' }}
            >
              <span>•••</span>
            </IconButton>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div
                  className={`${styles.dropdownItem} ${selectedButton === 'end' || isChatEnded ? styles.selected : ''}`}
                  onClick={() => { setSelectedButton('end'); handleEndChat(); }}
                  style={{pointerEvents: isChatEnded ? 'none' : 'auto'}}
                >
                  End
                </div>
                <div
                  className={`${styles.dropdownItem} ${selectedButton === 'rate' || isChatRated  ? styles.selected : ''}`}
                  onClick={() => { setSelectedButton('rate'); handleRateChat(); }}
                  style={{pointerEvents: isChatRated ? 'none' : 'auto'}}
                >
                  Rate
                </div>
              </div>
            
            )}
          </>
      )}
    </div>

      {/* Messages */}
      <div id={styles.messagesContainer}>
        <div style={{ marginBottom: 65 }}></div>
        {messageList.map((msg, index) => {
          const messageDate = new Date(msg.createdAt);
          const today = new Date();
          
          const formatDate = (date) => {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options).toUpperCase();
          };

          const isToday = messageDate.toDateString() === today.toDateString();
          const displayDate = isToday ? `TODAY ${formatDate(today)}` : formatDate(messageDate);

          const showDateDivider = 
            index === 0 || new Date(messageList[index - 1].createdAt).toDateString() !== messageDate.toDateString();

          return (
            <Box key={msg.message_id} sx={{ mb: 1 }}>
              {showDateDivider && (
                <Divider sx={{ my: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontFamily: "'Baloo 2', sans-serif", }}>
                    {displayDate}
                  </Typography>
                </Divider>
              )}

              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender_id === Number(userInfo.id) ? 'flex-end' : 'flex-start',
              }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  mb: 0.5
                }}>
                  <Typography variant="caption" sx={{ 
                    color: 'text.secondary',
                    mr: 1,
                    fontFamily: "'Baloo 2', sans-serif",
                  }}>
                    {msg.sender_id === Number(userInfo.id) ? 'You' : msg.sender_nickName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled',fontFamily: "'Baloo 2', sans-serif", }}>
                    {messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>

                <Paper elevation={0} sx={{
                  p: 1.2,
                  bgcolor: msg.sender_id === Number(userInfo.id) ? '#00A24A' : 'background.paper',
                  color: msg.sender_id === Number(userInfo.id) ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 3,
                  maxWidth: '80%',
                  ...(msg.isImage && { 
                    p: 0,
                    bgcolor: 'transparent',
                    boxShadow: 'none'
                  })
                }}>
                  {msg.isImage ? (
                    <FileViewer file={msg.message_text} />
                  ) : (
                    <Typography variant="body2" sx={{fontFamily: "'Baloo 2', sans-serif",}}>{msg.message_text}</Typography>
                  )}
                </Paper>

                {msg.sender_id === Number(userInfo.id) && (
                  <Typography variant="caption" sx={{ 
                    color: 'text.disabled',
                    mt: 0.5,
                    mr: 0.5
                  }}>
                    {msg.isReadByCsr ? 'Read' : 'Sent'}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
        
        {isCSRTyping && (
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 1,
              mb: 2,
              ml: 1,
              animation: 'fadeIn 0.3s ease',
              fontStyle: 'italic',
              color: 'text.secondary',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary',fontFamily: "'Baloo 2', sans-serif", }}>
              {csr?.nickName || 'CSR'} is typing
            </Typography>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 36,
                px: 2,
                py: 1,
                background:'transparent',
                borderRadius: 4,
                position: 'relative',
                left: -15,
              }}
            >
              {/* Typing animation dots */}
              <Box 
                sx={{
                  display: 'inline-block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: 'gray',
                  mr: 0.5,
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: '0s'
                }} 
              />
              <Box 
                sx={{
                  display: 'inline-block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: 'gray',
                  mr: 0.5,
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: '0.2s'
                }} 
              />
              <Box 
                sx={{
                  display: 'inline-block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: 'gray',
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: '0.4s'
                }} 
              />
            </Box>
            
            {/* Animation keyframes */}
            <style>{`
              @keyframes bounce {
                0%, 80%, 100% { transform: translateY(0) }
                40% { transform: translateY(-5px) }
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(5px) }
                to { opacity: 1; transform: translateY(0) }
              }
            `}</style>
          </Box>
        )}

        {userInfo.role === "player" && hasSentFirstMessage && !hasChosenConcern && (
          <Box id={styles.inChatButtons}>
            {concerns.map((concern) => (
              <Button
                key={concern.id}
                variant="outlined"
                onClick={() => {
                  handleSendTicketUpdate();
                  handleChooseConcern(conversationId, concern.id, concern.concern_type);
                }}
                sx={{
                  borderRadius: 5,
                  border: '1px solid #FFE400',
                  fontFamily: "'Baloo 2', sans-serif",
                  color: '#1A1A1A',
                  background: '#FFE4002E'
                }}
              >
                {concern.concern_type}
              </Button>
            ))}
          </Box>
        )}

        {!hasChosenConcern && hasSentFirstMessage && csr && (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            mb: 1
          }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {csr.nickName}
            </Typography>
            <Paper elevation={0} sx={{ 
              p: 1.5,
              bgcolor: 'background.paper',
              borderRadius: 2,
              maxWidth: '80%'
            }}>
              <Typography variant="body2" sx={{fontFamily: "'Baloo 2', sans-serif",}}>Kindly choose a concern.</Typography>
            </Paper>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* End Chat Dialog */}
      <Dialog 
        open={showEndChatPrompt} 
        onClose={handleClosePrompt}
        PaperProps={{
          sx: {
            borderRadius: 10,
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #f5f5f5, #ffffff)',
            boxShadow: '0 10px 30px rgba(82, 164, 71, 0.2)',
            transform: showEndChatPrompt ? 'scale(1)' : 'scale(0.9)',
            transition: 'transform 0.3s ease',
            maxWidth: '400px'
          }
        }}
      >
        <Box sx={{
          background: 'linear-gradient(180deg, #FF2020 0%, #C80000 100%)',
          color: 'white',
          p: 2,
          textAlign: 'center'
        }}>
          <DialogTitle sx={{ 
            color: 'inherit',
            fontSize: '1.5rem',
            fontWeight: 600,
            p: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Baloo 2', sans-serif",
          }}>
            End Chat Session
          </DialogTitle>
        </Box>
        
        <DialogContent sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
          color: 'primary.main'
        }}>
          <img 
            src={endchat} 
            alt="End chat" 
            style={{
              width: 70,
            }}
          />
        </Box>
          <Typography variant="h6" sx={{ mb: 1,fontFamily: "'Baloo 2', sans-serif", }}>
            Are you sure?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontFamily: "'Baloo 2', sans-serif" }}>
            This will end your current chat<br />
            session permanently.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3,
          justifyContent: 'center',
          gap: 2
        }}>
          <Button 
            onClick={handleClosePrompt}
            variant="outlined"
            sx={{
              borderRadius: 10,
              px: 4,
              py: 1,
              width:'50%',
              border:'1px solid gray',
              color: 'text.primary',
              fontFamily: "'Baloo 2', sans-serif",
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmEndChat}
            variant="contained"
            sx={{
              borderRadius: 10,
              px: 4,
              py: 1,
              width:'50%',
              fontFamily: "'Baloo 2', sans-serif",
              background: 'linear-gradient(180deg, #FF2020 0%, #C80000 100%)',
              boxShadow: '0 3px 5px rgba(82, 164, 71, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, rgb(72, 154, 61), rgb(62, 144, 51))',
                boxShadow: '0 5px 8px rgba(82, 164, 71, 0.4)'
              }
            }}
          >
            End
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rate Chat Dialog */}
      <Dialog
        open={showRateChatPrompt}
        onClose={() => setShowRateChatPrompt(false)}
        PaperProps={{
          sx: {
            borderRadius: 10,
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #f5f5f5, #ffffff)',
            boxShadow: '0 10px 30px rgba(82, 164, 71, 0.2)',
            transform: showRateChatPrompt ? 'scale(1)' : 'scale(0.9)',
            transition: 'transform 0.3s ease',
            maxWidth: '450px'
          }
        }}
      >
        <Box sx={{
          background: 'linear-gradient(360deg, #009135 0%, #00CB60 100%)',
          color: 'white',
          p: 2,
          textAlign: 'center'
        }}>
          <DialogTitle sx={{ 
            color: 'inherit',
            fontSize: '1.5rem',
            fontWeight: 600,
            p: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Baloo 2', sans-serif",
          }}>
            Rate Your Experience
          </DialogTitle>
        </Box>
        
        <DialogContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 3,fontFamily: "'Baloo 2', sans-serif", }}>
            Did we solve your concern?
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: 4,
            mb: 3
          }}>
            <Box 
              onClick={() => rateRespondRateChat('Happy')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1
              }}>
                <img 
                  src={happy} 
                  alt="Happy" 
                  style={{
                    width: 80
                  }}
                />
              </Box>
              <Typography variant="body1" sx={{ 
                fontWeight: 500,
                color: '#FFC024',
                fontFamily: "'Baloo 2', sans-serif",
              }}>
                Yes
              </Typography>
            </Box>
            
            <Box 
              onClick={() => rateRespondRateChat('Sad')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1
              }}>
                <img 
                  src={sad} 
                  alt="Sad" 
                  style={{
                    width: 80
                  }}
                />
              </Box>
              <Typography variant="body1" sx={{ 
                fontWeight: 500,
                color: 'text.primary',
                fontFamily: "'Baloo 2', sans-serif",
              }}>
                No
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ 
            color: 'text.secondary',
            fontFamily: "'Baloo 2', sans-serif",
          }}>
            Your feedback helps us improve our service
          </Typography>
        </DialogContent>
      </Dialog>


      {/* Footer */}
      {isChatEnded && <div id={styles.chatEndedMessage} style={{fontFamily: "'Baloo 2', sans-serif",}}>The chat session has ended</div>}
      {!isChatEnded && <div style={{ display: 'flex', alignItems: 'center', width: '95.5%', padding: '16px', boxSizing: 'border-box',position:'fixed', bottom:0 }}>
        <TextField
          variant="outlined"
          placeholder="Type your message"
          id={styles.messageInput}
          value={message}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') handleSendMessage();
          }}
          sx={{
            flex: 1,  // Make the TextField take up available space
            '& .MuiInputBase-input': {
              padding: '0px',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'white',
              '& fieldset': {
                borderColor: 'lightgray', // Default border color
              },
              '&:hover fieldset': {
                borderColor: 'lightgray', // Border color on hover (still gray)
              },
              '&.Mui-focused fieldset': {
                borderColor: 'lightgray', // Border color when focused (now gray)
              },
            },
          }}
          multiline
          minRows={1}
          maxRows={3}
          disabled={!hasChosenConcern && hasSentFirstMessage || isChatEnded}
          InputProps={{
            endAdornment: (
              <IconButton
                id={styles.sendButton}
                sx={{ padding: 0, minWidth: 'unset', height: 25, width: 25 }}
                onClick={() => handleSendMessage()}
              >
                <Box
                  component="img"
                  src={send}
                  alt="attach"
                  sx={{ width: 20}}
                />
              </IconButton>
            ),
          }}
        />

        <IconButton
          id={styles.addIconButton}
          sx={{ padding: 0, minWidth: 'unset', height: 25, width: 25, margin: 'auto' }}
          onClick={handleAddIconClick}
          disabled={!hasChosenConcern && hasSentFirstMessage || isChatEnded}
        >
          <Box
            component="img"
            src={attach}
            alt="attach"
            sx={{ width: 30}}
          />
        </IconButton>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}  // Hides the input
          accept="image/*"
          onChange={handleFileSelection}
        />
      </div>}



    </div>

  );
};

export default LiveChatSupport;
