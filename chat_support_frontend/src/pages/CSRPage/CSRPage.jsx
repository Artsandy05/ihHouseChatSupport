import React, { useContext, useEffect, useRef, useState } from "react";
import upperBg from "@assets/images/desktop-login-bg.png";
import gameHamburger from '@assets/images/game-hamburger.png';
import maleAvatar from '@assets/images/csr-boy-green.png';
import femaleAvatar from '@assets/images/csr-girl-blue.png';
import homeHotIcon from "@assets/images/home-hot-icon.png";
import homeSoonIcon from "@assets/images/home-soon-icon.png";
import pagcorBanner from "@assets/images/home-pagcor-banner.png";
import closeSidebar from "@assets/images/close-icon.png";
import typing from "@assets/images/typing.gif";
import copyIcon from "@assets/images/copyIcon.png";
import threedotsgreen from "@assets/images/3dotsgreen.png";
import threedotsgray from "@assets/images/3dotsgray.png";
import copyIconWhite from "@assets/images/copyIconWhite.png";
import send from "@assets/images/live-chat-send-button.png";
import attach from "@assets/images/attachFileIcon.png";
import { useNavigate } from "react-router-dom";
import { Box, fontStyle, height, width } from "@mui/system";
import { Button, Grid, IconButton, InputAdornment, FormControlLabel, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Drawer, Avatar, Badge, Menu, MenuList } from "@mui/material";
import avatarBlue from '@assets/images/avatar-blue.png';
import happy from '@assets/images/happy-face.png';
import avatarBorder from '@assets/images/avatar-border.png';
import sad from '@assets/images/sad-face.png';
import addIcon from '@assets/images/attachFileIcon.png';
import sendButton from '@assets/images/live-chat-send-button.png';
import notifSoundIcon from '@assets/images/notifSoundIcon.png';
import notificationSound from '@assets/sounds/notifcsr.mp3';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles'
import Switch from "@mui/material/Switch";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileViewer from "../../components/FileViewer";
import WebSocketManager from "../../api_services/WebSocketManager";
import { getRequiredUrl } from "../../utils/common";
import { IMAGE_URL_USER } from "../../constants";
import { getAllConversation, getConvo, getMessagesByConvoId, getPlayerIdByUUID, updateConversationStatus, updateMessageRead } from "../../api_services/chatSupportAPI";
import { ZodiacColorPalette } from "../../constants/constant-representative";
import styles from "./CSRPage.module.scss";
import desktopBg from "@assets/images/desktop-login-bg.png";
import { AttachFile, ChevronRight, Close, Logout, MenuOpen, MenuSharp, SendOutlined, SentimentVeryDissatisfied, SentimentVerySatisfied, VolumeUp, WarningAmber } from "@mui/icons-material";

const CSRPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
 
  const userInfo = user ? user.user : null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [hasReceivedSignal, setHasReceivedSignal] = useState(false);
  const [isPlayerTyping, setIsPlayerTyping] = useState(false);
  const [playerTypingSignal, setPlayerTypingSignal] = useState(null);
  const [selectedPlayerConvo, setSelectedPlayerConvo] = useState({});
  const [messageReceived, setMessageReceived] = useState(null);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [hasReceivedMessage, setHasReceivedMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [selectedButton, setSelectedButton] = useState('');
  const [isChatRated, setIsChatRated] = useState(false);
  const [isCsrReceivedMessage, setIsCsrReceivedMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [ticket, setTicket] = useState('');
  const idleTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds
  let idleTimer;
  const [dialogEnd, setEndChatDialog] = useState(false);
  const [dialogRate, setRatedChatDialog] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [playerActiveStatusUpdated, setPlayerActiveStatusUpdated] = useState(false);
  const [selConvo, setSelConvo] = useState(null); 
  const fileInputRef = useRef(null);
  
  const navigate = useNavigate();

  const handleSoundToggle = (event) => {
    setIsSoundOn(event.target.checked);
  };
  
  const searchedConversations = conversations.filter((conversation) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      conversation.ticket.toLowerCase().includes(searchLower) ||
      conversation.player_firstName.toLowerCase().includes(searchLower) ||
      conversation.player_lastName.toLowerCase().includes(searchLower)
    );
  });

  const [isActivePlayer, setIsActivePlayer] = useState(null);

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64File = reader.result.split(',')[1];
        const fileExtension = file.name.split('.').pop();
        const uniqueFileName = `${new Date().getTime()}.${fileExtension}`;
  
        const messageData = {
          event: 'chatSupportSendMessage',
          data: {
            user: userInfo,
            message: uniqueFileName,
            conversationId: selectedPlayerConvo?.conversationId,
            isImage: true,
            file: base64File,
          },
        };
  
        await wss.send(JSON.stringify(messageData));
        setMessage('');
      };
  
      reader.readAsDataURL(file);
    }
  };
  

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play();
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleForceEndChat = async() => { 
    await updateConversationStatus(Number(selectedPlayerConvo?.conversationId), "Closed");
    setDialogOpen(false);
    fetchConversations();
    setIsChatEnded(true);
  };

  const url = getRequiredUrl(true, userInfo);
  if (!url) {
    throw new Error(`No valid url: ${url}`);
  }
  const wss = useRef(new WebSocketManager(url)).current;

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (selectedPlayerConvo?.playerInfo?.playerUUID) {
        try {
          const player = await getPlayerIdByUUID(selectedPlayerConvo?.playerInfo?.playerUUID);
          setIsActivePlayer(player.data.isActive);
        } catch (error) {
          console.error('Error fetching player data:', error);
        }
      }
    };

    if(playerActiveStatusUpdated){
      fetchPlayerData();
      setPlayerActiveStatusUpdated(false);
    }
  
    fetchPlayerData();
  }, [selectedPlayerConvo, wss, playerActiveStatusUpdated]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleFilterChange = async (filter) => {
    setActiveFilter(filter);
  };
  
  const fetchConversations = async () => {
    try {
      let data;
      if(userInfo){
        switch (activeFilter) {
          case "All":
            data = await getAllConversation(userInfo.id);
            break;
          case "New":
            data = await getAllConversation(userInfo.id, "New");
            break;
          case "Ongoing":
            data = await getAllConversation(userInfo.id, "Ongoing");
            break;
          case "Closed":
            data = await getAllConversation(userInfo.id, "Closed");
            break;
          default:
            data = await getAllConversation(userInfo.id);
            break;
        }
        setConversations(data.data);
      }
      
      if(hasReceivedSignal){
        setHasReceivedSignal(false);
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };
  
  useEffect(() => {
    return () => {
      setIsChatEnded(false);
      setIsChatRated(false);
    };
  }, []);
  
  useEffect(() => {
    if (selectedPlayerConvo.playerInfo) {
      if (selectedPlayerConvo.status === 'Closed') {
        setIsChatEnded(true);
      } else {
        setIsChatEnded(false);
      }
  
      if (selectedPlayerConvo.rate) {
        setIsChatRated(true);
      } else {
        setIsChatRated(false);
      }
    }
  }, [selectedPlayerConvo]);

  const handleUpdateConversationStatus = async (conversation_id, toChangeStatus, currentStatus) => {
    try {
      if(currentStatus === 'New'){
        await updateConversationStatus(Number(conversation_id), toChangeStatus);
      }
    } catch (err) {
      console.error("Failed to update conversation status:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const options = {
      year: 'numeric',
      month: isToday ? undefined : 'short',
      day: isToday ? undefined : 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    return isToday
      ? `Today ${date.toLocaleTimeString([], options)}`
      : date.toLocaleString([], options);
  };

  useEffect(() => {
    if(hasReceivedSignal){
      fetchConversations();
    }
  }, [hasReceivedSignal]);

  console.log(selectedPlayerConvo)

  useEffect(() => {
    wss.connect();
    return () => {
      if(window.location.pathname !== '/csr-page'){
        wss.close();
      }
    };
  }, [wss, window.location]);

  useEffect(() => {
    fetchConversations(); 
  }, [activeFilter]);

  

  useEffect(() => {
    fetchConversation();
  }, [selectedButton]);
  
  const handleInputChange = (e) => {
    const input = e.target.value;
    setMessage(input.trim() === '' ? '' : input);
  };

  const handleSendMessage = async () => {
    let messageData;
    if(message === '') return;
    messageData = {
      event: 'chatSupportSendMessage',
      data: { user: userInfo, message, conversationId:selectedPlayerConvo.conversationId }
    };
  
    if (messageData) {
      await wss.send(JSON.stringify(messageData));
      setMessage('');
    }
  };

  const handleEndChat = async () => {
    const endChatPrompt = {
      event: 'sendEndChatPrompt',
      data: { playerInfo:selectedPlayerConvo.playerInfo, conversationId:selectedPlayerConvo.conversationId }
    };

    await wss.send(JSON.stringify(endChatPrompt));
  };

  const handleRateChat = async () => {
    const rateChatPrompt = {
      event: 'sendRateChatPrompt',
      data: { playerInfo:selectedPlayerConvo.playerInfo, conversationId:selectedPlayerConvo.conversationId }
    };

    await wss.send(JSON.stringify(rateChatPrompt));
  };

  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageList]);

  useEffect(() => {
    if (!messageReceived) return;
    
    const shouldPlaySound = isSoundOn && messageReceived.senderRole === 'player';

    if(messageReceived.messages.length === 1){
      playNotificationSound();
    }
    
    if (!selectedPlayerConvo.conversationId) {
      if (shouldPlaySound) {
        playNotificationSound();
      }
      setMessageReceived(null);
    } else {
      if (selectedPlayerConvo.conversationId !== messageReceived.conversationId && shouldPlaySound) {
        playNotificationSound();
      }
      setMessageReceived(null);
    }
  }, [messageReceived, selectedPlayerConvo, isSoundOn]);

  useEffect(() => {
    if (playerTypingSignal && selectedPlayerConvo.conversationId) {
      const isSameConversation = selectedPlayerConvo.conversationId === playerTypingSignal?.conversationId;
      const hasMessage = playerTypingSignal?.message?.trim() !== '';
  
      setIsPlayerTyping(isSameConversation && hasMessage);
    } else {
      setIsPlayerTyping(false);
    }
  }, [selectedPlayerConvo.conversationId, playerTypingSignal]);
  
  async function getPlayerByUUID(uuid){
    const player = await getPlayerIdByUUID(uuid);
    return player;
  }
  
  const fetchConversation = async () => {
    if (selectedPlayerConvo.playerInfo) {
      try {
        const convo = await getConvo(selectedPlayerConvo.conversationId);
        
        setSelectedPlayerConvo(prevState => ({
          ...prevState,
          convoTicket: convo.data.conversation.ticket,
        }));
        
        setTicket(convo.data.conversation.ticket);
        if (convo.data.conversationStatusUpdates.status === 'Closed') {
          setSelectedPlayerConvo(prevState => ({
            ...prevState,
            status: convo.data.conversationStatusUpdates.status,
          }));
          setIsChatEnded(true);
        } else {
          setIsChatEnded(false);
        }
        
        if (convo.data.chatRate) {
          setSelectedPlayerConvo(prevState => ({
            ...prevState,
            rate: convo.data.chatRate.rate,
          }));
          setIsChatRated(true);
        } else {
          setIsChatRated(false);
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    }
  };
  
  useEffect(() => {
    const handleMessage = async (event) => {
      const { event: eventType, data } = JSON.parse(event.data);
      
      if (eventType === 'chatSupportReceiveMessage') {
        if (selectedPlayerConvo.conversationId === data.conversationId) {
          try {
            setHasReceivedMessage(true);
            
            await updateMessageRead(selectedPlayerConvo.conversationId, userInfo.role);
            const updateMessageReadStatus = {
              event: 'updateMessageReadStatus',
              data: { playerInfo:selectedPlayerConvo.playerInfo, conversationId:selectedPlayerConvo.conversationId }
            };
        
            await wss.send(JSON.stringify(updateMessageReadStatus));

            fetchMessages();
            fetchConversation();
            fetchConversations();
          } catch (error) {
            console.error('Error handling incoming messages:', error);
          }
        }else{
          if(data.csr.id === userInfo.id){
            fetchConversations();
            setMessageReceived(data);
            return;
          }
        }
      }

      if (eventType === 'receiveEndChatReponseSignal') {
        if (selectedPlayerConvo.conversationId === data.conversationId) {
          fetchConversation();
          fetchConversations();
        }
      }

      if (eventType === 'receiveTypingSignal') {
        if(data?.role === 'player'){
          setPlayerTypingSignal(data);
        }
      }
      
      if (eventType === 'receiveUpdateMessageReadStatus') {
        if (selectedPlayerConvo?.conversationId === data.conversationId) {
          try {
            await new Promise(resolve => setTimeout(resolve, 1000));
      
            const messages = await getMessagesByConvoId(selectedPlayerConvo?.conversationId);
            if (messages) {
              setMessageList(messages.data);
            }
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        }
      }

      if (eventType === 'updateActivestatus') {
        fetchConversation();
        fetchConversations();
        setPlayerActiveStatusUpdated(true);
      }

      if (eventType === 'receiveRateChatReponseSignal') {
        if (selectedPlayerConvo.conversationId === data.conversationId) {
          fetchConversation();
          fetchConversations();
        }
      }

      if (eventType === 'receivedTicketUpdate') {
          if (selectedPlayerConvo.conversationId === data.conversationId) {
              await new Promise(resolve => setTimeout(resolve, 1000));
              fetchConversation();
              fetchConversations();
          }
      }
      if (eventType === 'receiveSignalFromCSPage' && data.csrId === userInfo.id) {
        setHasReceivedSignal(true);
      }
      if (eventType === 'websocketPinging') {
        const message = data.message;
      }
    };
  
    wss.setOnMessage(handleMessage);
  
  }, [wss, selectedPlayerConvo, userInfo, isSoundOn]);

  useEffect(() => {
    const sendTypingSignal = async () => {
      try {
        const signalData = {
          event: 'sendTypingSignal',
          data: {
            conversationId:selectedPlayerConvo?.conversationId,
            message,
            role: 'csr'
          },
        };
  
        wss.send(JSON.stringify(signalData));
      } catch (error) {
        console.error('Error sending typing signal:', error);
      }
    };
  
    sendTypingSignal();
  
  }, [message]);

 

  useEffect(() => {
    fetchMessages();
    const fetchAndUpdateMessages = async () => {
      if (selectedPlayerConvo) {
        const updateMessageReadStatus = {
          event: 'updateMessageReadStatus',
          data: {
            playerInfo: selectedPlayerConvo.playerInfo,
            conversationId: selectedPlayerConvo.conversationId,
          },
        };
  
        await wss.send(JSON.stringify(updateMessageReadStatus));
      }
    };
  
    fetchAndUpdateMessages();
  
  }, [selectedPlayerConvo]); 
  
  const fetchMessages = async () => {
    if (selectedPlayerConvo.conversationId) {
      try {
        const messages = await getMessagesByConvoId(selectedPlayerConvo.conversationId);
        if (messages) {
          setMessageList(messages.data);
            
            if(hasReceivedMessage){
              setHasReceivedMessage(false);
            }
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
    }
  };
  
  useEffect(() => {
    if(selectedPlayerConvo.convoTicket){
      setTicket(selectedPlayerConvo.convoTicket);
    }
  }, [selectedPlayerConvo.convoTicket]);

  const UnreadIndicator = ({ unread, unreadCount }) => {
    if (!unread) return null;
    
    return (
      <Box
        sx={{
          background: 'red',
          color: 'white',
          borderRadius: '50px',
          padding: '2px',
          fontSize: '11px',
          fontWeight: 'bold',
          minWidth: '13px',
          height: '13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        {unreadCount > 0 ? unreadCount : ''}
      </Box>
    );
  };

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 62,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 0,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(32px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "rgba(0, 162, 74, 1)",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 1,
        },
  
        "& + .MuiSwitch-track::before": {
          opacity: 1,
        },
        "& + .MuiSwitch-track::after": {
          opacity: 0,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      marginTop: 3,
      marginLeft: 5,
      width: 20,
      height: 20,
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 1,
      backgroundColor:
        theme.palette.mode === "light" ? "rgba(153, 153, 153, 1)" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        content: '"ON"',
        fontFamily: '"Baloo 2", sans-serif',
        fontWeight: 200,
        color: "#FFFFFF",
        top: 8,
        left: 8,
        opacity: 0,
        transition: "all 300ms",
      },
      "&::after": {
        content: '"OFF"',
        fontFamily: '"Baloo 2", sans-serif',
        fontWeight: 200,
        color: "#FFFFFF",
        top: 8,
        right: 10,
        marginRight: "8px",
        opacity: 1,
        transition: "all 300ms",
      },
    },
  }));

  const getInitialsAndColor = (conversation) => {
    const firstNameInitial = conversation?.player_firstName?.charAt(0) || "";
    const lastNameInitial = conversation?.player_lastName?.charAt(0) || "";
    const initials = `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  
    const paletteValues = Object.values(ZodiacColorPalette);
    const colorIndex = initials
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) % paletteValues.length;
    const color = paletteValues[colorIndex];
  
    // Updated avatar style with more modern look and theme color border
    const avatarStyle = {
      backgroundColor: color,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      fontSize: "14px",
      fontWeight: "600",
      color: "white",
      border: `2px solid rgb(82, 164, 71, 0.4)`,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    };
  
    return { avatarStyle, initials };
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw',  // Added viewport width
      boxSizing: 'border-box'
    }}>
      
      {/* Header Box */}
      <Box sx={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        py: 3,
        width: '100%',
        boxSizing: 'border-box',
        position: 'fixed',
        zIndex: 1,
        backgroundImage: `url(${desktopBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        px: 3
      }}>
        {/* Left-aligned UserInfo */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Explicit flex-start
          alignItems: 'center',
        }}>
          <UserInfo 
            copyToClipboard={copyToClipboard} 
            userInfo={userInfo}
            avatarSize={{width: 50, height: 50}} 
            fontColor={{name: 'white', userId: 'rgba(255,255,255,0.9)'}} 
            fontSize={{name: 22, userId: 14}} 
            copyIcon={copyIconWhite}
          />
        </Box>

        {/* Right-aligned Menu Button */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end' // Explicit flex-end
        }}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              padding: 1,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <MenuSharp sx={{ 
              color: 'white', 
              fontSize: '2rem',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))'
            }} />
          </IconButton>
        </Box>
      </Box>

      {/* Lower Section with two boxes */}
      <Box sx={{ 
        display: 'flex', 
        flex: 1, 
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Left smaller box */}
        <Box sx={{
          backgroundColor: '#ffffff',
          width: '20%',
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 10px',
          gap: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderRight: '1px solid #eaeaea',
          height: '70vh', // Full height to contain the scrollable area
        }}>
          {/* Filter Buttons Section */}
          <Box sx={{
            position: 'fixed',
            top: 85,
            zIndex: 2,
            backgroundColor: '#ffffff',
            pt: 1,
            pb: 2,
            borderBottom: '1px solid #f0f0f0',
          }}>
            <Grid container justifyContent="space-evenly" spacing={1} >
              {['All', 'New', 'Ongoing', 'Closed'].map((filter) => (
                <Grid item key={filter} sx={{fontFamily: "'Baloo 2', sans-serif",}}>
                  <FilterButton
                    filter={filter}
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Notification Sound Toggle */}
          <Box sx={{
            display: 'flex',
            position: 'fixed',
            top: 150,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 15px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            width: '18%',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={notifSoundIcon} 
                alt="Notification Sound" 
                style={{ width: '24px', height: '24px', marginRight: '10px' }} 
              />
              <Typography variant="body1" sx={{ 
                fontSize: '1.2rem',
                fontWeight: 500,
                fontFamily: "'Baloo 2', sans-serif",
                color: '#333'
              }}>
                Notification Sound
              </Typography>
            </Box>
            <IOSSwitch checked={isSoundOn} onChange={handleSoundToggle} />
          </Box>

          {/* Search Input */}
          <Box sx={{ padding: '0 5px', position: 'fixed', top: 205, width: '19%' }}>
            <TextField
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              fullWidth
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: '#f9f9f9',
                  '& input::placeholder': {
                    fontFamily: "'Baloo 2', sans-serif",
                    opacity: 1,
                    color: '#888'
                  },
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'gray',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'gray',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgb(82, 164, 71, 0.7)' }} />
                  </InputAdornment>
                ),
                sx: {
                  '&::placeholder': {
                    fontFamily: "'Baloo 2', sans-serif",
                  }
                }
              }}
            />
          </Box>

          {/* Conversations List with Vertical Scrolling */}
          <Box sx={{
            position: 'relative',
            top: 240,
            height: 'calc(100vh - 270px)', // Adjust this to leave room for the fixed elements
            overflowY: 'auto',
            overflowX: 'hidden',
            width: '100%',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgb(82, 164, 71, 0.3)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgb(82, 164, 71, 0.5)',
            },
          }}>
            {searchedConversations.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, fontSize: 24, color: '#cccccc', fontFamily: "'Baloo 2', sans-serif", }}
                >
                  No Conversations Found
                </Typography>
              </Box>
            ) : (
              searchedConversations.map((conversation, index) => (
                <Box
                  key={conversation.conversation_id || index}
                  onClick={async () => {
                    setSelectedPlayerConvo({ 
                      conversationId: conversation.conversation_id, 
                      playerInfo: {firstName: `${conversation.player_firstName}`, avatar: conversation.avatar, playerUUID: conversation.playerUUID, isActive: conversation.isPlayerActive},
                      convoTicket: conversation.ticket,
                      rate: conversation.rate,
                      status: conversation.status
                    });
                    handleUpdateConversationStatus(conversation.conversation_id, "Ongoing", conversation.status);
                    await updateMessageRead(conversation.conversation_id, userInfo.role);
                    setSelConvo(conversation);
                    fetchConversations();
                  }}
                  sx={{ 
                    padding: '10px', 
                    borderRadius: '12px', 
                    margin: '4px auto',
                    width: '95%',
                    backgroundColor: (selectedPlayerConvo.conversationId && selectedPlayerConvo.conversationId === conversation.conversation_id) 
                      ? '#FFFAD1' 
                      : 'transparent',
                    transition: 'all 0.2s ease',
                    border: '1px solid transparent',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: (selectedPlayerConvo.conversationId && selectedPlayerConvo.conversationId === conversation.conversation_id) 
                        ? 'rgba(82, 164, 71, 0.12)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      borderColor: (selectedPlayerConvo.conversationId && selectedPlayerConvo.conversationId === conversation.conversation_id) 
                        ? 'rgba(82, 164, 71, 0.2)' 
                        : 'rgba(0, 0, 0, 0.05)',
                    }
                  }}
                >
                  {/* Avatar Section */}
                  <Box sx={{ position: 'relative', mr: 1.5 }}>
                    {conversation.avatar ? (
                      <Box sx={{ position: 'relative', width: 40, height: 40 }}>
                        <img
                          src={`${IMAGE_URL_USER}/${conversation?.playerUUID}/${conversation?.avatar}`}
                          alt="Avatar"
                          style={{ 
                            height: 40, 
                            width: 40, 
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid rgb(82, 164, 71, 0.4)",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                          }}
                        />
                      </Box>
                    ) : (
                      (() => {
                        const { avatarStyle, initials } = getInitialsAndColor(conversation);
                        return <div style={avatarStyle}>{initials}</div>;
                      })()
                    )}

                    {/* Active Status Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: conversation.isPlayerActive 
                          ? "rgb(82, 164, 71)" 
                          : "#bdbdbd",
                        border: "2px solid white",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                      }}
                    />
                  </Box>

                  {/* Message Content */}
                  <Box sx={{ width: 'calc(100% - 120px)' }}>
                    <Typography variant="body2" sx={{ 
                      fontFamily: "'Baloo 2', sans-serif",
                      fontWeight: '600', 
                      color: 'rgb(121, 117, 117)',
                      fontSize: '0.875rem'
                    }}>
                      {`${conversation.player_firstName} ${conversation.player_lastName}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'Baloo 2', sans-serif",
                        fontWeight: conversation.status === 'New' || conversation.csrUnreadMessageCount > 0 ? 'bold' : 'normal',
                        color: conversation.status === 'New' || conversation.csrUnreadMessageCount > 0 ? '#333333' : '#777777',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        fontSize: '0.8rem',
                        lineHeight: 1.4
                      }}
                    >
                      {
                        conversation.status === "Closed" ? "Chat ended" :
                        conversation.latest_message === null ? "..." :
                        conversation.latest_message
                      }
                    </Typography>
                  </Box>

                  {/* Time and Unread Indicator (Right side) */}
                  <Box sx={{ 
                    marginLeft: 'auto', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-end', 
                    gap: '4px',
                    minWidth: '50px' 
                  }}>
                    <Typography variant="body2" sx={{ 
                      fontFamily: "'Baloo 2', sans-serif",
                      fontSize: '0.7rem',
                      color: '#888888'
                    }}>
                      {formatDate(conversation.time)}
                    </Typography>
                    
                    {/* Unread indicator moved to the right */}
                    {(conversation.status === "New" || conversation.csrUnreadMessageCount > 0) && (
                      <UnreadIndicator
                        unread={conversation.status === "New" || conversation.csrUnreadMessageCount > 0}
                        unreadCount={conversation.csrUnreadMessageCount}
                      />
                    )}
                    
                    {(activeFilter === 'Closed' || activeFilter === 'All') && conversation.rate && (
                      <Box sx={{ display: 'block', mt: '2px' }}>
                        {conversation.rate === 'Happy' ? (
                          <SentimentVerySatisfied sx={{ fontSize: 17, color:'green' }} />
                        ) : (
                          <SentimentVeryDissatisfied sx={{ fontSize: 17 }} />
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Right box that fills remaining space */}
        <Box sx={{
          backgroundColor: '#fafafa',
          color: 'white',
          flex: 1,
          display: 'flex',
          fontSize: '1.2rem',
          border:'1px solid lightgray'
        }}>
          {/* Chat Header */}
          <Grid className={styles.columnHeader} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background:'#fafafa' }}>
            {selectedPlayerConvo && Object.keys(selectedPlayerConvo).length > 0 ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative', mr: 1.5 }}>
                    {selectedPlayerConvo.playerInfo.avatar ? (
                      <Box sx={{ position: 'relative', width: 40, height: 40 }}>
                        <img
                          src={`${IMAGE_URL_USER}/${selectedPlayerConvo.playerInfo?.playerUUID}/${selectedPlayerConvo.playerInfo?.avatar}`}
                          alt="Avatar"
                          style={{ 
                            height: 40, 
                            width: 40, 
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid rgb(82, 164, 71, 0.4)",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                          }}
                        />
                      </Box>
                    ) : (
                      (() => {
                        const { avatarStyle, initials } = getInitialsAndColor(selConvo);
                        return <div style={avatarStyle}>{initials}</div>;
                      })()
                    )}

                    {/* Active Status Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: isActivePlayer 
                          ? "rgb(82, 164, 71)" 
                          : "#bdbdbd",
                        border: "2px solid white",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                      }}
                    />
                  </Box>

                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: "'Baloo 2', sans-serif",
                      color: 'rgba(91, 91, 91, 1)', 
                      mr: 1.25,
                      fontWeight: 500
                    }}
                  >
                    {selectedPlayerConvo.playerInfo.firstName}
                  </Typography>
                </Box>

                {/* Ticket ID and the vertical dots */}
                {/* Ticket ID and the vertical dots */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" style={{ 
                    fontFamily: '"Baloo 2", sans-serif', 
                    textAlign: 'right', 
                    marginRight: '10px', 
                    color: 'rgb(91, 91, 91)',
                    fontSize: 18
                  }}>
                    Ticket ID: {selectedPlayerConvo.convoTicket}
                  </Typography>
                  {selectedPlayerConvo.playerInfo && (
                    <img 
                      src={
                        !isActivePlayer && !isChatEnded 
                          ? threedotsgreen
                          : threedotsgray
                      } 
                      alt="options" 
                      style={{ 
                        width: 30, 
                        cursor: !isActivePlayer && !isChatEnded ? 'pointer' : 'default' 
                      }} 
                      onClick={!isActivePlayer && !isChatEnded ? handleOpenDialog : undefined}
                    />
                  )}
                </div>

                {/* Dialog for force end chat */}
                <Dialog 
                  open={dialogOpen} 
                  onClose={handleCloseDialog} 
                  sx={{
                    '& .MuiDialog-paper': {
                      borderRadius: '24px',
                      padding: '24px',
                      width: '500px',
                      maxWidth: '90vw',
                      background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.16)',
                      overflow: 'hidden'
                    }
                  }}
                >
                  <DialogTitle sx={{ 
                    padding: '16px 24px',
                    position: 'relative',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                  }}>
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontSize: '24px', 
                        fontFamily: "'Baloo 2', sans-serif",
                        fontWeight: 600,
                        color: '#333',
                        textAlign: 'center'
                      }}
                    >
                      Confirm Chat Termination
                    </Typography>
                    <IconButton 
                      aria-label="close"
                      onClick={handleCloseDialog}
                      sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: 'rgba(0, 0, 0, 0.54)',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      <Close />
                    </IconButton>
                  </DialogTitle>
                  
                  <DialogContent sx={{ padding: '24px' }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <WarningAmber
                        sx={{ 
                          fontSize: 64, 
                          mt: 2,
                          color: '#ff9800',
                          mb: 2
                        }} 
                      />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: "'Baloo 2', sans-serif",
                          fontSize: '20px',
                          color: '#555',
                          lineHeight: 1.5
                        }}
                      >
                        This action will <strong style={{color: '#d32f2f'}}>immediately end</strong> the current conversation.
                      </Typography>
                    </Box>
                  </DialogContent>
                  
                  <DialogActions sx={{ 
                    padding: '16px 24px',
                    justifyContent: 'center',
                    gap: '16px'
                  }}>
                    <Button 
                      onClick={handleCloseDialog}
                      variant="outlined"
                      sx={{
                        fontFamily: "'Baloo 2', sans-serif",
                        fontSize: '18px',
                        borderRadius: '50px',
                        padding: '8px 32px',
                        border: '2px solid #00a24a',
                        color: '#00a24a',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 162, 74, 0.08)',
                          border: '2px solid #00a24a'
                        }
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleForceEndChat}
                      variant="contained"
                      sx={{
                        backgroundColor: '#d32f2f', 
                        color: 'white', 
                        fontFamily: "'Baloo 2', sans-serif",
                        fontSize: '18px', 
                        borderRadius: '50px',
                        padding: '8px 32px',
                        '&:hover': {
                          backgroundColor: '#b71c1c',
                          boxShadow: '0px 4px 12px rgba(211, 47, 47, 0.3)'
                        }
                      }}
                    >
                      End Chat
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : null}
          </Grid>

          {/* Messages Container */}
          <div 
            id={styles.messagesContainer} 
            style={{
              overflowY: 'auto',
            }}
          >
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
                <div key={msg.message_id}>
                  {showDateDivider && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'center',
                        color: '#999',
                        my: 1.5,
                        textTransform: 'uppercase',
                        fontFamily: "'Baloo 2', sans-serif",
                        fontSize: '0.75rem'
                      }}
                    >
                      {displayDate}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender_id === userInfo.id ? 'flex-end' : 'flex-start',
                      mb: 1.5
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 0.5
                    }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "'Baloo 2', sans-serif",
                          color: msg.sender_id === userInfo.id ? '#9f9d9d' : '#a9a6a6',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      >
                        {msg.sender_id === userInfo.id ? 'You' : msg.sender_nickName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "'Baloo 2', sans-serif",
                          color: '#777',
                          fontSize: '0.7rem',
                          ml: 1
                        }}
                      >
                        {messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        maxWidth: '80%',
                        px: 1.5,
                        py: 1,
                        borderRadius: '12px',
                        backgroundColor: msg.sender_id === userInfo.id 
                          ? '#00A24A' 
                          : '#fff',
                        color: msg.sender_id === userInfo.id ? '#fff' : '#000',
                        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.2)',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        ...(msg.isImage && { 
                          backgroundColor: 'transparent',
                          p: 0,
                          boxShadow: 'none'
                        })
                      }}
                    >
                      {msg.isImage ? (
                        <FileViewer file={msg.message_text} />
                      ) : (
                        msg.message_text
                      )}
                    </Box>

                    {msg.sender_id === userInfo.id && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: "'Baloo 2', sans-serif",
                          color: '#777',
                          fontSize: '0.7rem',
                          mt: 0.5,
                          mr: 0.5
                        }}
                      >
                        {msg.isRead ? 'Read' : 'Sent'}
                      </Typography>
                    )}
                  </Box>
                </div>
              );
            })}
            
            {isPlayerTyping && (
              <Box 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mt: 1,
                  ml: 1,
                  animation: 'fadeIn 0.3s ease',
                  fontStyle: 'italic',
                  color: 'text.secondary',
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {selectedPlayerConvo.playerInfo.firstName} is typing
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

            {isChatEnded && (
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Baloo 2', sans-serif",
                  textAlign: 'center',
                  color: 'rgb(82, 164, 71)',
                  my: 1.25
                }}
              >
                The chat session has ended
              </Typography>
            )}
            
            {isChatRated && (
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Baloo 2', sans-serif",
                  textAlign: 'center',
                  color: 'rgb(82, 164, 71)',
                  my: 1.25
                }}
              >
                Player rated the chat
              </Typography>
            )}
            
            <div ref={messagesEndRef} /> 
            
            {(!messageList.length || !selectedPlayerConvo) && (
              <Typography 
                variant="h6"
                sx={{
                  position: 'fixed',
                  top: '50%',
                  left: '60%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: "'Baloo 2', sans-serif",
                  color: 'rgba(153, 153, 153, 1)',
                  fontSize: '1.875rem'
                }}
              >
                No selected conversation.
              </Typography>
            )}
          </div>

          {/* Message Input Area */}
          <Grid
            container
            justifyContent="center"
            sx={{ 
              position: 'fixed', 
              bottom: 0, 
              width: '75%', 
              padding: '20px',
              backgroundColor: '#fafafa', // Added background to match the theme
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Type your message"
              value={message}
              onChange={handleInputChange}
              onKeyPress={(event) => {
                if (event.key === 'Enter') handleSendMessage();
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ 
                        color: isChatEnded || !selectedPlayerConvo.playerInfo ? 'lightgray' : '#1976d2',
                        '&:hover': {
                          backgroundColor: 'rgba(82, 164, 71, 0.1)'
                        }
                      }}
                      onClick={handleSendMessage}
                      disabled={isChatEnded || !selectedPlayerConvo.playerInfo}
                    >
                      <Box
                          component="img"
                          src={send}
                          alt="attach"
                          sx={{ width: 35}}
                        />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: '80%',
                '& .MuiInputBase-input': {
                  padding: '12px 16px',
                  fontFamily: "'Baloo 2', sans-serif",
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px',
                  marginRight: '10px',
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: 'lightgray',
                  },
                  '&:hover fieldset': {
                    borderColor: 'lightgray',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'lightgray',
                  },
                },
              }}
              multiline
              minRows={1}
              maxRows={3}
              disabled={isChatEnded || !selectedPlayerConvo.playerInfo}
            />

            {selectedPlayerConvo.playerInfo && (
              <>
                <IconButton
                  sx={{
                    color: isChatEnded ? 'lightgray' : '#1976d2',
                    margin: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(82, 164, 71, 0.1)'
                    }
                  }}
                  onClick={handleAddIconClick}
                  disabled={isChatEnded}
                >
                  <Box
                    component="img"
                    src={attach}
                    alt="attach"
                    sx={{ width: 40}}
                  />
                </IconButton>


                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleFileSelection}
                />

                <Button
                  onClick={() => {
                    setSelectedButton('end');
                    handleEndChat();
                  }}
                  sx={{
                    height: 50,
                    width: '7%',
                    margin: 'auto',
                    borderRadius: '25px',
                    background: isChatEnded
                      ? 'lightgray'
                      : '#00A24A', // Gradient based on #1976d2 (blue shades)
                    color: 'white',
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 500,
                    textTransform: 'none',
                    transition: 'background 0.3s ease-in-out, transform 0.3s ease-in-out', 
                  }}
                  disabled={isChatEnded}
                >
                  End
                </Button>

                <Button
                  onClick={() => {
                    setSelectedButton('rate');
                    handleRateChat();
                  }}
                  sx={{
                    height: 50,
                    width: '7%',
                    margin: 'auto',
                    borderRadius: '25px',
                    marginLeft: '10px',
                    background: isChatRated
                      ? 'lightgray'
                      : '#00A24A', // Gradient based on #1976d2 (blue shades)
                    color: 'white',
                    fontFamily: "'Baloo 2', sans-serif",
                    fontWeight: 500,
                    textTransform: 'none',
                    transition: 'background 0.3s ease-in-out, transform 0.3s ease-in-out', // smooth transition
                    
                  }}
                  disabled={isChatRated}
                >
                  Rate
                </Button>


              </>
            )}
          </Grid>

        </Box>
      </Box>

      {/* Sidebar */}
      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '380px' },
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(245,245,245,1) 100%)',
            boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Close Button */}
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              backgroundColor: 'rgba(82, 164, 71, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(82, 164, 71, 0.2)',
              }
            }}
          >
            <img 
              src={closeSidebar} 
              alt="Close sidebar" 
              style={{ width: 20, height: 20, filter: 'brightness(0.7)' }} 
            />
          </IconButton>
          
          {/* User Info Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mt: 8,
            mb: 4,
            textAlign: 'center'
          }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Box sx={{ 
                  backgroundColor: 'rgb(82, 164, 71)',
                  color: 'white',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid white'
                }}>
                  {userInfo.gender === 'male' ? '♂' : '♀'}
                </Box>
              }
            >
              <Avatar
                src={userInfo.gender === 'male' ? maleAvatar : femaleAvatar}
                sx={{
                  width: 100,
                  height: 100,
                  border: '4px solid yellow',
                  mb: 2
                }}
              />
            </Badge>
            
            <Typography variant="h5" sx={{ 
              fontWeight: 'bold', 
              fontSize: '1.5rem',
              fontFamily: "'Baloo 2', sans-serif",
              color: '#333',
              mb: 0.5
            }}>
              {userInfo.firstName + " " + userInfo.lastName}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'rgba(82, 164, 71, 0.1)',
              borderRadius: '20px',
              px: 2,
              py: 1,
              mt: 1
            }}>
              <Typography variant="body2" sx={{ 
                color: 'rgb(82, 164, 71)', 
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                ID: {userInfo.uuid}
              </Typography>
              <IconButton 
                onClick={() => copyToClipboard(userInfo.uuid)} 
                size="small"
                sx={{ 
                  ml: 0.5,
                  color: 'rgb(82, 164, 71)',
                  '&:hover': {
                    backgroundColor: 'rgba(82, 164, 71, 0.2)'
                  }
                }}
              >
                <img 
                  src={copyIcon} 
                  alt="Copy user ID" 
                  style={{ width: 16, height: 16 }} 
                />
              </IconButton>
            </Box>
          </Box>
          
          {/* Notification Sound Section */}
          <Box sx={{ 
            backgroundColor: 'white',
            borderRadius: '12px',
            p: 2,
            mb: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <FormControlLabel
              control={
                <IOSSwitch 
                  checked={isSoundOn} 
                  onChange={handleSoundToggle}
                  color="success"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <VolumeUp sx={{ 
                    color: 'rgb(82, 164, 71)', 
                    mr: 1.5,
                    fontSize: '1.2rem'
                  }} />
                  <Typography variant="h6" sx={{ 
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#555'
                  }}>
                    Notification Sound
                  </Typography>
                </Box>
              }
              labelPlacement="start"
              sx={{ 
                margin: 0,
                width: '100%',
                justifyContent: 'space-between'
              }}
            />
          </Box>
          
          {/* Logout Section */}
          <Box 
            onClick={() => setLogoutDialogOpen(true)}
            sx={{
              backgroundColor: 'white',
              borderRadius: '12px',
              p: 2,
              mt: 'auto',
              mb: 2,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(82, 164, 71, 0.08)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logout sx={{ 
                color: 'red', 
                fontSize: '1.5rem',
                mr: 1.5
              }} />
              <Typography variant="h6" sx={{ 
                fontSize: '1rem',
                fontWeight: '500',
                color: '#555'
              }}>
                Sign Out
              </Typography>
            </Box>
            <ChevronRight  sx={{ 
              color: 'rgba(0,0,0,0.3)',
              fontSize: '1.5rem'
            }} />
          </Box>
        </Box>
      </Drawer>

      <Dialog 
        open={logoutDialogOpen} 
        onClose={() => setLogoutDialogOpen(false)} 
        PaperProps={{ 
          style: { 
            borderRadius: '25px', 
            padding: '20px', 
            width: '400px', 
            maxWidth: '90vw' 
          } 
        }}
      >
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: '20px' 
        }}>
          <IconButton 
            onClick={() => setLogoutDialogOpen(false)} 
            style={{ 
              position: 'absolute', 
              right: '10px', 
              top: '10px' 
            }}
          >
            <Close />
          </IconButton>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "'Baloo 2', sans-serif",
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '30px', 
              textAlign: 'center' 
            }}
          >
            Are you sure you want to sign out?
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            width: '100%', 
            gap: '20px' 
          }}>
            <Button 
              onClick={() => { 
                navigate('/'); 
                localStorage.removeItem('user'); 
              }} 
              sx={{ 
                flex: 1, 
                borderRadius: '50px', 
                background: 'linear-gradient(180deg, #FF2020 0%, #C80000 100%)', 
                color: 'white', 
                fontFamily: "'Baloo 2', sans-serif",
                fontSize: '18px', 
                padding: '10px', 
                '&:hover': { 
                  backgroundColor: 'rgb(72, 144, 61)' 
                } 
              }}
            >
              Yes
            </Button>
            <Button 
              onClick={() => setLogoutDialogOpen(false)} 
              sx={{ 
                flex: 1, 
                borderRadius: '50px', 
                backgroundColor: 'white', 
                color: 'gray', 
                fontFamily: "'Baloo 2', sans-serif",
                fontSize: '18px', 
                padding: '10px', 
                border: '1px solid gray', 
                '&:hover': { 
                  backgroundColor: '#f5f5f5' 
                } 
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

const FilterButton = ({ filter, activeFilter, onFilterChange }) => {
  const isActive = activeFilter === filter;
  const isClosed = filter === 'Closed';
  
  let backgroundColor;
  let hoverBackgroundColor;

  if (isActive) {
    switch (filter) {
      case 'New':
        backgroundColor = 'rgba(255, 228, 0, 1)';
        hoverBackgroundColor = 'rgba(255, 200, 0, 1)';
        break;
      case 'Ongoing':
        backgroundColor = 'rgba(33, 150, 243, 1)';
        hoverBackgroundColor = 'rgba(25, 115, 200, 1)';
        break;
      case 'Closed':
        backgroundColor = 'rgba(255, 32, 32, 1)';
        hoverBackgroundColor = 'rgba(200, 25, 25, 1)';
        break;
      case 'All':
        backgroundColor = 'rgba(0, 162, 74, 1)';
        hoverBackgroundColor = 'rgba(0, 130, 60, 1)';
        break;
      default:
        backgroundColor = 'lightgray';
        hoverBackgroundColor = 'gray';
    }
  } else {
    backgroundColor = 'lightgray';
    hoverBackgroundColor = 'gray';
  }

  const textColor = isActive && isClosed ? 'white' : 'white';

  return (
    <Button
      variant="contained"
      disableElevation // This removes the default shadow
      sx={{
        borderRadius: '20px',
        backgroundColor,
        color: filter === 'New' && activeFilter === filter ? 'black' : textColor,
        width: '9vh',
        minWidth: '60px',
        fontFamily: '"Baloo 2", sans-serif',
        fontWeight: 'normal',
        fontSize: '1rem',
        padding: '5px 10px',
        // Key properties to remove all borders and shadows:
        boxShadow: 'none',
        border: 'none !important',
        '&.MuiButton-root': {
          border: 'none !important',
        },
        '&.MuiButton-contained': {
          boxShadow: 'none',
          border: 'none !important',
        },
        '&:hover': {
          backgroundColor: hoverBackgroundColor,
          boxShadow: 'none',
          border: 'none !important',
        },
        '&:active': {
          boxShadow: 'none',
          border: 'none !important',
        },
        '&:focus': {
          outline: 'none',
          border: 'none !important',
        }
      }}
      onClick={() => onFilterChange(filter)}
    >
      {filter}
    </Button>
  );
};

function UserInfo({ copyToClipboard, userInfo, leftPos = '', avatarSize = {}, fontColor = {}, fontSize = {}, copyIcon }) {
  const defaultAvatar = userInfo.gender === 1 ? maleAvatar : femaleAvatar;
  return (
    <div style={{ 
      margin: '0 auto',
      width: '480px',
      position: 'relative',
      left: leftPos,
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    }}>
      <div style={{
        position: 'relative',
        width: avatarSize.width,
        height: avatarSize.height,
      }}>
        <div
          style={{
            backgroundImage: `url(${userInfo.profilePicture ? `${IMAGE_URL_USER}/${userInfo?.uuid}/${userInfo?.profilePicture}` : defaultAvatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `3px solid rgba(255, 255, 255, 0.8)`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: -4,
          right: -4,
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '50%',
          width: 20,
          height: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgb(82, 164, 71)'
        }}>
          {userInfo.gender === 1 ? (
            <span style={{ color: 'rgb(82, 164, 71)', fontSize: 12 }}>♂</span>
          ) : (
            <span style={{ color: 'rgb(82, 164, 71)', fontSize: 12 }}>♀</span>
          )}
        </div>
      </div>
      
      <div style={{ width: '70%' }}>
        <div style={{ 
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: fontColor.name,
          fontSize: fontSize.name,
          fontFamily: "'Baloo 2', sans-serif",
          lineHeight: 1.2,
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}>
          CS {`${userInfo.nickName}`}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          marginTop: 4
        }}>
          <span style={{ 
            fontFamily: 'sans-serif',
            color: fontColor.userId,
            fontSize: fontSize.userId,
            marginRight: 8,
            opacity: 0.9,
            textShadow: '0 1px 1px rgba(0,0,0,0.2)'
          }}>
            ID: {userInfo.uuid}
          </span>
          <IconButton 
            onClick={() => copyToClipboard(userInfo.uuid)} 
            size="small"
            sx={{ 
              padding: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            <img 
              src={copyIcon} 
              alt="Copy user ID" 
              style={{ 
                width: 16, 
                height: 16,
                filter: 'brightness(0) invert(1)'
              }} 
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default CSRPage;