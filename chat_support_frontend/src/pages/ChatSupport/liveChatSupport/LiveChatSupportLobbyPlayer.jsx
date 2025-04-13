import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllConversation, getMessagesByConvoId, getUserById } from '../api/chatSupportAPI';
import {
  ArrowBack,
  Search,
  KeyboardArrowDown,
  ChatBubbleOutline,
  PersonOutline,
  MailOutline,
  PhoneAndroid,
  Refresh
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import styles from './LiveChatSupportLobbyPlayer.module.scss';
import avatarBlue from '../../../assets/images/avatar-blue.png';
import arrowWhiteLeft from '../../../assets/images/arrow-white-left.png';
import searchIcon from '../../../assets/images/search.png';
import arrowDown from '../../../assets/images/arrowDownCircle.png';
import maleAvatar from '../../../assets/images/csr-boy-green.png';
import femaleAvatar from '../../../assets/images/csr-girl-blue.png';
import WebSocketManager from '../../../api_services/WebSocketManager';
import { getRequiredUrl } from '../components/common';



const LiveChatSupportLobbyPlayer = () => {
  const navigate = useNavigate();
  const [latestMessage, setLatestMessage] = useState(null);
  const [latestMessageCount, setLatestMessageCount] = useState(0);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [csrAvatar, setCsrAvatar] = useState('');
  const [csrName, setCSRName] = useState('');
  const [latestConvo, setLatestConvo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const userInfoString = localStorage.getItem('userInfo');
  const data = localStorage.getItem('data');
  let id, first_name, last_name, mobile_number, email, user_type;
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    ({ id, first_name, last_name, mobile_number, email, user_type } = userInfo);
  }
  
  const userInfoRef = useRef({ id, first_name, last_name, mobile_number, email, role: 'player' });
  
  const [csr, setCsr] = useState(null);
  const url = getRequiredUrl(true, userInfoRef.current);
  const wss = useRef(new WebSocketManager(url));
  const fetchLatestConvoRequested = useRef(false);
  
  const backgrounds = React.useMemo(() => [
    'rgba(130, 201, 120, 0.2)',
    'rgba(82, 164, 71, 0.1)',
    'rgba(255, 255, 255, 0.9)',
    'rgba(245, 255, 244, 1)',
    'rgba(230, 255, 228, 1)'
  ], []);

  const primaryColor = 'rgb(82, 164, 71)';
  const lightPrimary = 'rgba(82, 164, 71, 0.1)';

  const handleBackClick = () => {
    navigate(data ? `/chat-support?data=${data}`: '/chat-support');
  };

  const getBackground = useCallback((index) => {
    return backgrounds[index % backgrounds.length];
  }, [backgrounds]);

  useEffect(() => {
    if (!url) {
      setError('No valid WebSocket URL');
      return;
    }

    wss.current = new WebSocketManager(url);
    wss.current.connect();

    return () => {
      wss.current?.close();
    };
  }, [url]);

  const fetchLatestConvo = useCallback(async () => {
    if (isFetching) return null;
    
    try {
      setIsFetching(true);
      const userId = userInfoRef.current.id;
      if (!userId) return null;

      const [ongoingConvo, newConvo] = await Promise.all([
        getAllConversation(Number(userId), 'Ongoing'),
        getAllConversation(Number(userId), 'New')
      ]);

      const unfinishedConvos = ongoingConvo.data.concat(newConvo.data);
      
      if (unfinishedConvos.length > 0) {
        const convo = unfinishedConvos[0];
        setLatestConvo(convo);
        const csrData = await getUserById(convo.csr_id);
        setCsr(csrData);
        return convo;
      }
      return null;
    } catch (error) {
      console.error('Error fetching latest conversation:', error);
      setError('Failed to load conversation');
      return null;
    } finally {
      setIsFetching(false);
    }
  }, [isFetching]);

  const fetchLatestMessage = useCallback(async (convo) => {
    try {
      const currentConvo = convo || latestConvo;
      if (!currentConvo) return;

      setCSRName(currentConvo.csr_nickName);
      const messages = await getMessagesByConvoId(currentConvo.conversation_id);
      const readMessages = messages.data.filter(message => message.isRead === false);
      
      setLatestMessageCount(readMessages.length);
      setLatestMessage(messages.data[messages.data.length - 1]);
    } catch (error) {
      console.error('Error fetching latest message:', error);
      setError('Failed to load messages');
    }
  }, [latestConvo]);

  useEffect(() => {
    if (!fetchLatestConvoRequested.current && userInfoRef.current.id) {
      fetchLatestConvoRequested.current = true;
      const init = async () => {
        const convo = await fetchLatestConvo();
        if (convo) {
          await fetchLatestMessage(convo);
        }
        setIsLoading(false);
      };
      init();
    }
  }, [fetchLatestConvo, fetchLatestMessage]);

  useEffect(() => {
    if (!wss.current) return;

    const handleMessage = async (event) => {
      try {
        const { event: eventType, data } = JSON.parse(event.data);
        
        if (eventType === 'chatSupportReceiveMessage') {
          if (!latestConvo || latestConvo.conversation_id !== data.conversationId) {
            const unfinishedConvo = await fetchLatestConvo();
            if (unfinishedConvo?.conversation_id === data.conversationId) {
              await fetchLatestMessage(unfinishedConvo);
            }
          } else {
            await fetchLatestMessage();
          }
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    };

    wss.current.setOnMessage(handleMessage);
    return () => {
      if (wss.current) {
        wss.current.setOnMessage(null);
      }
    };
  }, [fetchLatestConvo, fetchLatestMessage, latestConvo]);

  useEffect(() => {
    if (csr) {
      const defaultAvatar = csr.data.gender === 1 ? maleAvatar : femaleAvatar;
      setCsrAvatar(defaultAvatar);
    }
  }, [csr]);

  const handleChatClick = () => {
    if (!latestConvo) return;
    
    setIsChatEnded(false);
    navigate('/game/live-chat-support', {
      state: {
        conversationId: latestConvo.conversation_id,
        playerInfo: { nickName: `${userInfoRef.current.first_name}` },
        csr: csr?.data
      }
    });
  };

  if (error) {
    return (
      <div className={styles.container} style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '24px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <ChatBubbleOutline style={{ fontSize: 60, color: primaryColor }} />
          <p style={{ color: '#555', fontSize: '18px', maxWidth: '400px' }}>{error}</p>
          <Button 
            variant="contained"
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: primaryColor,
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold'
            }}
            startIcon={<Refresh />}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container} style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <CircularProgress style={{ color: primaryColor }} />
          <p style={{ color: primaryColor, fontSize: '18px' }}>Loading your chat support...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ backgroundColor: '#f5f5f5', touchAction:'manipulation' }}>
      {/* Header Section */}
      <div className={styles.header} style={{ backgroundColor: primaryColor }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
          <Button 
            onClick={handleBackClick}
            style={{ minWidth: 'auto', color: 'white', marginRight: '16px', position:'relative', left:-30 }}
          >
            <ArrowBack />
          </Button>
          
          <div style={{ display: 'flex', alignItems: 'center', flex: 1,position:'relative', left:-45 }}>
            <Avatar 
              style={{ 
                backgroundColor: 'white', 
                color: primaryColor,
                marginRight: '12px',
                width: '48px',
                height: '48px'
              }}
            >
              {userInfoRef.current.first_name?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <div>
              <h2 style={{ 
                color: 'white', 
                margin: 0,
                fontSize: '18px',
                fontWeight: '500'
              }}>
                Hi, {userInfoRef.current.first_name}!
              </h2>
              <h1 style={{ 
                color: 'white', 
                margin: 0,
                fontSize: '16px',
                fontWeight: '600'
              }}>
                How can we help you?
              </h1>
            </div>
          </div>
        </div>

        {/* Active Chat Card */}
        {latestConvo && (
          <div 
            onClick={handleChatClick}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '16px',
              margin: '16px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              position: 'relative', // Needed for absolute positioning
              ':hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            {/* CSR Avatar */}
            <Avatar 
              src={csrAvatar}
              style={{ 
                width: '48px', 
                height: '48px',
                marginRight: '12px'
              }}
            />

            {/* Chat Info (Name + Last Message) */}
            <div style={{ flex: 1 }}>
              <h3 style={{ 
                margin: 0,
                fontSize: '16px',
                fontWeight: '600',
                color: '#333'
              }}>
                CS {csrName}
              </h3>
              <p style={{ 
                margin: '4px 0 0',
                fontSize: '14px',
                color: '#666',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '200px'
              }}>
                {latestMessage?.message_text || 'No unread messages.'}
              </p>
            </div>

            {/* Unread Messages Badge - NOW ON THE RIGHT SIDE */}
            {latestMessageCount > 0 && (
              <div style={{
                marginLeft: '12px', // Pushes it to the right
                backgroundColor: '#ff5252',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                flexShrink: 0 // Prevents shrinking
              }}>
                {latestMessageCount}
              </div>
            )}
          </div>
        )}

        <h2 style={{ 
          color: 'white',
          padding: '16px 16px 8px',
          margin: 0,
          fontSize: '18px',
          fontWeight: '600',
          fontFamily: '"Poppins", sans-serif',
        }}>
          Get Help
        </h2>
      </div>

      {/* Content Section */}
      <div style={{ padding: '16px' }}>
        <div style={{
          position: 'relative',
          marginBottom: '24px',
          width: '80%',
        }}>
          <input 
            type="text" 
            placeholder="Search your concern or inquiry" 
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              borderRadius: '24px',
              border: '1px solid #ddd',
              fontSize: '14px',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          />
          <Search 
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            color: '#333',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 8px'
          }}>
            Frequently Asked Questions
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              "How to Deposit?",
              "How to Withdraw?",
              "What is KYC?",
              "What types of valid IDs do you accept?"
            ].map((question, index) => (
              <div 
                key={index} 
                style={{ 
                  backgroundColor: getBackground(index + 1),
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  ':hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <span style={{ 
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {question}
                </span>
                <KeyboardArrowDown style={{ color: primaryColor }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            color: '#333',
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 12px 8px'
          }}>
            Contact Options
          </h3>
          
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <MailOutline style={{ color: primaryColor, marginRight: '12px' }} />
              <div>
                <p style={{ 
                  margin: 0,
                  fontSize: '12px',
                  color: '#999'
                }}>
                  Email
                </p>
                <p style={{ 
                  margin: 0,
                  fontSize: '14px',
                  color: '#333',
                  fontWeight: '500'
                }}>
                  support@example.com
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PhoneAndroid style={{ color: primaryColor, marginRight: '12px' }} />
              <div>
                <p style={{ 
                  margin: 0,
                  fontSize: '12px',
                  color: '#999'
                }}>
                  Phone
                </p>
                <p style={{ 
                  margin: 0,
                  fontSize: '14px',
                  color: '#333',
                  fontWeight: '500'
                }}>
                  +1 (800) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatSupportLobbyPlayer;