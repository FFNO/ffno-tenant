import { CHAT_PATTERNS, ISendMessageDto } from '@/libs';
import { Socket, io } from 'socket.io-client';

class SocketService {
  private readonly socket: Socket = io(import.meta.env.VITE_SOCKET_URL, {
    autoConnect: false,
    withCredentials: true,
  });

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  ping() {
    this.socket.emit(CHAT_PATTERNS.PING);
  }

  sendMessage(data: ISendMessageDto) {
    console.log('🚀 ~ SocketService ~ sendMessage ~ data:', data);
    this.socket.emit(CHAT_PATTERNS.SEND_MESSAGE, data);
  }

  subscribeTo(event: string, callback: () => void) {
    this.socket.on(event, callback);
  }

  unsubscribeTo(event: string) {
    this.socket.off(event);
  }
}

export const socketService = new SocketService();
