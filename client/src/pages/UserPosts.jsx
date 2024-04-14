import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { LuFileEdit } from 'react-icons/lu'
import { RiDeleteBin6Line } from "react-icons/ri";
import { Spinner } from '../components/Spinner'




export const UserPosts = () => {
  const {backendUrl,token1,user,setCurrentPostEdit}=useContext(AppContext)
const navigate=useNavigate();

const[userPosts,setUserPosts]=useState(null)



//------------------------------------------------------------------
  // const check=()=>{
  //   navigate('/login');
  //   toast.error("Please login to view this page")
  // }


  const deleteHandler =async(id)=>{

    await axios.put(backendUrl+'/deletePost',{
      postId:id,
      token:token1
    },{withCredentials: true,headers: {
      'Content-Type': 'multipart/form-data'
    }, credentials: 'include'})
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
    },{withCredentials: true, headers: {
      'Content-Type': 'multipart/form-data'
    },credentials: 'include'});
    
    postCaller()
  } catch (error) {
    console.log(error)
    console.log('could not use like handler')
  }
  
  }
  






  const postCaller=async()=>{
await axios.post(backendUrl+'/getUserPosts',{
  token:token1
},{withCredentials: true,headers: {
  'Content-Type': 'multipart/form-data'
}, credentials: 'include'})
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
    <div className='flex flex-col items-center gap-y-6 h-[100vh] overflow-y-scroll bg-richblack-800  pt-28
    '>
<div className='text-white font-bold text-2xl underline'>Your Posts </div>

<div className='h-[100vh] flex flex-row gap-y-10 w-[80%] gap-x-10 flex-wrap justify-center'>


{

userPosts ==null ? (<Spinner/>):
(
userPosts.length==0 ?(<div className='flex justify-center items-center'>No posts available</div>)
:
  (userPosts.map((data,index)=>{
    return (
      <div key={index} className='flex flex-col border-2  max-h-[700px] max-w-[400px] min-w-[250px] min-h-[550px] w-[50%] h-[65%] p-4 justify-center items-center border-black  gap-y-4 bg-slate-100 rounded-lg overflow-hidden
      hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 transition-all linear 
      '>
        
<h3 className='font-bold text-xl'>{data.title}</h3>

<div className='flex justify-center items-center w-[14rem] h-[19rem]' ><img src={data.imageUrl} className='w-[100%] h-[100%] rounded-lg' alt="" /></div>


<p className='w-[100%] flex items-center justify-center'>{data.description}</p>
<p >Requirement : {data.quantity} People</p>

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

)
)
}
</div>
    </div>
  )
}
