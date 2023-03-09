import { gapi } from 'gapi-script';
import { useContext, useEffect, useState } from 'react';
import global from '../helpers/global';
import Logo from '../img/logo.png';
import AuthContext from "../context/authentication/authContext";
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import routes from '../helpers/Routes';
const Home = () => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuario, signIn, logOut, usuarioAutenticado, loginRol } = authContext;
    const history = useHistory();
    let profile = ''
    let course;
    let client_id = global.clientId;
    let scope = [
        'https://www.googleapis.com/auth/classroom.announcements',
        'https://www.googleapis.com/auth/classroom.announcements.readonly',
        'https://www.googleapis.com/auth/classroom.courses',
        'https://www.googleapis.com/auth/classroom.courses.readonly',
        'https://www.googleapis.com/auth/classroom.coursework.me',
        'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
        'https://www.googleapis.com/auth/classroom.coursework.students',
        'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
        'https://www.googleapis.com/auth/classroom.courseworkmaterials',
        'https://www.googleapis.com/auth/classroom.courseworkmaterials.readonly',
        'https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly',
        'https://www.googleapis.com/auth/classroom.guardianlinks.students',
        'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
        'https://www.googleapis.com/auth/classroom.profile.emails',
        'https://www.googleapis.com/auth/classroom.profile.photos',
        'https://www.googleapis.com/auth/classroom.push-notifications',
        'https://www.googleapis.com/auth/classroom.rosters',
        'https://www.googleapis.com/auth/classroom.rosters.readonly',
        'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
        'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly',
        'https://www.googleapis.com/auth/classroom.topics',
        'https://www.googleapis.com/auth/classroom.topics.readonly',
    ],
        inmediate = true;


    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: global.clientId,
                scope: 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.coursework.students.readonly https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.rosters.readonly'
            });
        }
        gapi.load("client:auth2", start);

    }, [])

    useEffect(() => {
        usuarioAutenticado();
        if (autenticado) {
            history.push(routes.courses);
        }
    }, [autenticado]);



    const onSuccess = (res) => {
        signIn([res.profileObj, res.getAuthResponse().id_token]);
    }

    const onFailure = (res) => {
        document.getElementById('alert').innerHTML = "Hubo un error";
    }

    return (
        <div className="wrapper">
            <div className="box-log">
                <div className="header-form">
                    <div className="logo">
                        <figure>
                            <img src={Logo} alt="Logo" />
                        </figure>
                    </div>
                    <h1>Iniciar sesión</h1>
                    <p>Continuar con <b>Take a Note</b></p>
                </div>
                <form autoComplete="off">
                    <div className="box-log-input-group">
                        {autenticado === null ?
                            <>
                                <GoogleLogin
                                    clientId={global.clientId}
                                    buttonText="Iniciar sesion con google"
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                />
                                <p id="alert"></p>
                            </> :
                            <GoogleLogout
                                clientId={global.clientId}
                                buttonText="Cerrar Sesion"
                                onLogoutSuccess={logOut}
                            />}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;