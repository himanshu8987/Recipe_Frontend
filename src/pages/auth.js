import React from 'react'
import Login from '../components/login'
import Register from '../components/register'

function Auth() {
  return (
    <div className='auth'>
      <Login />
      <Register />
    </div>
  )
}

export default Auth