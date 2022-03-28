import React from 'react';
import HomePage from './HomePage';
import { SocketProvider } from './context/SocketContext';

function BandNamesApp() {
  return (
    <SocketProvider>
        <HomePage />
    </SocketProvider>
  )
}

export default BandNamesApp;