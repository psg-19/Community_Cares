import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { LuFileEdit } from 'react-icons/lu'
import { RiDeleteBin6Line } from "react-icons/ri";




export const UserPosts = () => {
  const {backendUrl,token1,user,setCurrentPostEdit}=useContext(AppContext)
const navigate=useNavigate();

const[userPosts,setUserPosts]=useState([])



//------------------------------------------------------------------
  // const check=()=>{
  //   navigate('/login');
  //   toast.error("Please login to view this page")
  // }


  const deleteHandler =async(id)=>{

    await axios.put(backendUrl+'/deletePost',{
      postId:id,
      token:token1
    })
    .then((res)=> toast.success(res.data.message))
    .catch((e)=> toast.error(e.response.data.message))
    postCaller();

  }
    
  


  
const likeHandler =async(id)=>{
  

  if(!user._id){
    toast.error("Please Login to like a post !!!");
    navigate('/login')
    return 
  }
  
  
  try {
    
    await axios.post(backendUrl+'/LikePost',{
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
await axios.post(backendUrl+'/getUserPosts',{
  token:token1
})
.then((res)=>{
// console.log(res.data.allPosts)
  setUserPosts(res.data.allPosts)

})
.catch((err)=>{
  // console.log(err);
  toast.error(err.response.data.message)
})
  }


  //--------------------------------------------------------------
  useEffect(()=>{
    postCaller()
    // console.log('hii')
  },[])

  return (
    <div className='flex flex-col gap-y-4 items-center justify-center'>

{
  userPosts.map((data)=>{
    return (
      <div className='flex flex-col  border-black border-2 w-[50%] p-2 items-center justify-center gap-y-4'>
        
<p className='text-bold'>{data.title}</p>

<img src={data.imageUrl} className='w-[100%] rounded-lg' alt="" />

<p>{data.description}</p>
<p>{data.quantity}</p>

<div  className='flex flex-row gap-x-10 items-center justify-center'>
    <div className='flex gap-x-2'>
      
      <div className=' text-4xl'>{
      
      data.likes.includes(user._id) ? ( <AiFillHeart  onClick={()=>likeHandler(data._id)} />):(<AiOutlineHeart
        onClick={()=>likeHandler(data._id)}
  />)
}  </div>

<p className='text-2xl'>{data.likes.length}</p>
</div>

{
data.email==user.email &&data.status==false && <div className='flex gap-2'>
<LuFileEdit className='text-xl' onClick={()=>{
  setCurrentPostEdit(data);
  navigate('/editPost');
}}/>
<RiDeleteBin6Line className='text-xl' onClick={()=> deleteHandler(data._id)} />
</div>
  }
  </div>

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
