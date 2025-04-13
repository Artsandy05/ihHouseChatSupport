export default class WebSocketManager {
  constructor(url) {
      this.url = url;
      this.ws = null;
      this.onMessage = () => {};
      this.onOpen = () => {};
      this.onError = () => {};
      this.onClose = () => {};
  }

  connect() {
      this.ws = new WebSocket(this.url);
      this.ws.onopen = () => this.onOpen();
      this.ws.onmessage = (event) => this.onMessage(event);
      this.ws.onerror = (error) => this.onError(error);
      this.ws.onclose = (event) => this.onClose(event);
  }

  send(data) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(data);
      } else {
          console.warn('WebSocket is not open.');
      }
  }

  close() {
      if (this.ws) {
          this.ws.close();
          this.ws = null; // Clear the WebSocket instance
      }
  }

  setOnMessage(callback) {
      this.onMessage = callback;
  }

  setOnOpen(callback) {
      this.onOpen = callback;
  }

  setOnError(callback) {
      this.onError = callback;
  }

  setOnClose(callback) {
      this.onClose = callback;
  }
}