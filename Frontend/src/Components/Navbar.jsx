import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import ToastContext from '../Context/ToastContext'
import "../Styles/Navbar.css"
import { useRef } from 'react'
import AuthContext from '../Context/AuthContext'
export default function Navbar() {

    const scrollRef = useRef()
    const { user, setUser } = useContext(AuthContext)
    const { toast } = useContext(ToastContext)
    const navigate = useNavigate()
    scrollRef.current?.scrollIntoView()

    return (

        <nav style={{width:"100vw"}} ref={scrollRef}>
            <ul className='logo'>
                <li className='fs-4'>
                    <Link style={{ color: "#5861AE" }} to={"/home"}>LAUNDRY</Link>
                </li>
            </ul>

            <ul className='links'>
                {!user && <li>
                    Home
                </li>}
                <li>
                    Pricing
                </li>
                <li>
                    Career
                </li>

                {!user ? <>
                    <li style={{ backgroundColor: "#5861AE" }}>
                        <Link style={{ color: "white" }} to={"/signup"}>Sign In</Link>
                    </li>
                </>
                    :
                    <li style={{ backgroundColor: "#5861AE" }}>
                        <div class="dropdown drop-style">
                            <button className="btn btn-secondary dropdown-toggle" style={{ backgroundColor: "#5861AE", border: "0" }} data-bs-toggle="dropdown" aria-expanded="false">
                                {user?.name}
                            </button>
                            <div class="dropdown-menu">
                                <li className='fs-5'>
                                    <button className="dropdown-item"
                                        style={{ margin: "0 auto", textAlign: "center", backgroundColor: "red", borderRadius: "10px", color: "white" }}
                                        onClick={() => {
                                            setUser(null)
                                            sessionStorage.clear()
                                            navigate("/")
                                            toast.success("Logged Out")
                                        }}>Logout</button>
                                </li>
                            </div>
                        </div>
                    </li>
                }
            </ul>

        </nav >
    )
}