import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api_services/api";
import { setCookie } from "../utils/cookie";
import { motion, AnimatePresence } from "framer-motion";
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
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: "white",
  borderRadius: 12,
  padding: "12px 24px",
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 12px rgba(82, 164, 71, 0.3)`,
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  },
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

  // Floating particles for background
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: `${Math.random() * 10 + 5}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 30 + 20,
    opacity: Math.random() * 0.6 + 0.2,
    blur: Math.random() * 3 + 1
  }));

  // Floating leaves for background
  const leaves = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    size: `${Math.random() * 40 + 20}px`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 40 + 30,
    rotation: Math.random() * 360,
    opacity: Math.random() * 0.4 + 0.2
  }));

  return (
    <Box sx={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(135deg, #f8faf9 0%, #e8f4f0 100%)",
      position: "fixed",
      top: 0,
      left: 0,
      overflow: "hidden",
      margin: 0,
      padding: 0
    }}>
      {/* Animated background particles */}
      <Box sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        filter: "blur(0.5px)"
      }}>
        {particles.map(particle => (
          <Box
            key={`particle-${particle.id}`}
            component={motion.div}
            initial={{ 
              y: 0, 
              x: particle.left,
              opacity: 0
            }}
            animate={{
              y: [0, -1000],
              x: [particle.left, `${parseFloat(particle.left) + Math.random() * 20 - 10}%`],
              opacity: [0, particle.opacity, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay
            }}
            sx={{
              position: "absolute",
              borderRadius: "50%",
              opacity: particle.opacity,
              background: `rgba(82, 164, 71, ${particle.opacity})`,
              width: particle.size,
              height: particle.size,
              filter: `blur(${particle.blur}px)`
            }}
          />
        ))}
        
        {/* Floating leaves */}
        {leaves.map(leaf => (
          <Box
            key={`leaf-${leaf.id}`}
            component={motion.div}
            initial={{ 
              y: 0, 
              x: leaf.left,
              opacity: 0,
              rotate: leaf.rotation
            }}
            animate={{
              y: [0, -800],
              x: [leaf.left, `${parseFloat(leaf.left) + Math.random() * 30 - 15}%`],
              opacity: [0, leaf.opacity, 0],
              rotate: [leaf.rotation, leaf.rotation + 180]
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              ease: "linear",
              delay: leaf.delay
            }}
            sx={{
              position: "absolute",
              opacity: leaf.opacity,
              width: leaf.size,
              height: leaf.size,
              backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%2352a447\"><path d=\"M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z\"/></svg>')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
            }}
          />
        ))}
      </Box>

      {/* Main content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
          py: 4,
          position: "relative",
          zIndex: 1,
          margin: 0,
          padding: 0
        }}
      >
        {/* Header */}
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
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
            <Box
              component={motion.div}
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.3 }}
              sx={{ mr: 2 }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24">
                <motion.path
                  d="M12 2L4 12L12 22L20 12L12 2Z"
                  fill="#52a447"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
                <motion.path
                  d="M12 6L8 12L12 18L16 12L12 6Z"
                  fill="#3d7e34"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              </svg>
            </Box>
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
              <Box 
                component={motion.span}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                sx={{
                  backgroundSize: "200% auto",
                  display: "inline-block"
                }}
              >
                Kingfisher777
              </Box>
              <Box
                component={motion.div}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                sx={{
                  position: "absolute",
                  bottom: -5,
                  left: 0,
                  width: "100%",
                  height: 3,
                  background: "linear-gradient(90deg, #52a447, #3d7e34)",
                  transformOrigin: "left center",
                  borderRadius: 3
                }}
              />
            </Typography>
          </Box>

          <Box 
            component={motion.div} 
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "1.1rem",
              color: "#52a447",
              fontWeight: 600,
              background: "rgba(82, 164, 71, 0.1)",
              p: "10px 20px",
              borderRadius: 50,
              border: "2px solid rgba(82, 164, 71, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}>
              <AnimatePresence>
                {isHovering && (
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    exit={{ opacity: 0 }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "radial-gradient(circle, rgba(82,164,71,0.3) 0%, rgba(82,164,71,0) 70%)",
                    }}
                  />
                )}
              </AnimatePresence>
              <Lock fontSize="small" sx={{ color: "#3d7e34" }} />
              <Box 
                component={motion.span}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Secured Login
              </Box>
            </Box>
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
                background: "linear-gradient(135deg, #52a447, #3d7e34)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              Welcome
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center" 
              sx={{ 
                color: "#666", 
                mb: 4,
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              Sign in to your Kingfisher777 CSR account
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
                      <Fingerprint sx={{ color: "action.active" }} />
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
                  py: 1.5,
                  fontSize: "1rem"
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={22} sx={{ color: "white", mr: 1.5 }} />
                    Authenticating...
                  </>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          px: 2
        }}>
          <Typography variant="body2" sx={{ color: "#666", fontFamily: "'Roboto', sans-serif" }}>
            © {new Date().getFullYear()} Kingfisher. All rights reserved.
          </Typography>
          <Grid 
            container 
            spacing={2} 
            justifyContent="center" 
            sx={{ 
              mt: 1,
              '& .MuiGrid-item': {
                display: 'flex',
                alignItems: 'center'
              }
            }}
          >
            <Grid item>
              <Typography
                variant="caption"
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 0.5,
                  color: "#52a447",
                  fontWeight: 500
                }}
              >
                <Security fontSize="small" /> 256-bit SSL Encryption
              </Typography>
            </Grid>
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                backgroundColor: "rgba(82, 164, 71, 0.3)", 
                height: 16,
                my: "auto"
              }} 
            />
            <Grid item>
              <Typography
                variant="caption"
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 0.5,
                  color: "#52a447",
                  fontWeight: 500
                }}
              >
                <VerifiedUser fontSize="small" /> Licensed and Regulated
              </Typography>
            </Grid>
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                backgroundColor: "rgba(82, 164, 71, 0.3)", 
                height: 16,
                my: "auto"
              }} 
            />
            <Grid item>
              <Typography
                variant="caption"
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 0.5,
                  color: "#52a447",
                  fontWeight: 500
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#52a447">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
                GDPR Compliant
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;