import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/Community.png'
import {NavLink,useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";




export const Navbar = () => {

    const{isLogged,backendUrl,setIsLogged,user,setToken1,setUser}=useContext(AppContext)

const [isLoading,setIsLoading]=useState(false);


//---------------------------------------------------------
const [hamburger,setHamburger]=useState(false);
//-----------------------------------------------------------
    const [click,setClick]=useState(null)
 const navigate=useNavigate()

    const logoutHandler=async()=>{
      if(isLoading){
        toast.error("Please Wait ,Logging out!!!");
        return
      }

      setIsLoading(true);

   try {
    
    await axios.post(backendUrl+'/logout',{},{withCredentials: true, headers: {
      'Content-Type': 'multipart/form-data'
    },credentials: 'include'})

    setIsLogged(false)
setToken1('')
setUser('')
console.log('logged out ')




   } catch (error) {
    toast.error("Cannot Logout !!!")
   }

   setIsLoading(false)

    }


   
    const [imageUrl,setImageUrl]=useState('')
    useEffect(()=>{
       
    setImageUrl(user.profileUrl);
    setClick('Home')
    // console.log('hiii')
    
       
    },[user])

  return (
    <div className={`flex flex-col items-center  backdrop-blur-sm backdrop-brightness-75 backdrop-contrast-75 fixed w-[100vw] z-10 ${hamburger ? ' h-[100vh] overflow-y-scroll  ':'  justify-center  '} `}>

<div className='flex  items-center justify-between w-[90%] h-24 ' >
        
        <div>
        <img src={logo} className=' rounded-full h-20' alt="" />
        </div>

        <nav className=' flex items-center justify-center sm:hidden lg:block md:block all:hidden'>

            <ul className=' flex gap-x-4 items-center justify-center'>
                <li className={`text-black cursor-pointer font-mullish py-7 hover:text-yellow-900
                transition-all duration-200 flex justify-center items-center  relative group
                invert
                ${click =="Home" ? ("text-yellow-900"):("")}
                
                `}
                onClick={(e)=> {
                  setClick(e.target.innerText);
                  navigate('/')
                }}
                >
                  <NavLink to='/' ><pre className=' font-extrabold'>  Home  </pre></NavLink>
                <div class={`h-1 absolute bottom-0 
                 ${click =="Home" ? ("bg-yellow-900 block"):("hidden")}
                w-full  bg-yellow-900 group-hover:block  `}></div>
                </li>


                <li className={`text-black flex justify-center items-center cursor-pointer font-mullish py-7 hover:text-yellow-900
                transition-all duration-200   relative group
                invert
                ${click =="Donor Posts" ? ("text-yellow-900"):("")}
                
                `}  onClick={(e)=> {
                  setClick(e.target.innerText);
                  navigate('/donorPost')
                }}><NavLink to='/donorPost' className='font-bold'>Donor Posts</NavLink>
                
                <div class={`h-1 absolute bottom-0 
                 ${click =="Donor Posts" ? ("bg-yellow-900"):("hidden")}
                w-full  bg-yellow-900 group-hover:block  `}></div></li>
                <li className={`text-black cursor-pointer font-mullish py-7 hover:text-yellow-900
                transition-all duration-200 flex justify-center items-center  relative group
                invert
                ${click =="Reciever Posts" ? ("text-yellow-900"):("")}
                
                `}  onClick={(e)=> {
                  setClick(e.target.innerText);
                  navigate('/recieverPost')
                }}><NavLink  className='font-bold' to='/recieverPost'>Reciever Posts </NavLink>
                   <div class={`h-1 absolute bottom-0  
                 ${click =="Reciever Posts" ? ("bg-yellow-900"):("hidden")}
                w-full  bg-yellow-900 group-hover:block  `}></div>
                </li>
                <li className={`text-black flex justify-center items-center cursor-pointer font-mullish py-7 hover:text-yellow-900
                transition-all duration-200   relative group
                invert
                ${click =="Connected Posts" ? ("text-yellow-900"):("")}
                
                `}  onClick={(e)=> {
                  setClick(e.target.innerText);
                  navigate('/connectedPosts')
                }}><NavLink  className='font-bold' to='/connectedPosts'>Connected Posts</NavLink>
                   <div class={`h-1 absolute bottom-0  
                 ${click =="Connected Posts" ? ("bg-yellow-900"):("hidden")}
                w-full  bg-yellow-900 group-hover:block  `}></div>
                </li>
                
            </ul>

        </nav>
    
   <div className=' sm:hidden lg:block md:block all:hidden flex justify-center items-center'>

{
   isLogged  ? (<ul className='flex gap-x-4 justify-center items-center'>

   <li className={`border-2 py-1 px-4 rounded-lg  flex items-center justify-center bg-white border-blue-600 font-bold hover:bg-green1-dark `}  onClick={()=>{
logoutHandler()
setClick(null)
}
}><NavLink to='/' className='font-bold flex justify-center items-center'>
  {isLoading ? 'Please Wait ...':'Log out'}</NavLink></li>
         
   <li className={` w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-indigo-600 ${click=='profile' ? (" "):(" animate-pulse ")} `} onClick={()=>{
    setClick('profile')
   }}><NavLink className='font-bold' to='/profile'><img src={imageUrl} className=' rounded-full p-[2px] w-[100%] h-[100%] ' alt="profile"></img></NavLink></li>


     </ul>
    

     ):
     (<ul className='flex items-center justify-center gap-x-4 w-auto gap-y-2 md:flex-wrap sm:flex-wrap'>

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
   
   <button className='sm:block   all:block lg:hidden md:hidden text-4xl'
   
   onClick={()=> {
    if(!hamburger){
      setHamburger(true);
    }
    
    else{
      setHamburger(false);

    }
   
   }}

   >{hamburger ? <RxCross1 />:<RxHamburgerMenu />}</button>


    </div>

    <div className={`lg:hidden md:hidden  ${hamburger ? ' sm:block all:block ':' sm:hidden all:hidden '} flex  `}>


  

<ul className=' flex gap-x-4 items-center flex-col gap-y-3 justify-center'>

{isLogged ==true && <li className={` w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-indigo-600 ${click=='profile' ? (" "):(" animate-pulse ")} `} onClick={()=>{
    setHamburger(false)
    setClick('profile')
   }}><NavLink className='font-bold' to='/profile'><img src={imageUrl} className=' rounded-full p-[2px] w-[100%] h-[100%] ' alt="profile"></img></NavLink></li>}

    <li className={`text-black cursor-pointer font-mullish py-7 hover:text-yellow-900
    transition-all duration-200 flex justify-center items-center  relative group invert
    
    ${click =="Home" ? ("text-yellow-900"):("")}
    
    `}
    onClick={(e)=> {
      setClick(e.target.innerText);
      setHamburger(false)
      navigate('/')
    }}
    >
      <NavLink to='/' ><pre className='  font-extrabold'>  Home  </pre></NavLink>
    <div class={`h-1 absolute bottom-0 
     ${click =="Home" ? ("bg-yellow-900 block"):("hidden")}
    w-full  bg-yellow-900 group-hover:block  `}></div>
    </li>


    <li className={`text-black flex justify-center items-center cursor-pointer font-mullish py-7 hover:text-yellow-900 invert
    transition-all duration-200   relative group
    
    ${click =="Donor Posts" ? ("text-yellow-900"):("")}
    
    `}  onClick={(e)=> {
      setClick(e.target.innerText);
      setHamburger(false)
      navigate('/donorPost')
    }}><NavLink to='/donorPost' className='font-bold'>Donor Posts</NavLink>
    
    <div class={`h-1 absolute bottom-0 
     ${click =="Donor Posts" ? ("bg-yellow-900"):("hidden")}
    w-full  bg-yellow-900 group-hover:block  `}></div></li>
    <li className={`text-black cursor-pointer font-mullish py-7 hover:text-yellow-900
    transition-all duration-200 flex justify-center items-center  relative group invert
    
    ${click =="Reciever Posts" ? ("text-yellow-900"):("")}
    
    `}  onClick={(e)=> {
      setClick(e.target.innerText);
      setHamburger(false)
      navigate('/recieverPost')
    }}><NavLink  className='font-bold' to='/recieverPost'>Reciever Posts </NavLink>
       <div class={`h-1 absolute bottom-0  
     ${click =="Reciever Posts" ? ("bg-yellow-900"):("hidden")}
    w-full  bg-yellow-900 group-hover:block  `}></div>
    </li>
    <li className={`text-black flex justify-center items-center cursor-pointer font-mullish py-7 hover:text-yellow-900 invert
    transition-all duration-200   relative group
    
    ${click =="Connected Posts" ? ("text-yellow-900"):("")}
    
    `}  onClick={(e)=> {
      setClick(e.target.innerText);
      setHamburger(false)
      navigate('/connectedPosts')
    }}><NavLink  className='font-bold' to='/connectedPosts'>Connected Posts</NavLink>
       <div class={`h-1 absolute bottom-0  
     ${click =="Connected Posts" ? ("bg-yellow-900"):("hidden")}
    w-full  bg-yellow-900 group-hover:block  `}></div>
    </li>

{isLogged==true &&  <li className={`text-black flex justify-center items-center cursor-pointer font-mullish py-7 hover:text-yellow-900 invert
    transition-all duration-200   relative group
    
    ${click ==`Create New ${user.role} Post` ? ("text-yellow-900"):("")}
    
    `}  onClick={(e)=> {
      setClick(e.target.innerText);
      setHamburger(false)
      navigate('/createPosts')
    }}><NavLink  className='font-bold' to='/createPosts'> Create New {user.role} Post</NavLink>
       <div class={`h-1 absolute bottom-0  
     ${click ==`Create New ${user.role} Post` ? ("bg-yellow-900"):("hidden")}
    w-full  bg-yellow-900 group-hover:block  `}></div>
    </li> }

    
</ul>

<div className='  flex justify-center items-center'>

{
   isLogged  ? (<ul className='flex gap-x-4 justify-center items-center'>

   <li className={`border-2 py-1 px-4 rounded-lg  flex items-center justify-center bg-white border-blue-600 font-bold hover:bg-green1-dark `}  onClick={()=>{
logoutHandler()
setClick(null)
setHamburger(false)
}
}><NavLink to='/' className='font-bold flex justify-center items-center'>
  {isLoading ? 'Please Wait ...':'Log out'}</NavLink></li>
         
 


     </ul>
    

     ):
     (<ul className='flex items-center justify-center gap-x-4 w-auto gap-y-2 md:flex-wrap sm:flex-wrap'>

   <li className={` py-1 px-4 rounded-lg  flex items-center justify-center font-bold hover:bg-slate-50 ${click=='Login' ? ' bg-white border-yellow-900 border-[3px] ':' border-blue-600 border-2 '} `}    onClick={(e)=> {
                  setClick(e.target.innerText);
                  setHamburger(false)
                  // console.log(e.target.innerText);
                  navigate('/login')
                }} ><NavLink to='/login'>Login</NavLink></li>
   <li onClick={(e)=> {
                  setClick(e.target.innerText);
                  setHamburger(false)
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
