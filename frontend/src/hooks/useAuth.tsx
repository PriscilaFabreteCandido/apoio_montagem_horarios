import { createContext, useContext} from "react";
import AuthProvider from "../context/AuthProvider";


const authContext = AuthProvider;

const useAuth = () => {
    return useContext(authContext)
}

export default useAuth;