import React from 'react'
import '../Styles/Footer.css'
import { FiInstagram } from 'react-icons/fi';
import { BsFacebook } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai'
import circles from"../Assets/Footer.png"
export default function Footer() {
    return (
        <div>
            <footer style={{ backgroundImage: `url(${circles})`,backgroundPositionY:"30px" }}>
                <div className='Referal-div' style={{borderTop:"2px solid #5861AE"}}>
                    <h6 className='refer-para'>Now Refer & Earn 500 For every referal*</h6>
                    <h6 className='terms-condition-tag'>*Terms and conditions will be applied</h6>
                </div>
                <div className='footer-container'>
                    <div className='about-us-class'>
                        <h6>About Us</h6>
                        <p>Doorstep Wash & Dryclean Service</p>
                    </div>
                    <div className='home-footer-class'>
                        <h6>Home</h6>
                        <p>Signin</p>
                        <p>Register</p>
                    </div>
                    <div className='pricing'>
                        <h6>Pricing</h6>
                    </div>
                    <div className='career-class'>
                        <h6>Career</h6>
                        <p>Blogs</p>
                        <p>Create</p>
                    </div>
                    <div className='contact-class'>
                        <h6>Contact</h6>
                    </div>
                    <div className='social-media-class'>
                        <h6>SOCIAL MEDIA</h6>
                        <span className='fi-icons'><FiInstagram /></span>
                        <span className='fi-icons'><BsFacebook /></span>
                        <span className='fi-icons'><AiFillLinkedin /></span>
                    </div>
                </div>
            </footer>
        </div>
    )
}