import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export const RecieverPosts = () => {
  
  const {user,token1,Districts}=useContext(AppContext)
  const navigate=useNavigate()



  //---------------------------vars------------------------------
  const [district,setDistrict]=useState('All');
const [recieverPosts,setRecieverPosts]=useState([])



  //-------------------------------------funcs------------------------------------


const districtHandler=(e)=>{
setDistrict(e.target.value);
}


const postCaller=async()=>{

  try {
    const response=await axios.get('http://localhost:4000/api/v1/getAllRecieverPosts')
// console.log(response)
    if(response){
      setRecieverPosts(response.data.recieverPosts);
    // console.log(recieverPosts)
    }

  } catch (error) {
    console.log('error while loading recievers post !!!')
  }

}




const likeHandler=async(id)=>{


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



const connectHandler=async(id)=>{

try {
  
  const response=await axios.post('http://localhost:4000/api/v1/connectedPosts',{
    reciverPostId:id,
    token:token1
  });
postCaller()
  console.log(response)
  console.log('Post connected successfully')
  postCaller()

} catch (error) {
  toast.error(error.response.data.message )
 
  console.log('cannot connect posts !!!')
}

}

  //------------------------------------------------------------

useEffect(()=>{
  postCaller()
},[])



  return (
    <div className='flex flex-col justify-center items-center space-y-4'>

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

    {
    recieverPosts=='' ? (<div>No Posts Found  </div>):(
      recieverPosts.map((data)=>{
        return (
          district=='All' ? (<div className='flex flex-col p-2 border-black justify-center items-center w-[70%] border-2 gap-y-4'>
          <h3 className='font-bold text-xl'>{data.posts.title}</h3>
          <div><img src={data.posts.imageUrl} className='w-96' alt="" /></div>

        <p>{data.posts.description}</p>
        <p>Requirement : {data.posts.quantity} People</p>

        <div className='text-4xl '>
          {
            
            data.posts.likes.includes(user._id) ? ( <AiFillHeart  onClick={()=> likeHandler(data.posts._id)} />):(<AiOutlineHeart
          onClick={()=> likeHandler(data.posts._id)}
        />)
          }
        </div>
      <p >{data.posts.likes.length}</p>

      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-[12%]" onClick={()=>connectHandler(data._id)}>
Donate
</button>
        </div>) :
          
          //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
          (data.posts.district==district &&<div className='flex flex-col border-2 gap-y-4'>
          <h3>{data.posts.title}</h3>
          <div><img src={data.posts.imageUrl} className='w-96' alt="" /></div>

        <p>{data.posts.description}</p>
        <p>{data.posts.quantity}</p>

        <div onClick={()=>likeHandler(data.posts._id)}>
          {
            
            data.posts.likes.includes(user._id) ? ( <AiFillHeart  onClick={()=> likeHandler()} />):(<AiOutlineHeart
          onClick={()=> likeHandler()}
        />)
          }
        </div>
      <p>{data.posts.likes.length}</p>

      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-[12%]" onClick={()=>connectHandler(data._id)}>
Donate
</button>
        </div>)
            
        )
      })
    )
    }

   
        </div>
  )
}
