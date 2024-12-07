import { SOCKET_BASE_URL } from "@/constant";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// Establish the socket connection
export const connectSocket = (): Socket => {
  if (!socket) {
    const token = localStorage.getItem('token');
    socket = io(SOCKET_BASE_URL, {
      auth: {
        authorization: token,
      },
      transports: ['websocket', 'polling'],
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });
  }
  return socket;
};

// Disconnect the socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Export the socket instance to use directly
export const getSocket = (): Socket | null => socket;
