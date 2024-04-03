import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";





export const UserPosts = () => {
  const {isLogged,token1,user}=useContext(AppContext)
const navigate=useNavigate();

const[userPosts,setUserPosts]=useState([])



//------------------------------------------------------------------
  // const check=()=>{
  //   navigate('/login');
  //   toast.error("Please login to view this page")
  // }



  
const likeHandler =async(id)=>{
  

  if(!user._id){
    toast.error("Please Login to like a post !!!");
    navigate('/login')
    return 
  }
  
  
  try {
    
    await axios.post('http://localhost:4000/api/v1/LikePost',{
      postId:id,
      token:token1
    });
    
    postCaller()
  } catch (error) {
    console.log(error)
    console.log('could not use like handler')
  }
  
  }
  






  const postCaller=async()=>{
await axios.post('http://localhost:4000/api/v1/getUserPosts',{
  token:token1
})
.then((res)=>{
console.log(res.data.allPosts)
  setUserPosts(res.data.allPosts)

})
.catch((err)=>{
  console.log(err);
  toast.error(err.response.data.message)
})
  }


  //--------------------------------------------------------------
  useEffect(()=>{
    postCaller()
    // console.log('hii')
  },[])

  return (
    <div className='flex flex-col gap-y-4 '>

{
  userPosts.map((data)=>{
    return (
      <div className='flex flex-col  border-black border-2'>
        
<p>{data.title}</p>

<div><img src={data.imageUrl} className='w-40' alt="" /></div>

<p>{data.description}</p>
<p>{data.quantity}</p>


<div >
    {
      
      data.likes.includes(user._id) ? ( <AiFillHeart  onClick={()=> likeHandler(data._id)} />):(<AiOutlineHeart
    onClick={()=> likeHandler(data._id)}
  />)
    }
  </div>

<p>{data.likes.length}</p>

<p>Created At  {new Date(data.createdAt).getHours()}:{new Date(data.createdAt).getMinutes()}</p>
<br />
<p>{new Date(data.createdAt).getDate()}-{new Date(data.createdAt).getMonth()}-{new Date(data.createdAt).getFullYear()}</p>
  

      </div>
    )
  })
}

    </div>
  )
}
