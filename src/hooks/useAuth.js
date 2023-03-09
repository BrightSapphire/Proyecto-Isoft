import { useContext } from "react";

import AuthContext from '../context/authentication/authContext';

export default () => useContext(AuthContext);