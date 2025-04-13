import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import CSRPage from './pages/CSRPage/CSRPage';
import { getCookie } from './utils/cookie';
import api from './api_services/api';
import ChatSupport from './pages/ChatSupport/ChatSupport';
import LiveChatSupport from './pages/ChatSupport/liveChatSupport/LiveChatSupport';
import LiveChatSupportLobbyPlayer from './pages/ChatSupport/liveChatSupport/LiveChatSupportLobbyPlayer';



const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/csr-page" element={<CSRPage />} />
          <Route path="/chat-support" element={<ChatSupport />} />
          <Route path="/game/live-chat-support" element={<LiveChatSupport />} />
          <Route path="/game/live-chat-support-lobby-player" element={<LiveChatSupportLobbyPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;