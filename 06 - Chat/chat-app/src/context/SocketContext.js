import React, { createContext, useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';
import { UseSocket } from '../hooks/useSocket';
import { types } from '../types/types';
import { ChatContext } from './chat/chatContext';

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    const {socket, online, conectarSocket, desconectarSocket } = UseSocket('http://localhost:8080');

    const { auth } = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(() => {
        if ( auth.logged ) {
            conectarSocket();
        }
    }, [ auth, conectarSocket ]);

    useEffect(() => {
        if ( !auth.logged ) {
            desconectarSocket();
        }
    }, [ auth, desconectarSocket ]);

    //escuchar los cambios en los usuario conectados
    useEffect(() => {
        socket?.on( 'lista-usuarios', (usuarios) => {
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            });
        } )
    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on( 'mensaje-personal', (mensaje) => {
            console.log(mensaje);
            //Dispatch de una cción y mover el scroll al final
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            });

            //scroll
            scrollToBottomAnimated('mensajes');

        } )
    }, [socket, dispatch]);
    

    return (
        <SocketContext.Provider value={{socket, online}}>
            {children}
        </SocketContext.Provider>
    )
}
