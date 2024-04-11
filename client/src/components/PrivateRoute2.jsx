import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import {toast } from 'react-hot-toast'
import { AppContext } from '../context/AppContext'


export const PrivateRoute2 = ({children}) => {
// const navigate=useNavigate()
const {isLogged,user}=useContext(AppContext)

  if(isLogged){
    console.log(isLogged)
    console.log(user)
  toast.error('User Already Logged In !!!')

  return    <Navigate to='/'/>
  }
  
  else{
      console.log(isLogged)
        return children
     

  }

} 

export default PrivateRoute2
