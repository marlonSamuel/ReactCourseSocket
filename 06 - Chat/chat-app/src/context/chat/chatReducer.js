import { types } from "../../types/types";


export const chatReducer = (state, action) => {

    switch ( action.type ) {
        case types.usuariosCargados:
            return {
                ...state,
                usuarios: [...action.payload]
            }
        case types.activarChat:
            if (state.chatActivo == action.payload) return state;
            return {
                ...state,
                chatActivo: action.payload
            }  
        case types.nuevoMensaje:
            if (state.chatActivo == action.payload.de || state.chatActivo == action.payload.para){
                return {
                    ...state,
                    mensajes: [...state.mensajes, action.payload]
                }
            }
            return state; 
        case types.cargarMensajes:
            return {
                ...state,
                mensajes: [...action.payload]
            }
        case types.cerrarSession:
            return {
                uid: '',
                chatActivo: null,
                usuarios: [],
                mensajes: []
            }
                                
        default:
            return state;
    }
}
