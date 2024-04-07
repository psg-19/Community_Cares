import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Spinner } from '../components/Spinner';




export const RecieverPosts = () => {
  
  const {user,token1,Districts,setCurrentPostEdit,backendUrl}=useContext(AppContext)
  const navigate=useNavigate()
const [isLoading,setIsLoading]=useState(false)


  //---------------------------vars------------------------------
  const [district,setDistrict]=useState('All');
const [recieverPosts,setRecieverPosts]=useState([])



  //-------------------------------------funcs------------------------------------


const districtHandler=(e)=>{
setDistrict(e.target.value);
}


const postCaller=async()=>{

  try {
    const response=await axios.get(backendUrl+'/getAllRecieverPosts')
// console.log(response)
    if(response){
      console.log('hiiiii',response)
      setRecieverPosts(response.data.recieverPosts);
    // console.log(recieverPosts)
    }

  } catch (error) {
    console.log(error)
    console.log('error while loading recievers post !!!')
  }

}




  const deleteHandler =async(id)=>{

    await axios.put(backendUrl+'/deletePost',{
      postId:id,
      token:token1
    })
    .then((res)=> toast.success(res.data.message))
    .catch((e)=> toast.error(e.response.data.message))
    postCaller();

  }
    


const likeHandler=async(id)=>{


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



const connectHandler=async(e,id)=>{
e.preventDefault();

if(isLoading){

  toast.error('Please Wait ,Connecting Your Post ...');
  return;

}

setIsLoading(true);


try {
  
  const response=await axios.post(backendUrl+'/connectedPosts',{
    reciverPostId:id,
    token:token1
  });
postCaller()
  // console.log(response)
  console.log('Post connected successfully')
  postCaller()

} catch (error) {
  toast.error(error.response.data.message )
 
  console.log('cannot connect posts !!!')
}



setIsLoading(false)

}

  //------------------------------------------------------------

useEffect(()=>{
  postCaller()
},[])



  return (
    <div className='flex flex-col justify-center items-center space-y-4'>

<div>
  
<label htmlFor="districts">
  Select your District
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

<div className='flex justify-center h-[100vh]  '>

    {
      recieverPosts=='' ? (<Spinner/>):(
        recieverPosts.map((data)=>{
          return (
            district=='All' ? (<div className='flex flex-col max-h-[60%] max-w-[80%]  p-2 border-black justify-center items-center w-[70%] border-2 gap-y-4'>
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
<RiDeleteBin6Line className='text-xl' onClick={()=> deleteHandler(data._id)} />

</div>
  }
  </div>
    

    { user.role=='Donor'&& <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-[90px]" onClick={(e)=>connectHandler(e,data._id)}>
    {isLoading ? 'Please Wait ...':'Donate'}
</button>}

<div className='flex justify-evenly'>

<div><pre><b>District : </b>{data.posts.district}</pre></div>
{/* <div><p><b>By - </b>{data.name}</p></div> */}

</div>

        </div>) :
          
          //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
          (data.posts.district==district &&<div className='flex flex-col border-2 gap-y-4 max-w-[50%]'>
          <h3>{data.posts.title}</h3>
          <div><img src={data.posts.imageUrl} className='w-96 rounded-lg' alt="" /></div>

        <p>{data.posts.description}</p>
        <p>{data.posts.quantity}</p>

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
<RiDeleteBin6Line className='text-xl' onClick={()=> deleteHandler(data._id)} />

</div>
  }
  </div>
{
  user.role=='Donor' &&  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-[90px]" onClick={(e)=>connectHandler(e,data._id)}>
{isLoading ? 'Please Wait ...':'Donate'}
</button>}

<div className='flex justify-evenly'>

<div><pre><b>District : </b>{data.posts.district}</pre></div>
{/* <div><p><b>By - </b>{data.name}</p></div> */}

</div>
        </div>)
            
          )
        })
      )
    }

   
    </div>
        </div>
  )
}
