import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import {toast} from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom';

import { LuFileEdit } from "react-icons/lu";



export const DonorPosts = () => {
  const {user,token1,Districts,setCurrentPostEdit,currentPostEdit}=useContext(AppContext);
 let ct=0;
const {donorPosts,setDonorPosts}=useContext(AppContext)
const navigate=useNavigate()

const [district,setDistrict]=useState('All');

const districtHandler=(e)=>{
setDistrict(e.target.value);
}

//----------------------------------functions-------------------------------------------------
  const postCaller=async()=>{
  try {
    const response =await axios.get('http://localhost:4000/api/v1/getAllDonorPosts');
    setDonorPosts(response.data.donorPosts);
  
    
    
  } catch (error) {
    console.log('cannot fetch donor posts !!!')
  
  }

  
    // console.log(e.target.value);
  }


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


  //--------------------------------------------------useeffect-------------------------------
  

useEffect(()=>{
   
    postCaller()
  },[])



  return (
    <div className='flex flex-col justify-center items-center space-y-4'>
{/* //----------------------------------------------- */}
<label htmlFor="districts">
  Select your District
</label>



<select name='districts' className='w-[40%]' id='districts' onChange={(e)=>{
  districtHandler(e)
}}>
  <option value='All'>All</option>
  {
    Districts.map((dist)=>{
      return <option value={dist}>{dist}</option>
    })
  }
</select>


{/* //------------------------------------------------- */}
{
donorPosts.length==0 ? (<div>No Posts Found</div>):(
  donorPosts.map((data)=>{
    return (
      
      district=='All' ? ( <div className='flex flex-col border-2 p-4 justify-center items-center border-black w-[70%] gap-y-4'>
          
      <h3 className='font-bold text-xl'>{data.posts.title}</h3>
      <div><img src={data.posts.imageUrl} className='w-96 rounded-lg' alt="" /></div>

    <p>{data.posts.description}</p>
    <p>Requirement : {data.posts.quantity} People</p>

   
  <div  className='flex flex-row gap-x-10 items-center justify-center'>
    <div className='flex gap-x-2'>
      
      <div className=' text-4xl'>{
      
      data.posts.likes.includes(user._id) ? ( <AiFillHeart  onClick={()=>likeHandler(data.posts._id)} />):(<AiOutlineHeart
        onClick={()=>likeHandler(data.posts._id)}
  />)
}  </div>

<p className='text-2xl'>{data.posts.likes.length}</p>
</div>

{
data.posts.email==user.email && <div>
<LuFileEdit className='text-xl' onClick={()=>{
  setCurrentPostEdit(data.posts);
  navigate('/editPost');
}}/>
</div>
  }
  </div>
    </div>):

    ( 
        data.posts.district==district && (
          
          <div className='flex flex-col border-2 p-4 justify-center items-center border-black w-[70%] gap-y-4'>
          
          <h3 className='font-bold text-xl'>{data.posts.title}</h3>
          <div><img src={data.posts.imageUrl} className='w-96 rounded-lg' alt="" /></div>
    
        <p>{data.posts.description}</p>
        <p>Requirement : {data.posts.quantity} People</p>
    

    
  <div  className='flex flex-row gap-x-10 items-center justify-center'>
    <div className='flex gap-x-2'>
      
      <div className=' text-4xl'>{
      
      data.posts.likes.includes(user._id) ? ( <AiFillHeart  onClick={()=>likeHandler(data.posts._id)} />):(<AiOutlineHeart
        onClick={()=>likeHandler(data.posts._id)}
  />)
}  </div>

<p className='text-2xl'>{data.posts.likes.length}</p>
</div>

{
data.posts.email==user.email && <div>
<LuFileEdit className='text-xl' onClick={()=>{
  setCurrentPostEdit(data.posts._id);
  navigate('/editPost');
}}/>
</div>
  }
  </div>
    </div>
        )
        
        // --------------------
        
        
  )


       
    )
  })
)
}
    </div>
  )
}
