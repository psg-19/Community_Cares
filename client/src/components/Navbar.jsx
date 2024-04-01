import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/Community.png'
import {NavLink} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios'


export const Navbar = () => {

    const{isLogged,setIsLogged,user,token1,setToken1,setUser}=useContext(AppContext)
   
    const getUserInfo=async()=>{
        try {
            const response = await axios.post('http://localhost:4000/api/v1/getUser', {
                token: token1
            });
           
            setUser(response.data.userData);
          
            // Once user data is set, update the image URL
            setImageUrl(response.data.userData.profileUrl);
        } catch (error) {
            // Handle errors here
            console.error('Error fetching user:', error);
        }
    }
const [imageUrl,setImageUrl]=useState('')
    useEffect(()=>{
       getUserInfo();
    // console.log(user)
    
       
    },[isLogged])

  return (
    <div className='flex justify-center items-center'>

<div className='flex  items-center justify-between w-[90%] h-24' >
        
        <div>
        <img src={logo} className='h-20' alt="" />
        </div>

        <nav className='flex items-center justify-center'>

            <ul className='flex gap-x-4 items-center justify-center'>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/donorPost'>Donor Posts</NavLink></li>
                <li><NavLink to='/recieverPost'>Reciever Posts</NavLink></li>
                
            </ul>

        </nav>
    
   <div className='flex justify-center items-center'>

{
   isLogged  ? (<ul className='flex gap-x-4 justify-center items-center'>

   <li><NavLink to='/' onClick={()=>{
    setIsLogged(false)
    setToken1('')
    setUser(null)
    console.log('logged out ')
   }
}>Log out</NavLink></li>
         
   <li><NavLink to='/profile'><img src={imageUrl} className='w-10 rounded-full' alt="jfn"></img></NavLink></li>
     </ul>):(<ul className='flex gap-x-4'>

   <li><NavLink to='/login'>Login</NavLink></li>
   <li><NavLink to='/signUp'>Sign Up</NavLink></li>
         
     </ul>)
}

   </div>
   

    </div>

    </div>
  )
}
