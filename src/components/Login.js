import { useContext, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';

import global from "../helpers/global";
import AuthContext from "../context/authentication/authContext";
import routes from '../helpers/Routes';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const {navigate, signIn} = props;
    
    
    return (
        <>
            
        </>
    );
}

export default Login;