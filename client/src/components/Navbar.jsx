import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/Community.png'
import {NavLink,useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import {toast} from 'react-hot-toast'



export const Navbar = () => {

    const{isLogged,setIsLogged,user,token1,setToken1,setUser}=useContext(AppContext)



    const [click,setClick]=useState(null)
 const navigate=useNavigate()

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
       
    setImageUrl(user.profileUrl);
    setClick('Home')
    // console.log('hiii')
    
       
    },[user])

  return (
    <div className='flex  justify-center items-center backdrop-blur-sm backdrop-brightness-75 backdrop-contrast-75 fixed w-[100%] z-10'>

<div className='flex  items-center justify-between w-[90%] h-24 ' >
        
        <div>
        <img src={logo} className='h-20' alt="" />
        </div>

        <nav className='flex items-center justify-center'>

            <ul className='flex gap-x-4 items-center justify-center'>
                <li className={`text-black cursor-pointer font-mullish py-7 hover:text-yellow-900
                transition-all duration-200   relative group
                
                ${click =="Home" ? ("text-yellow-900"):("")}
                
                `}
                onClick={(e)=> {
                  setClick(e.target.innerText);
                  navigate('/')
                }}
                >
                  <NavLink to='/'>Home</NavLink>
                <div class={`h-1 absolute bottom-0 
                 ${click =="Home" ? ("bg-yellow-900 block"):("hidden")}
                w-full  bg-yellow-900 group-hover:block  `}></div>
                </li>


                <li className={`text-black cursor-pointer font-mullish py-7 hover:text-yellow-900
                transition-all duration-200   relative group
                
                ${click =="Donor Posts" ? ("text-yellow-900"):("")}
                
                `}  onClick={(e)=> {
                  setClick(e.target.innerText);
                  navigate('/donorPost')
                }}><NavLink to='/donorPost'>Donor Posts</NavLink>
                
                <div class={`h-1 absolute bottom-0 
                 ${click =="Donor Posts" ? ("bg-yellow-900"):("hidden")}
                w-full  bg-yellow-900 group-hover:block  `}></div></li>
                <li className={`text-black cursor-pointer font-mullish py-7 hover:text-yellow-900
                transition-all duration-200   relative group
                
                ${click =="Reciever Posts" ? ("text-yellow-900"):("")}
                
                `}  onClick={(e)=> {
                  setClick(e.target.innerText);
                  navigate('/recieverPost')
                }}><NavLink to='/recieverPost'>Reciever Posts </NavLink>
                   <div class={`h-1 absolute bottom-0  
                 ${click =="Reciever Posts" ? ("bg-yellow-900"):("hidden")}
                w-full  bg-yellow-900 group-hover:block  `}></div>
                </li>
                <li className={`text-black cursor-pointer font-mullish py-7 hover:text-yellow-900
                transition-all duration-200   relative group
                
                ${click =="Connected Posts" ? ("text-yellow-900"):("")}
                
                `}  onClick={(e)=> {
                  setClick(e.target.innerText);
                  navigate('/connectedPosts')
                }}><NavLink to='/connectedPosts'>Connected Posts</NavLink>
                   <div class={`h-1 absolute bottom-0  
                 ${click =="Connected Posts" ? ("bg-yellow-900"):("hidden")}
                w-full  bg-yellow-900 group-hover:block  `}></div>
                </li>
                
            </ul>

        </nav>
    
   <div className='flex justify-center items-center'>

{
   isLogged  ? (<ul className='flex gap-x-4 justify-center items-center'>

   <li className={`border-2 py-1 px-4 rounded-lg  flex items-center justify-center bg-white border-blue-600 font-bold hover:bg-green1-dark `}  onClick={()=>{
logoutHandler()
setClick(null)
}
}><NavLink to='/' >Log out</NavLink></li>
         
   <li className={` w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-indigo-600 ${click=='profile' ? (" "):(" animate-pulse ")} `} onClick={()=>{
    setClick('profile')
   }}><NavLink to='/profile'><img src={imageUrl} className=' rounded-full p-[2px] w-[100%] h-[100%] ' alt="profile"></img></NavLink></li>


     </ul>
    

     ):
     (<ul className='flex gap-x-4'>

   <li className={` py-1 px-4 rounded-lg  flex items-center justify-center font-bold hover:bg-slate-50 ${click=='Login' ? ' bg-white border-yellow-900 border-[3px] ':' border-blue-600 border-2 '} `}    onClick={(e)=> {
                  setClick(e.target.innerText);
                  // console.log(e.target.innerText);
                  navigate('/login')
                }} ><NavLink to='/login'>Login</NavLink></li>
   <li onClick={(e)=> {
                  setClick(e.target.innerText);
                  // console.log(e.target.innerText);
                  navigate('/signUp')
                }}  className={` py-1 px-4 rounded-lg  flex items-center  hover:bg-slate-200 justify-center font-bold ${click=='Sign Up' ? ' bg-slate-200 border-yellow-900 border-[3px] ':' bg-white border-2  border-blue-600'}`}><NavLink to='/signUp'>Sign Up</NavLink></li>
         
     </ul>)
}

   </div>
   

    </div>

    </div>
  )
}
