import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { signOut } from 'firebase/auth'
import {auth} from '../firebase-config'

function Navbar() {

    const {toggleModals} = useContext(UserContext)
    const navigate = useNavigate()

    const logOut = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch (err) {
            console.log('For some reason we could not disconnect!')
        }
    }

    return (
        <nav className='navbar navbar-light bg-light px-4'>
            <Link to="/" className='navbar-brand'>
                AuthJs
            </Link>

            <div>
                <button className='btn btn-primary'
                    onClick={() => toggleModals('signup')}
                >
                    Sign Up
                </button>
                <button className='btn btn-primary ms-2'
                    onClick={() => toggleModals('signin')}
                >
                    Sign In
                </button>
                <button 
                onClick={logOut}
                className='btn btn-danger ms-2'
                >
                    LogOut
                </button>
            </div>

        </nav>
    )
}

export default Navbar