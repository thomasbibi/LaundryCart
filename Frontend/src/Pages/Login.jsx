import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import ToastContext from '../Context/ToastContext';
import '../Styles/Login.css'
export default function Login() {

  const navigate = useNavigate()

  useEffect(()=>{
    if(user){
      console.log("hello");
      navigate("/home",{replace:true})
    }
  },[])
  const { toast } = useContext(ToastContext)
  const { Login,user } = useContext(AuthContext)

  const [userDetails, setUSerDetails] = useState({
    email: "",
    password: ""
  })


  const handleInput = (e) => {
    const { name, value } = e.target
    setUSerDetails({ ...userDetails, [name]: value })
  }


  const handleLogin = () => {
    let emailREG = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    let phoneREG = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)

    if (userDetails.email.match(emailREG) || userDetails.email.match(phoneREG)) {
      //console.log(userDetails);
    } else {
      return toast.error("Email or Phone Number Not Valid")
    }

    if (userDetails.password.length < 6) {
      return toast.error("Password Length should be > 6")
    }
    Login(userDetails)

  }

  return (
    <div>
      <div className='cont'>
        <section className='Register-Home-Page'>
          <div className='Register-div'>
            <div className='Heading-tag'>

              <h1 className='laundry-heading'>Laundry</h1>
              <h1 className='laundry-heading'>Service</h1>

            </div>
            <div className='para-tag'>

              <p>Doorstep Wash & Dryclean Service</p>

            </div>
            <div className='para-tag-2'>

              <p>Don't Have An Account?</p>

            </div>
            <div className='btn-tag'>

              <button style={{ borderRadius: '3px', width: '110px', height: '40px', border: '1px solid #5861AE' }}><Link to={'/Signup'} style={{ textDecoration: 'none', color: ' #5861AE' }}>Register</Link></button>

            </div>
          </div>
        </section>
        <div style={{ borderLeft: " 2px solid #5861AE", height: "150px", marginTop: "30vh" }}>

        </div>
        <section className='Signin-Home-Page' >
          <div className='Signin-div'>
            <div className='para-sign-in-div'>SIGN IN </div>
            <div className='text-div'>
              <input type="text" placeholder='Email / Mobile'
                name='email' className='signin-input-class'
                onChange={handleInput} />
            </div>
            <div className='password-div'>
              <input type="password" placeholder='Password'
                name='password' className='signin-input-class'
                onChange={handleInput} />
              <p className='forget-password-class' style={{ color: '#4552C1' }}>Forget Password?</p>
            </div>
            <div className='sign-in-btn-div'>
              <button className='sign-in-btn' onClick={() => { handleLogin() }}
                style={{ borderRadius: '3px', width: '90px', height: '40px', backgroundColor: ' #4552C1 ', border: 'none', color: "white" }}>
                Sign In
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}