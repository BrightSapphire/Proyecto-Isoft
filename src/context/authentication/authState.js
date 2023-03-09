import React, { useReducer } from 'react';

import clienteAxios from '../../config/axios';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
    LOGIN_ROL
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        cargando: true,
        rol: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signIn = (datos) => {
        if (datos !== null) {
            dispatch({
                type: LOGIN_EXITOSO,
                payload: datos
            })
            usuarioAutenticado();
        } else {
            dispatch({
                type: LOGIN_ERROR,
            })
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const respuesta = await clienteAxios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
            if (respuesta.data !== null) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data
                })

            }
        } else {
            console.log("F")
        }
    }

    const loginRol = (datos) => {
        dispatch({
            type: LOGIN_ROL,
            payload: datos
        })

    }

    const logOut = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                cargando: state.cargando,
                rol: state.rol,
                signIn,
                usuarioAutenticado,
                loginRol,
                logOut
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;