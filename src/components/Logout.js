import { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import global from "../helpers/global";
import AuthContext from "../context/authentication/authContext";



const Logout = () => {
    const authContext = useContext(AuthContext);
    const { logOut } = authContext;
    return (
        <GoogleLogout
            clientId={global.clientId}
            buttonText="Cerrar Sesion"
            onLogoutSuccess={logOut}
        />
    );
}

export default Logout;