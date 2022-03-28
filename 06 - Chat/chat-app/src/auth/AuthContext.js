import React, { createContext, useCallback, useContext, useState } from 'react';
import { ChatContext } from '../context/chat/chatContext';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { types } from '../types/types';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};


export const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState(initialState);
    const {dispatch} = useContext(ChatContext);

    const login = async( email, password ) => {

        const resp = await fetchSinToken('login', {email, password}, 'POST');

        if (resp.ok ){
            const { usuario } = resp;
            localStorage.setItem('token', resp.token);

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            });

            console.log('Autenticado');
        }

        return resp.ok;

    }

    const register = async(nombre, email, password) => {

        const resp = await fetchSinToken('login/new', {nombre, email, password}, 'POST');

        if (resp.ok ){
            const { usuario } = resp;
            localStorage.setItem('token', resp.token);

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            });

            console.log('Atenticado');
        }

        return resp;
        

    }

    const verificaToken = useCallback( async() => {

        const token = localStorage.getItem('token');

        if ( !token ){
            setAuth({
                    uid: null,
                    checking: false,
                    logged: false,
                    name: null,
                    email: null
                });
            return false;
        }

        const resp = await fetchConToken('login/renew');
        if( resp.ok ){
            const { usuario } = resp;
            localStorage.setItem('token', resp.token);

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            });

            console.log('Atenticado'); 
            return true;
        }

        setAuth({
            uid: null,
            checking: false,
            logged: false,
            name: null,
            email: null
        });

        return false;

    }, [])
    
    const logout = () => {
        localStorage.removeItem('token');

        dispatch({
            type: types.cerrarSession
        })

        setAuth({
            checking: false,
            logged: false,
        });
        
    }


    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

