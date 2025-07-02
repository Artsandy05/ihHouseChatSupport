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
  CircularProgress
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  AccountCircle,
  Diamond
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Custom styled components with luxury dark theme
const FloatingLabelTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: "#aaa",
  },
  "& label.Mui-focused": {
    color: "#d4af37",
    transform: "translate(14px, -9px) scale(0.75)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#d4af37",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: "rgba(212, 175, 55, 0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#d4af37",
      boxShadow: "0 0 0 2px rgba(212, 175, 55, 0.2)",
    },
    "& .MuiInputBase-input": {
      color: "#fff",
    }
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(to right, #d4af37, #f9e076)",
  color: "#141414",
  borderRadius: 12,
  fontWeight: 700,
  letterSpacing: 0.5,
  textTransform: "none",
  boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(212, 175, 55, 0.4)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
  "&.Mui-disabled": {
    background: "rgba(212, 175, 55, 0.3)",
    color: "rgba(255, 255, 255, 0.5)"
  }
}));

const CSRLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (userData) {
      navigate('/dashboard');
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

      navigate('/dashboard');

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
      background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: 2
    }}>
      {/* Decorative diamond elements */}
      <Box sx={{
        position: "absolute",
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        opacity: 0.1,
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0) 70%)",
        zIndex: 0
      }} />
      
      <Box sx={{
        position: "absolute",
        bottom: -150,
        right: -150,
        width: 400,
        height: 400,
        opacity: 0.1,
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, rgba(212, 175, 55, 0) 70%)",
        zIndex: 0
      }} />

      {/* Main login card */}
      <Paper
        component={motion.div}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          width: "100%",
          maxWidth: 500,
          background: "rgba(30, 30, 30, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative",
          overflow: "hidden",
          zIndex: 1
        }}
      >
        {/* Diamond border accent */}
        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(to right, transparent, #d4af37, transparent)"
        }} />
        
        {/* Logo and header */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          mb: 4,
          position: "relative"
        }}>
          <Box
            component={motion.div}
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(212, 175, 55, 0.1)",
              borderRadius: "50%",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              mb: 2
            }}
          >
            <Diamond sx={{ 
              fontSize: 32, 
              color: "#d4af37",
              filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.5))"
            }} />
          </Box>
          
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              mb: 1,
              background: "linear-gradient(to right, #d4af37, #f9e076)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center"
            }}
          >
            MEMORAORBS
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: "#aaa",
              textAlign: "center",
              maxWidth: "80%"
            }}
          >
            Secure access to your digital memories
          </Typography>
        </Box>

        {/* Login form */}
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
                  <AccountCircle sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
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
                  <Lock sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      '&:hover': {
                        background: "rgba(212, 175, 55, 0.1)"
                      }
                    }}
                  >
                    {passwordVisible ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
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
                  color: "#ff6b6b",
                  bgcolor: "rgba(255, 107, 107, 0.1)",
                  p: 2,
                  borderRadius: 2,
                  mb: 3,
                  textAlign: "center",
                  borderLeft: "3px solid #ff6b6b"
                }}
              >
                <Typography variant="body2">{error}</Typography>
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
                <CircularProgress size={22} sx={{ color: "#141414", mr: 1.5 }} />
                Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </GradientButton>

          <Typography 
            variant="body2" 
            sx={{ 
              color: "#666", 
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1
            }}
          >
            <Lock sx={{ fontSize: 16, color: "#d4af37" }} />
            <span>Your data is securely encrypted</span>
          </Typography>
        </Box>
      </Paper>

      {/* Footer */}
      <Box sx={{ 
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: "center"
      }}>
        <Typography variant="body2" sx={{ 
          color: "rgba(255, 255, 255, 0.5)", 
          fontFamily: "'Roboto', sans-serif"
        }}>
          © {new Date().getFullYear()} Memoraorbs. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default CSRLogin;