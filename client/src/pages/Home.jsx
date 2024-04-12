import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-hot-toast'





export const Home = () => {


  const {backendUrl,setUser,setToken1,setIsLogged}=useContext(AppContext)


  const refreshHandler=async()=>{
      
      
    await axios.post(backendUrl+'/isLogged',{
      
    },  {withCredentials: true,headers: {
      'Content-Type': 'multipart/form-data'
    }, credentials: 'include'})
    
    .then((res) => {
      
   
      setToken1(res.data.token);
      getUser()
      setIsLogged(true)
      
    })
  .catch((e)=> {
    // setIsLogged(false);
    // setToken1('');
    // setUser(null)
  })
}


const getUser=async()=>{
  await axios.post(backendUrl+'/getUser',{
    
  },  {withCredentials: true, headers: {
    'Content-Type': 'multipart/form-data'
  }, credentials: 'include'})
  .then((response)=>{
    setUser(response.data.userData)
   
    // console.log(response)
// setIsLogged(true)

})
.catch((error)=>{

  toast.error(error.response.data.message);
})
}


useEffect(()=>{
  refreshHandler()
},[])



  return (
    <div className='flex  bg-richblack-800  items-center h-[100vh] justify-center text-white'>Welome To Community Care's</div>
  )
}
