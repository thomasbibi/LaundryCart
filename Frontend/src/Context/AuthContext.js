import { createContext, useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import ToastContext from "./ToastContext";
const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const { toast } = useContext(ToastContext)

    const navigate = useNavigate()
    const location = useLocation()


    const [user, setUser] = useState(null)


    useEffect(() => {
        isLoggedIn()
    }, [])


    const isLoggedIn = async () => {
      
        try {
            const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
            const res = await axios.post("http://localhost:5000/users/isLoggedIn", null, { headers })
            setUser(res.data)

            if (location.pathname === "/" || location.pathname === "/signup") {
                navigate("/home",{replace:true});
            } else {
                navigate(location.pathname)
            }


        } catch (error) {
            navigate("/")
            //console.log(error);
            toast.error("Please Login First")
        }
    }


    const Login = async (UserDetails) => {

        try {
            //console.log(UserDetails);
            const res = await axios.post("http://localhost:5000/users/login", UserDetails)
            setUser(res.data.user)
            //console.log(res);
            toast.success(`Hello ${res.data.user.name}`)
            sessionStorage.setItem("token",res.data.token)
            navigate("/home",{replace:true})

        } catch (error) {
            //console.log(error);
            toast.error(error.response.data);
        }
    }

    const SignUp = async (UserDetails) => {

        try {
            //console.log(UserDetails);
            const res = await axios.post("http://localhost:5000/users/signup", UserDetails)
            //console.log(res);
            toast.success("User Registered Successfully")
            navigate("/",{replace:true})

        } catch (error) {
          toast.error(error.response.data);
        }
    }



    return (
        <AuthContext.Provider value={{ user, setUser, Login, SignUp }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;