import createEncryptor from "./createEncryptor";

const encryptor = createEncryptor(import.meta.env.VITE_DECRYPTION_KEY);

/**
 * Will return either with uuid (for testing) or with token when returning URL
 */
export function getRequiredUrl(liveChatUrl = false, userInfo = false) {
  const url = getWsUrl(liveChatUrl, userInfo);
  return url;
}

function getWsUrl(liveChatUrl = false, userInfo) {
  const wsBaseUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8001/api';
  const encryptedUserInfo = encryptor.encryptParams(userInfo);

  let url = liveChatUrl
    ? `${wsBaseUrl}/livechat?userInfo=${encryptedUserInfo}`
    : `${wsBaseUrl}/websocket?userInfo=${encryptedUserInfo}`;

  // Determine the game based on the pathname
  let game = 'null';
  let isPlayerInChatSupport = false;

  if (window.location.pathname.includes('/dos-letra')) {
    game = 'dos';
  } else if (window.location.pathname.includes('/zodiac')) {
    game = 'zodiac';
  } else if (window.location.pathname.includes('/live-chat-support')) {
    isPlayerInChatSupport = true;
  }

  // Add the game parameter if it has a value
  if (game) {
    url += `&game=${game}`;
  }
  if (isPlayerInChatSupport) {
    url += `&isPlayerInChatSupport=${isPlayerInChatSupport}`;
  }

  return url;
}
