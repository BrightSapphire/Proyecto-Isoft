import { useEffect } from "react";
import { Redirect, Route } from "react-router";
import routes from "../helpers/Routes";
import useAuth from "../hooks/useAuth";

const PrivateRoute = (props) => {
    const { usuario, usuarioAutenticado } = useAuth();

    useEffect(() => {
        if(!usuario) usuarioAutenticado();
    }, [])

    if(!usuario) return <Redirect to={routes.home} />
    return(
        <Route {...props} />
    );
}

export default PrivateRoute;