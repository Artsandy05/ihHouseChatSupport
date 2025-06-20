import { catchError, useAxios } from "./chatSupportAxios";

export const getAllActiveCsr = async () => {
  return await useAxios
    .get(`/get-all-active-csr-v2`)
    .then((res) => res.data)
    .catch(catchError);
};

export const getAllConversation = async (userId, status = false) => {
  return await useAxios
    .get(`/get-all-conversation`, { params: { userId, status } })
    .then((res) => res.data)
    .catch(catchError);
};

export const logout = async (userId) => {
  return await useAxios
    .post(`/auth/logout`, { userId })
    .then((res) => res.data)
    .catch(catchError);
};

export const getPlayerIdByUUID = async (uuid) => {
  return await useAxios
    .get(`/get-playerID-by-uuid`, { params: { uuid } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getMessagesByConvoId = async (convoId) => {
  return await useAxios
    .get(`/get-messages-by-convoId`, { params: { convoId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getTransactionStatistics = async () => {
  return await useAxios
    .get(`/get-transaction-statistics`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getRepresentativeTransaction = async (representativeId) => {
  return await useAxios
    .get(`/get-representative-transaction`, { params: { representativeId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getPlayerBalance = async (id) => {
  return await useAxios
    .get(`/get-player-balance`, { params: { id } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getTopWinnerAmount = async () => {
  return await useAxios
    .get(`/get-top-winner-amount`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getUserById = async (id) => {
  return await useAxios
    .get(`/get-user-by-id`, { params: { id } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getConvo = async (conversationId) => {
  return await useAxios
    .get(`/get-convo`, { params: { conversationId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const checkConvoHasConcern = async (convoId) => {
  return await useAxios
    .get(`/check-convo-has-concern`, { params: { convoId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const checkIfUserHasActiveBadge = async (userId, uuid) => {
  return await useAxios
    .get(`/check-user-has-active-badge`, { params: { userId, uuid } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const checkUserLoginLastWeek = async (userId) => {
  return await useAxios
    .get(`/check-user-login-last-week`, { params: { userId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getTopGifters = async () => {
  return await useAxios
    .get(`/get-top-gifters`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getTotalPlayerBetsForLastMonth = async (userId) => {
  return await useAxios
    .get(`/get-total-player-bets-for-last-month`, { params: { userId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getTransactionCountForLastWeek = async (userId) => {
  return await useAxios
    .get(`/get-transaction-count-last-week`, { params: { userId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getBadgeByUserId = async (userId) => {
  return await useAxios
    .get(`/get-badge-by-user-id`, { params: { userId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const createPlayerBadge = async (badgeId, userId, expirationDate) => {
  return await useAxios
    .post(`/create-player-badge`, {
      badgeId,
      userId,
      expirationDate
    }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const checkLikedHost = async (hostId, likerId) => {
  return await useAxios
    .get(`/check-liked-host`, { params: { hostId, likerId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const countLikes = async (hostId) => {
  return await useAxios
    .get(`/count-likes`, { params: { hostId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getConcerns = async () => {
  return await useAxios
    .get(`/get-concerns`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getWinningBallsWithProbabilities = async () => {
  return await useAxios
    .get(`/get-winning-balls-with-probabilities`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getHosts = async () => {
  return await useAxios
    .get(`/get-hosts`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getHostRanking = async () => {
  return await useAxios
    .get(`/get-host-ranking`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getDailyPlayerRanking = async () => {
  return await useAxios
    .get(`/get-daily-player-ranking`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getTopGiversRanking = async (hostId) => {
  return await useAxios
    .get(`/get-top-givers-ranking`, { params: { hostId } }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getOverallTopGiversRanking = async () => {
  return await useAxios
    .get(`/get-overall-top-givers-ranking`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const updateConversationConcernId = async (id, concern_id) => {
  return await useAxios
    .post(`/update-conversation-concern`, {
      id,
      concern_id,
    }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const updateConversationStatus = async (id, status) => {
  return await useAxios
    .post(`/update-conversation-status`, {
      id,
      status,
    }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const updateMessageRead = async (conversation_id, role) => {
  return await useAxios
    .post(`/update-message-read`, {
      conversation_id,
      role
    }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const sendGift = async (hostId, senderId, amount) => {
  return await useAxios
    .post(`/send-gift`, {
      hostId,
      senderId,
      amount
    }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const likeHost = async (hostId, likerId) => {
  return await useAxios
    .post(`/like-host`, {
      hostId,
      likerId
    }) 
    .then((res) => res.data)
    .catch(catchError);
};

export const getRepresentativePlayerTransactions = async () => {
  return await useAxios
    .get(`/get-representative-player-transactions`) 
    .then((res) => res.data)
    .catch(catchError);
};

export const claimRepresentativePlayerTransactions = async (representativePlayerTransactions, userId) => {
  return await useAxios
    .post(`/claim-representative-player-transactions`, {
      representativePlayerTransactions,
      user_id: userId
    })
    .then((res) => res.data)
    .catch(catchError);
};

export const createConversation = async (player_id, csr_id) => {
  try {
    // Create Conversation
    const conversationResponse = await useAxios.post('/create-conversation', {
      player_id: player_id,
      csr_id: csr_id,
    }).then(res => res.data)
      .catch(catchError);
    const conversationId = conversationResponse.data.id;
    
    // Update ConversationStatusUpdate
    await useAxios.post('/create-conversation-status-update', {
      conversation_id: conversationId,
      status: 'New',
      updated_by: csr_id,
    }).then(res => res.data)
      .catch(catchError);
    
    return conversationId;
  } catch (error) {
    console.error("Error creating conversation:", error);
  }
};

export const rateChat = async (player_id, csr_id, conversation_id, rate) => {
  try {
    await useAxios.post('/rate-chat', {
      player_id: player_id,
      csr_id: csr_id,
      conversation_id: conversation_id,
      rate: rate
    }).then(res => res.data)
      .catch(catchError);
  } catch (error) {
    console.error("Error rating chat:", error);
  }
};