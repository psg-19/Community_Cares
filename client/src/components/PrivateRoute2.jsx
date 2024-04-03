import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import {toast } from 'react-hot-toast'
import { AppContext } from '../context/AppContext'


export const PrivateRoute2 = ({children}) => {
// const navigate=useNavigate()
const {isLogged,user}=useContext(AppContext)

  if(!isLogged){
    console.log(isLogged)
      return children
    }
    
    else{
      console.log(isLogged)
        console.log(user)
      toast.error('Please Login First !!!')
    
      return    <Navigate to='/Login'/>

  }

} 

export default PrivateRoute2
