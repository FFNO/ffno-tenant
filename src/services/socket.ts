import { CHAT_PATTERNS, ISendMessageDto } from '@/libs';
import { Socket, io } from 'socket.io-client';

class SocketService {
  public readonly socket: Socket = io(import.meta.env.VITE_SOCKET_URL, {
    autoConnect: true,
    withCredentials: true,
  });

  connectWithAuthToken(token: string) {
    this.socket.auth = { token };
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(data: ISendMessageDto) {
    console.log('🚀 ~ SocketService ~ sendMessage ~ data:', data);
    this.socket.emit(CHAT_PATTERNS.SEND_MESSAGE, data);
  }

  notifyTyping(roomId: number) {
    this.socket.emit('isTyping', roomId);
  }
  //   subscribeToTypingNotifications(
  //     typingNotificationsHandler: ServerToClientEvents['isTyping'],
  //   ) {
  //     this.socket.on('isTyping', typingNotificationsHandler);
  //   }

  //   joinRoom(roomId: number) {
  //     this.socket.emit('join', roomId);
  //   }

  //   leaveRoom(roomId: number) {
  //     this.socket.emit('leave', roomId);
  //   }
}

export const socketService = new SocketService();
