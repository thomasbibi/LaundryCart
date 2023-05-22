import React, { useContext } from 'react'
import Footer2 from './Footer_2'
import Navbar from './Navbar'
import Footer from './Footer'
import AuthContext from '../Context/AuthContext'

export default function Layout({ children }) {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <Navbar user={user} />
            <div>
                {children}
            </div>
            {!user && <Footer />}
            <Footer2 />
        </div>
    )
}