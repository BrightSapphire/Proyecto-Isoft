import {
    REGISTRO_EXITOSO,
    LOGIN_EXITOSO,
    REGISTRO_ERROR,
    EDITAR_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
    SCOPES,
    LOGIN_ROL
} from '../../types';

export default (state, action) => {
    
    switch(action.type) {
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
        case EDITAR_EXITOSO:
            localStorage.setItem('token', action.payload[1]);
            return {
                ...state,
                autenticado: true,
                token: action.payload[1],
                cargando: false,
                usuario: action.payload[0],
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                autenticado: null,
                token: null,
                usuario: null,
                cargando: false
            }
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                autenticado:true,
                usuario: action.payload,
                cargando: false,
            }
        case LOGIN_ROL:
            return{
                ...state,
                rol: action.payload
            }
        default:
            return state;
    }
}