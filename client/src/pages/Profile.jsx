import React, {  useContext, useState } from 'react'
import { UpdateProfile } from '../components/UpdateProfile'
import { ViewProfile } from '../components/ViewProfile'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { AppContext } from '../context/AppContext'

export const Profile = () => {


    // console.log(user)
  const navigate=useNavigate();
    const [change,setChange]=useState(0);
    const {isLogged}=useContext(AppContext)

  return (


    <div>
{isLogged ? (
change%2 ==0 ?
(<ViewProfile setChange={setChange}/>):(<UpdateProfile setChange={setChange}/>)

):(<div>
  {
   isLogged && toast.error("Protected route !!!")
    &&navigate('/login')
  }kbjhbbhbjj
  </div>
)}
    </div>
  )
}
