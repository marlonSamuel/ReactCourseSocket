import React from 'react';
import ReactDOM from 'react-dom';
import { SocketProvider } from './context/SocketContext';
import './index.css';
import { MapsApp } from './MapsApp';

ReactDOM.render(
  <SocketProvider>
      <MapsApp />
  </SocketProvider>
    ,
  document.getElementById('root')
);
