import { createContext, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode'; 
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
            } else {
                setUser(decoded);
                setIsLogged(true);
            }
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLogged, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
