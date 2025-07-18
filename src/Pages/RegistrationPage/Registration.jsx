import React from 'react'
import RegistrationNav from './Components/RegistrationNav'
import RegistrationForm from './Components/RegistrationForm'

const Registration = () => {
  return (
    <>
    <div style={{backgroundColor: "var(--color-background)"}}>
    <RegistrationNav/>
    <RegistrationForm/>
    </div>
    </>
  )
}

export default Registration