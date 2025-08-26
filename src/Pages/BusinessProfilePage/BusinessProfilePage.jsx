import React from 'react'
import BusinessProfileNav from './BusinessProfileComponents/BusinessProfileNav'
import BusinessProfileForm from './BusinessProfileComponents/BusinessProfileForm'
import BusinessProfileFooter from './BusinessProfileComponents/BusinessProfileFooter'
import { ToastContainer } from 'react-toastify'

const BusinessProfilePage = () => {
  return (
    <>
    
       
    <div style={{backgroundColor: "var(--color-background)"}}>
    <BusinessProfileNav/>
    <BusinessProfileForm/>
    <BusinessProfileFooter/>
    </div>
    
    </>
  )
}

export default BusinessProfilePage