import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Sidenav.css'


function Sidenav() {

    const navigate = useNavigate()

    return (
        <div className='Sidenav'>
            <section className='sidebar'>

                <div>
                    <div onClick={()=>{navigate("/home")}} className='div-icons'>
                        <img className='hover' src={require("../Assets/home-run (1).png")} alt="df" />
                    </div>
                    <div className='div-icons' onClick={()=>{navigate("/createorder")}} >
                        <img className='hover' src={require("../Assets/more.png")} alt="df" />
                    </div>
                    <div style={{ backgroundColor: "white" }} className='div-icons'>
                        <img className='hover' src={require("../Assets/list.png")} alt="df" />
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Sidenav