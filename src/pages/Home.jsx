import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import {UserContext} from '../context/userContext'

const Home = () => {

  const welcome = <Link to='/private/private-home'>Go to dash</Link> 
  const {currentUser} = useContext(UserContext)

  return (
    <div className='container p-5'>
        <h1 className='display-3 text-light text-center'>
            {currentUser ? 'Welcome Buddy' && welcome : 'Hi, Sign Up or Sign In'}
        </h1>
    </div>
  )
}

export default Home