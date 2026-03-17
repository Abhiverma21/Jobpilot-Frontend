import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on app start
        const token = localStorage.getItem("token");
        if (token) {
            // Fetch user profile from backend
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/profile", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser({
                    _id: userData._id,
                    name: userData.username,
                    email: userData.email
                });
            } else {
                // Token might be invalid, remove it
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.log("Error fetching user profile:", error);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    const login = (data) =>{
        localStorage.setItem("token" , data.token);
        setUser({
            _id: data._id,
            name: data.username,
            email: data.email
        });
    }

    const logout = () =>{
        localStorage.removeItem("token");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}