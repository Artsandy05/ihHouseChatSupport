import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api_services/api";
import { setCookie } from "../utils/cookie";
import { motion, AnimatePresence } from "framer-motion";
import desktopBg from "@assets/images/desktop-login-bg.png";
import kareraLogo from "@assets/images/karera-live-logo-final.png";
import securedLogin from "@assets/images/img-1-for-login.jpg";
import pagcor from "@assets/images/home-pagcor-banner.png";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  Fade
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Security,
  VerifiedUser,
  Person,
  AccountCircle,
  Fingerprint
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Custom styled components
const FloatingLabelTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.primary.main,
    transform: "translate(14px, -9px) scale(0.75)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(360deg, #009135 0%, #00CB60 100%)`,
  color: "white",
  borderRadius: 12,
  fontWeight: 600,
  fontFamily: "'Baloo 2', sans-serif",
  letterSpacing: 0.5,
  textTransform: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:active": {
    transform: "translateY(0)",
  },
}));

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (userData) {
      navigate('/csr-page');
    }
  }, [navigate]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await api.post('/auth/login', { 
        username, 
        password 
      });
      const { token, user } = response.data.data;
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      
      setCookie('token', token, 1);
      localStorage.setItem('user', JSON.stringify({user}));

      navigate(`${user && token && user.role === 'csr' ? '/csr-page' : ''}`);

    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      overflow: "hidden",
      margin: 0,
      padding: 0
    }}>
      {/* Top half with background image */}
      <Box sx={{
        height: "50vh",
        width: "100%",
        backgroundImage: `url(${desktopBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        zIndex: 0
      }} />
      
      {/* Bottom half with white background */}
      <Box sx={{
        height: "50vh",
        width: "100%",
        backgroundColor: "white",
        position: "relative",
        zIndex: 0
      }} />

      {/* Main content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1
        }}
      >
        {/* Header */}
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "90%",
          mb: 4,
          flexWrap: "wrap",
          px: 2
        }}>
          <Box
            component={motion.div}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #52a447, #3d7e34)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                position: "relative",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: -0.5
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                <Box
                  component="img"
                  src={kareraLogo}
                  alt="Karera Live Logo"
                  sx={{
                    width: 400,
                    maxWidth: "100%",
                    objectFit: "contain"
                  }}
                />
              </Box>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                <Box
                  component="img"
                  src={securedLogin}
                  alt="Karera Live Logo"
                  sx={{
                    width: 70,
                    maxWidth: "100%",
                    objectFit: "contain"
                  }}
                />
              </Box>
        </Box>

        {/* Login form */}
        <Paper
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.08)",
            width: "100%",
            maxWidth: 500,
            m: 2,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Decorative elements */}
          <Box sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(82,164,71,0.1) 0%, rgba(82,164,71,0) 70%)",
            zIndex: 0
          }} />
          <Box sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(82,164,71,0.05) 0%, rgba(82,164,71,0) 70%)",
            zIndex: 0
          }} />
          
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(to bottom, #a0a0a0, #666666)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Baloo 2', sans-serif"
              }}
            >
              Let's get you signed in!
            </Typography>

            <Box component="form" onSubmit={handleSubmitLogin}>
              <FloatingLabelTextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: "action.active" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <FloatingLabelTextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "action.active" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{
                          '&:hover': {
                            background: "rgba(82, 164, 71, 0.1)"
                          }
                        }}
                      >
                        {passwordVisible ? (
                          <Box 
                            component={motion.div} 
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 10, 0]
                            }} 
                            transition={{ duration: 0.5 }}
                          >
                            <Visibility sx={{ color: "#52a447" }} />
                          </Box>
                        ) : (
                          <Box 
                            component={motion.div} 
                            animate={{ 
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1.1, 1]
                            }} 
                            transition={{ duration: 0.5 }}
                          >
                            <VisibilityOff sx={{ color: "#666" }} />
                          </Box>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <AnimatePresence>
                {error && (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    sx={{
                      color: "#d32f2f",
                      bgcolor: "rgba(211, 47, 47, 0.1)",
                      p: 2,
                      borderRadius: 2,
                      mb: 3,
                      textAlign: "center",
                      borderLeft: "4px solid #d32f2f"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#d32f2f"/>
                      </svg>
                      <Typography variant="body2">{error}</Typography>
                    </Box>
                  </Box>
                )}
              </AnimatePresence>

              <GradientButton
                fullWidth
                type="submit"
                disabled={isSubmitting}
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  mt: 2,
                  mb: 3,
                  fontSize: "1rem"
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={22} sx={{ color: "white", mr: 1.5 }} />
                    Authenticating...
                  </>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1,fontSize: "1.5rem" }}>
                    <Lock fontSize="small" />
                    Sign In
                  </Box>
                )}
              </GradientButton>

              <Typography 
                variant="body2" 
                align="center" 
                sx={{ 
                  color: "#666", 
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#52a447">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11V11.99z"/>
                </svg>
                Your data is securely encrypted
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Footer */}
        <Box sx={{ 
          mt: 4, 
          textAlign: "center",
          width: "100%",
          maxWidth: "1200px",
          px: 2,
          backgroundColor: "white", // Ensure white background
          py: 3, // Add some padding
          borderRadius: 2 // Optional: rounded corners
        }}>
          <Box sx={{ display: "flex", alignItems: "center", position: "relative", mb:5, justifyContent: "center" }}>
            <Box
              component="img"
              src={pagcor}
              alt="Karera Live Logo"
              sx={{
                width: 200,
                maxWidth: "100%",
                objectFit: "contain"
              }}
            />
          </Box>
          
          {/* Copyright text with dark color */}
          <Typography variant="body2" sx={{ 
            color: "rgba(0, 0, 0, 0.8)",  // Dark gray/black
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 500
          }}>
            © {new Date().getFullYear()} karera.live All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;