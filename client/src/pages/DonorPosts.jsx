import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import {toast} from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { LuFileEdit } from "react-icons/lu";



export const DonorPosts = () => {
  const {user,token1,Districts,backendUrl,setCurrentPostEdit}=useContext(AppContext);
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
    const response =await axios.get(backendUrl+'/getAllDonorPosts');
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


  //--------------------------------------------------useeffect-------------------------------
  

useEffect(()=>{
   
    postCaller()
  },[])



  return (
    <div className='flex flex-col items-center space-y-4 h-[88vh] overflow-y-scroll bg-green1-light py-10
    '>
{/* //----------------------------------------------- */}
<div className='flex gap-x-4'>

<label htmlFor="districts">
  <p><b>Select your District</b></p>
</label>



<select name='districts' className='w-[40%] border-2 border-black' id='districts' onChange={(e)=>{
  districtHandler(e)
}}>
  <option value='All'>All</option>
  {
    Districts.map((dist)=>{
      return <option value={dist}>{dist}</option>
    })
  }
</select>
  </div>


{/* //------------------------------------------------- */}
<div className='h-[100vh] flex flex-row gap-y-10 w-[80%] gap-x-10 flex-wrap justify-center'>


{
donorPosts.length==0 ? (<Spinner/>):(
  donorPosts.map((data)=>{
    return (
      
      district=='All' ? ( <div className='flex flex-col border-2  max-h-[700px] max-w-[400px] w-[50%]  p-4 justify-center items-center border-black  gap-y-4'>
          
      <h3 className='font-bold text-xl'>{data.posts.title}</h3>
      <div className='flex justify-center items-center w-[80%] h-[100%]' ><img src={data.posts.imageUrl} className='w-[100%] h-[100%] rounded-lg' alt="" /></div>

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

  
<div className='flex justify-evenly'>

<div><pre><b>District : </b>{data.posts.district}</pre></div>
{/* <div><p><b>By - </b>{data.name}</p></div> */}

</div>
    </div>):

( 
  data.posts.district==district && (
    
    <div className='flex flex-col border-2 p-4 justify-center items-center border-black w-[70%] max-h-[70%] gap-y-4'>
          
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
  
<div className='flex justify-evenly'>

<div><pre><b>District : </b>{data.posts.district}</pre></div>
{/* <div><p><b>By - </b>{data.name}</p></div> */}

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
    </div>
  )
}
