import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
            } else {
                setUserId(decoded?.user?.id);
            }
        }

        if(token && (location.pathname === '/login' || location.pathname === '/register')){
            navigate('/');
        }

        if(!token && (location.pathname === '/profile' )){
            navigate('/login');
        }
        setLoading(false);
    }, [location, navigate]);

    useEffect(()=>{
        const fetcUser = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getUserById/${userId}`);
                if (response.status === 200) {
                    setUser(response.data);
                    setIsLogged(true);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        }

        if(userId){
            fetcUser();
        }
    }, [userId, location])

    useEffect(() => {
        const userId = user?._id;
        console.log(userId)
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses/getCourses/${userId}`);
                console.log(response)
                if (response.statusText === 'OK') {
                    setCourses(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch user courses', error);
            }
        }

        if(userId){
            fetchCourses();
        }
    }, [user, location])

    console.log(userId)

    return (
        <AuthContext.Provider value={{ user, isLogged, loading, courses }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
