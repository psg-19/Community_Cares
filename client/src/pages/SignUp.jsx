import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AppContext } from '../context/AppContext'


export const SignUp = () => {
  const navigate=useNavigate()
const {isLogged}=useContext(AppContext)


const check=()=>{
  navigate('/')
  toast.error("You are already loggedin !!!")
 
}
  return (
    <div>

{
  isLogged ? (check()):(<div>weefcc</div>)
}
</div>
    
  )
}
