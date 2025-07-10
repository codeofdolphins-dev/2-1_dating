import React from 'react'
import SecondRegistrationNav from './Components/SecondRegistrationNav'
import SecondRegistrationForm from './Components/SecondRegistrationForm'


const SecondRegistrationPage = () => {
  return (
    <>
    <div>
        <div style={{backgroundColor: "#212529"}}>
        <SecondRegistrationNav/>
        <SecondRegistrationForm/>
        </div>
    </div>
    </>
  )
}

export default SecondRegistrationPage