import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
export const ConnectedPosts = () => {
    
    //--------------------------------------------vars--------------------------

    const [connectedPosts,setConnectedPosts]=useState([]);

    const {user,token1,backendUrl}=useContext(AppContext)

const navigate=useNavigate()


    //funcs--------------------------------------------------
const postCaller=async()=>{
    try {
        const response=await axios.get(backendUrl+'/getAllConnectedPosts')

       setConnectedPosts(response.data.connectedPosts)
    } catch (error) {
        toast.error("Something went wrong while fetching Posts")
    }
}



const likeHandler =async(id)=>{
  


    if(!user._id){
      toast.error("Please Login to like a post !!!");
      navigate('/login')
      return 
    }
    
    
    try {
      
      await axios.post(backendUrl+'/likeConnectedPost',{
        postId:id,
        token:token1
      });
      
      postCaller()
    } catch (error) {
      console.log(error)
      console.log('could not use like handler')
    }
    
    }
    


    //-----------------------------------------------------

    useEffect(()=>{
postCaller()
console.log(connectedPosts)
    },[])

  return (
    <div className='flex flex-col gap-y-6 items-center justify-center'>


{
    connectedPosts.length==0 ? (<div className='flex flex-row gap-x-6'>

<Spinner/>

    </div>):
    
    //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

    (connectedPosts.map((data)=>{
        return <div className='flex flex-col items-center justify-center border-2 border-black p-2 gap-y-4' >
          <div className='flex flex-row gap-x-6 '>
            {/* //======================donor posts----------- */}
           <div className='flex flex-col border-2 items-center justify-center w-[50%]'>

<h1 className='font-bold'>Donor</h1>
           <div>{data.donorPost.title}</div>

<div><img src={data.donorPost.imageUrl} alt="" className=' w-48' /></div>


<p>{data.donorPost.description}</p>
<p>{data.donorPost.quantity}</p>


           </div>

{/* =====================================Recievr posts================ */}


<div className='flex flex-col border-2 items-center justify-center w-[50%]'>

<h1 className='font-bold'>Reciever</h1>
<div>{data.recieverPost.title}</div>

<div><img src={data.recieverPost.imageUrl} alt="" className=' w-48' /></div>


<p>{data.recieverPost.description}</p>
<p>{data.recieverPost.quantity}</p>




</div>
</div>

<div className='text-4xl' >
      {
        
        data.likes.includes(user._id) ? ( <AiFillHeart  onClick={()=>likeHandler(data._id)} />):(<AiOutlineHeart
          onClick={()=>likeHandler(data._id)}
    />)
      }
    </div>
      <p>{data.likes.length}</p>

        </div>
}))
}


    </div>
  )
}
