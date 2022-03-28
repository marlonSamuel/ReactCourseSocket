import React, { createContext } from 'react';
import { UseSocket } from '../hooks/useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    const {socket, online } = UseSocket('http://localhost:8080');
  return (
    <SocketContext.Provider value={{socket, online}}>
        {children}
    </SocketContext.Provider>
  )
}
