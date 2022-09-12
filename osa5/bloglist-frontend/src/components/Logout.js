import React from 'react'

const Logout = ({name, handleLogout}) => {
  return (
    <div>
         <p>{name} logged in</p>
         <button onClick={handleLogout} >logout</button>
    </div>
  )
}

export default Logout