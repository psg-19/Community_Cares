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
     
      console.log('could not use like handler')
    }
    
    }
    


    //-----------------------------------------------------

    useEffect(()=>{
postCaller()

    },[])

  return (
    <div className='flex flex-col gap-y-6 bg-green1-light  items-center justify-center sm:pt-[57rem] 
    lg:pt-[20rem] overflow-y-scroll
    '>


<h1 className='text-xl font-bold underline'>Connected Posts</h1>

{
    connectedPosts.length==0 ? (<div className='flex flex-row gap-x-6 '>

<Spinner/>

    </div>):
    
    //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

    (connectedPosts.map((data)=>{
        return <div className='flex flex-col items-center justify-center border-2 border-black   gap-y-4 rounded-lg
        
       
        bg-slate-200 
        hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 transition-all linear 

    
p-6
     sm:
        
        ' >
          <div className='flex flex-row gap-x-6  gap-y-6 justify-center items-center
          flex-wrap sm:max-h-[700px] sm:h-[100rem]'>
            {/* //======================donor posts----------- */}
           <div className='flex flex-col  items-center justify-center  bg-slate-100
border-[1px] border-black
rounded-lg gap-y-6
sm:w-[90%] sm:h-[50%]


'>

<h1 className='font-bold'>Donor</h1>
          

<div>
<div className='font-bold'>{data.donorPost.title}</div>
  <img src={data.donorPost.imageUrl} alt="" className=' w-48' />
  </div>


<p>{data.donorPost.description}</p>
<p><b>Requirement : </b>{data.donorPost.quantity} People</p>


           </div>

{/* =====================================Recievr posts================ */}


<div className='flex flex-col border-2 items-center justify-center  bg-slate-100
border-[1px] border-black
rounded-lg 
gap-y-6

sm:w-[90%] sm:h-[50%]

'>

<h1 className='font-bold'>Reciever</h1>


<div className='flex items-center justify-center flex-col'>
  <div className='font-bold'>{data.recieverPost.title}</div>

  <img src={data.recieverPost.imageUrl} alt="" className=' w-48' />
  </div>


<p>{data.recieverPost.description}</p>
<p><b>Requirement : </b>{data.donorPost.quantity} People</p>




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
