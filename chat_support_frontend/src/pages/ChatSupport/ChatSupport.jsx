import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { 
  Grid, 
  Typography, 
  Link, 
  Card, 
  Box, 
  IconButton,
  useTheme,
  styled 
} from "@mui/material";
import { 
  ArrowBack, 
  ChatBubbleOutline, 
  EmailOutlined, 
  SupportAgent,
  ChevronRight 
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PrivatePolicyAndTermsModal } from "./components/PrivatePolicyAndTermsModal";
import { PopupModal } from "./components/PopupModal";
import { MOBILE, PRIVATE_PRIVACY, TERMS_AND_CONDITION_CONTENT } from "./constants";
import { getRequiredUrl } from "./components/common";
import { createConversation, getAllActiveCsr, getAllConversation } from "./api/chatSupportAPI";
import WebSocketManager from "../../api_services/WebSocketManager";
import createEncryptor from "./components/createEncryptor";
import back from "@assets/images/arrow-gray-left.png";
import csicon from "@assets/images/chat-support-white-icon.png";
import cslogo from "@assets/images/chat-support-logo.png";
import cssmallicon from "@assets/images/chat-support-icon.png";
import email from "@assets/images/email-us.png";

const encryptor = createEncryptor(import.meta.env.VITE_DECRYPTION_KEY);

const ChatSupport = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [playerHasConvo, setPlayerHasConvo] = useState(false);
  const [navigateTo, setNavigateTo] = useState('');
  
  
  
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [isFinishedLoading, setIsFinishedLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const userDetailsParam = searchParams.get('data');
  const [isChatEnded, setIsChatEnded] = useState(false);

  const generateUniqueId = (id = false) => {
    if (id !== false) {
      // Convert the ID into a deterministic but "randomized" version
      const str = id.toString();
      let hash = 0;
      
      // Simple hashing algorithm (similar to Java's String.hashCode())
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      
      // Ensure positive number and 9 digits
      const randomized = Math.abs(hash).toString().padStart(9, '0').slice(-9);
      return parseInt(randomized);
    }
    
    // Default case: Generate new random ID
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return parseInt(`${timestamp}${random}`.slice(-9));
  };
  
    
  const userInfo = useMemo(() => {
    let stored = localStorage.getItem('userInfo');
    let decrypted;

    if (userDetailsParam) {
      decrypted = encryptor.decryptParams(userDetailsParam);
      if (decrypted) {
        const newUser = {
          id: generateUniqueId(decrypted.id),
          first_name: decrypted.first_name,
          last_name: decrypted.last_name,
          mobile_number: decrypted.mobile,
          email: decrypted.email,
          role: 'player',
        };
        localStorage.setItem('userInfo', JSON.stringify(newUser));
        localStorage.setItem('data', JSON.stringify(userDetailsParam));
        return newUser;
      }
    }

    if (stored) {
      return JSON.parse(stored); 
    }

    const newUser = {
      id: generateUniqueId(),
      first_name: 'Guest',
      last_name: 'User',
      mobile_number: '+639000000000',
      email: 'test@gmail.com',
      role: 'player',
    };

    localStorage.setItem('userInfo', JSON.stringify(newUser)); // Save new user to localStorage
    return newUser;
  }, [userDetailsParam]);

  const primaryColor = 'rgb(82, 164, 71)';
  const secondaryColor = '#FFC600';

  const url = getRequiredUrl(true, userInfo);

  if (!url) {
    throw new Error(`No valid url: ${url}`);
  }
  
  const wss = useRef(new WebSocketManager(url)).current;

  const renderSideModalContent = (contentType) => {
    return (
      <PrivatePolicyAndTermsModal
        contentType={contentType}
        onCloseModal={() => handleCloseModal()}
        mode={MOBILE}
      />
    );
  };

  const handleOpenTermsAndConditions = () => {
    setOpenModal(true);
    setTypeModal(TERMS_AND_CONDITION_CONTENT);
  };

  const handleOpenPrivacyPolicy = () => {
    setOpenModal(true);
    setTypeModal(PRIVATE_PRIVACY);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTypeModal("");
  };

  const sendSignalToCSLobby = async (csr) => {
    if (csr && csr.id) {
      const updatedConversations = {
        event: "sendSignalToCSLobby",
        data: { csrId: csr.id },
      };
      await wss.send(JSON.stringify(updatedConversations));
    } else {
      console.error("csr ID is not set.");
    }
  };

  useEffect(() => {
    wss.connect();
    return () => {
      wss.close();
    };
  }, [wss]);

  useEffect(() => {
    const trigger = async () => {
      const response = await getAllActiveCsr();
    }
    trigger();
  }, []);

  const handleCreateConversation = async () => {
    try {
      const response = await getAllActiveCsr();
      const csr = response.data.user;
      if (csr && !playerHasConvo) {
        sendSignalToCSLobby(csr);
        const conversationId = await createConversation(
          Number(userInfo.id),
          csr.id
        );
        return { csr, conversationId };
      }
    } catch (error) {
      console.error("Error fetching superadmin:", error);
      return { csr: null, conversationId: null };
    }
  };

  const getUserId = async () => {
    try {
      return Number(userInfo.id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null; 
    }
  };

  const getPlayerLocationState = async () => {
    const { csr, conversationId } = await handleCreateConversation();
    return { csr, conversationId };
  };

  async function isPlayerHasOngoingConvo() {
    let ongoingConvo;
    let unfinishedConvos;
    let newConvo;
    if (userInfo.role === "player") {
      ongoingConvo = await getAllConversation(userInfo.id, "Ongoing");
      newConvo = await getAllConversation(userInfo.id, "New");
      unfinishedConvos = ongoingConvo.data.concat(newConvo.data);

      if (unfinishedConvos.length > 0) {
        setPlayerHasConvo(true);
        setNavigateTo("/game/live-chat-support-lobby-player");
      } else {
        setPlayerHasConvo(false);
        setNavigateTo("/game/live-chat-support");
      }
      setIsFinishedLoading(true);
    }
  }

  useEffect(() => {
    isPlayerHasOngoingConvo();
  }, []);
  
  useEffect(() => {
    if (userInfo.role === "csr") {
      setNavigateTo("/game/live-chat-support-lobby");
    } 
  }, [userInfo.role]);

  const handleNavigation = async (path) => {
    try {
      if (playerHasConvo) {
        setIsFinishedLoading(false);
        navigate(path);
      } 
      
      if(!playerHasConvo && isFinishedLoading) {
        const userLocationState =
          userInfo.role === "player"
            ? await getPlayerLocationState()
            : { userInfo: userInfo, userId: await getUserId() };
        setIsChatEnded(false);
        setIsFinishedLoading(false);
        navigate(path, { state: userLocationState });
      }
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  const goToHome = async () => {
    window.location.href = "https://karera.live";
  };

  const SupportCard = styled(Card)(({ theme }) => ({
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background:'linear-gradient(180deg, #FFEA00 0%, #FFC600 100%)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }));
  const SupportCardBlue = styled(Card)(({ theme }) => ({
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background:'linear-gradient(360deg, #46AEF7 0%, #1DD5E6 100%)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        background: `linear-gradient(180deg, #FFEA00 0%, #FFC600 100%)`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <IconButton onClick={goToHome}>
          <Box
            component="img"
            src={back}
            alt="attach"
            sx={{ width: 20 }}
          />
        </IconButton>
  
        <Typography 
          variant="h6" 
          sx={{
            fontFamily: "'Baloo 2', sans-serif",
            color: 'black'
          }}
        >
          Customer Support
        </Typography>
  
        <IconButton sx={{ color: "white" }}>
          <Box
            component="img"
            src={csicon}
            alt="attach"
            sx={{ width: 40 }}
          />
        </IconButton>
      </Box>
  
      {/* Main Content - Pink for now */}
      <Box sx={{
        flex: 1,
        padding: '16px'
      }}>
        <Box sx={{ 
          textAlign: 'center',
          mb: 4
        }}>
          <Box
            component="img"
            src={cslogo}
            alt="attach"
            sx={{ width: 150}}
          />
          <Typography 
            variant="h5" 
            sx={{
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 600,
              color: 'black',
              mb: 2,
            }}
          >
            How can we help you?
          </Typography>

          {/* Support Options */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 2,
              fontFamily: "'Baloo 2', sans-serif",
              color: 'black',
              textAlign:'left'
            }}
        >
            For concerns or to report an issue:
          </Typography>

          {/* Live Chat Card */}
            <SupportCard onClick={() => handleNavigation(navigateTo)}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{
                  p: 1.5,
                  borderRadius: '50%',
                  mr: 2,
                  ml: -0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box
                    component="img"
                    src={cssmallicon}
                    alt="attach"
                    sx={{ width: 40}}
                  />
                </Box>
                <Box sx={{ml:-1}}>
                  <Typography 
                    variant="subtitle1"
                    sx={{
                      fontFamily: "'Baloo 2', sans-serif",
                      fontWeight: 600,
                      textAlign:'left'
                    }}
                  >
                    Live Chat Support
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontFamily: "'Baloo 2', sans-serif",
                      textAlign:'left'
                    }}
                  >
                    Available 24/7
                  </Typography>
                </Box>
              </Box>
              <ChevronRight sx={{ color: 'action.active' }} />
            </SupportCard>

            {/* Email Card */}
            <SupportCardBlue>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{
                  p: 1.5,
                  borderRadius: '50%',
                  mr: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box
                    component="img"
                    src={email}
                    alt="attach"
                    sx={{ width: 30}}
                  />
                </Box>
                <Box>
                  <Typography 
                    variant="subtitle1"
                    sx={{
                      fontFamily: "'Baloo 2', sans-serif",
                      fontWeight: 600,
                      textAlign:'left'
                    }}
                  >
                    Email Us
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontFamily: "'Baloo 2', sans-serif",
                      textAlign:'left'
                    }}
                  >
                    support@karera.live
                  </Typography>
                </Box>
              </Box>
              <ChevronRight sx={{ color: 'action.active' }} />
            </SupportCardBlue>
          </Box>
          {/* Footer Links */}
          <Box sx={{ 
            textAlign: 'center',
            mt: 4,
            mb: 2
          }}>
            <Typography 
              variant="body2" 
              sx={{
                fontFamily: "'Baloo 2', sans-serif",
                color: 'black'
              }}
            >
              <Link 
                onClick={handleOpenTermsAndConditions}
                sx={{
                  color: '#46AEF7',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                  cursor: 'pointer',
                  mr: 0.5
                }}
              >
                Terms and Conditions
              </Link>
              and
              <Link 
                onClick={handleOpenPrivacyPolicy}
                sx={{
                  color: '#46AEF7',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                  cursor: 'pointer',
                  ml: 0.5
                }}
              >
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </Box>
        {/* Modal */}
        <PopupModal
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
        >
          {renderSideModalContent(typeModal)}
        </PopupModal>
      </Box>
    </Box>
  );
};

export default ChatSupport;