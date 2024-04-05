import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/Community.png'
import {NavLink} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { RxHamburgerMenu } from "react-icons/rx";


export const Navbar = () => {

    const{isLogged,setIsLogged,user,token1,setToken1,setUser}=useContext(AppContext)


    const logoutHandler=()=>{
   try {
         
    setIsLogged(false)
setToken1('')
setUser('')
console.log('logged out ')
console.log(isLogged)
console.log(user);
console.log(token1)
   } catch (error) {
    toast.error("Cannot Logout !!!")
   }
    }


   
    const [imageUrl,setImageUrl]=useState('')
    useEffect(()=>{
       
    setImageUrl(user.profileUrl)
    // console.log('hiii')
    
       
    },[user])

  return (
    <div className='flex  justify-center items-center'>

<div className='flex  items-center justify-between w-[90%] h-24' >
        
        <div>
        <img src={logo} className='h-20' alt="" />
        </div>

        <nav className='flex items-center justify-center'>

            <ul className='flex gap-x-4 items-center justify-center'>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/donorPost'>Donor Posts</NavLink></li>
                <li><NavLink to='/recieverPost'>Reciever Posts</NavLink></li>
                <li><NavLink to='/connectedPosts'>Connected Posts</NavLink></li>
                
            </ul>

        </nav>
    
   <div className='flex justify-center items-center'>

{
   isLogged  ? (<ul className='flex gap-x-4 justify-center items-center'>

   <li onClick={()=>{
logoutHandler()
}
}><NavLink to='/' >Log out</NavLink></li>
         
   <li><NavLink to='/profile'><img src={imageUrl} className='w-10 rounded-full' alt="profile"></img></NavLink></li>


     </ul>
    

     ):
     (<ul className='flex gap-x-4'>

   <li><NavLink to='/login'>Login</NavLink></li>
   <li><NavLink to='/signUp'>Sign Up</NavLink></li>
         
     </ul>)
}

   </div>
   

    </div>

    </div>
  )
}
