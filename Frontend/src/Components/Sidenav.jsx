import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Sidenav.css'
import home from "../Assets/home-run (1).png"
import more from "../Assets/more.png"
import list from "../Assets/list.png"


function Sidenav() {

    const navigate = useNavigate()

    return (
        <div className='Sidenav'>
            <section className='sidebar'>

                <div>
                    <div onClick={()=>{navigate("/home")}} className='div-icons'>
                        <img className='hover' src={home} alt="df" />
                    </div>
                    <div className='div-icons' onClick={()=>{navigate("/createorder")}} >
                        <img className='hover' src={more} alt="df" />
                    </div>
                    <div style={{ backgroundColor: "white" }} className='div-icons'>
                        <img className='hover' src={list} alt="df" />
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Sidenav