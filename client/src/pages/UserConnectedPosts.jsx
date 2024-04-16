import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';





export const UserConnectedPosts = () => {
    
    //--------------------------------------------vars--------------------------

    const [userConnectedPosts,setUserConnectedPosts]=useState([]);

    const {user,token1,backendUrl}=useContext(AppContext)

const navigate=useNavigate()


    //funcs--------------------------------------------------
const postCaller=async()=>{
    try {
        const response=await axios.post(backendUrl+'/getConnectedPostsUser',{
          token:token1
        },{withCredentials: true,headers: {
          'Content-Type': 'multipart/form-data'
        }, credentials: 'include'})

       setUserConnectedPosts(response.data.postDetails)
      //  console.log(response.data.postDetails)
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
      },{withCredentials: true,headers: {
        'Content-Type': 'multipart/form-data'
      }, credentials: 'include'});
      
      postCaller()
    } catch (error) {
      console.log(error)
      console.log('could not use like handler')
    }
    
    }
    


    //-----------------------------------------------------

    useEffect(()=>{
postCaller()
// console.log(userConnectedPosts)
    },[])

  return (
    <div className='flex flex-col gap-y-6 bg-richblack-800   items-center justify-center sm:pt-[2rem] 
    lg:pt-[2rem] overflow-y-scroll no-scrollbar
pb-[5rem]
all:px-10
    '>
<div className='h-20'></div>
<h1 className='text-xl font-bold underline text-white'>Posts Connected To You</h1>

{
    userConnectedPosts.length ==0 ? (<div className='flex text-white flex-row gap-x-6'>

No posts available

    </div>):
    
    //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    (userConnectedPosts.map((data,index)=>{
        return <div key={index} className='flex flex-col items-center justify-center border-2 border-black   gap-y-10 rounded-lg
        
       
        bg-slate-200 
        hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 transition-all linear 

    
p-6

lg:min-w-[900px] lg:max-h-[500px] lg:w-[50%] lg:h-[30%]



     
        
        ' >

            <div className='flex flex-row gap-x-6  gap-y-6 justify-center items-center
          flex-wrap 
          sm:max-h-[700px] sm:h-[100rem]
          
          
          
          lg:w-[100%]  lg:h-[40rem]
          
          
          '>
            {/* //======================donor posts----------- */}


           <div className='flex flex-col  items-center justify-center  bg-slate-100
border-[1px] border-black
rounded-lg gap-y-6
sm:w-[90%] sm:h-[50%] 
all:w-[90%] all:h-[50%] 
lg:w-[48%] lg:h-[23rem]
md:w-[90%] md:h-[50%] 


'>

<h1 className='font-bold'>Donor</h1>
          

<div className='flex items-center justify-center flex-col'>
<div className='font-bold overflow-scroll no-scrollbar  justify-center flex items-center w-48'>{data.donorPost.title}</div>
  <div className='w-48 overflow-hidden'><img  src={data.donorPost.imageUrl} alt="" className=' rounded-lg ' /></div>
  </div>


<div className='overflow-scroll no-scrollbar w-48'><b>Description: </b><p >{data.donorPost.description}</p></div>
<p><b>Requirement : </b>{data.donorPost.quantity} People</p>


           </div>

{/* =====================================Recievr posts================ */}


<div className='flex flex-col  items-center justify-center  bg-slate-100
border-[1px] border-black
rounded-lg gap-y-6
sm:w-[90%] sm:h-[50%] 
all:w-[90%] all:h-[50%] 
lg:w-[48%] lg:h-[23rem]
md:w-[90%] md:h-[50%] 


'>

<h1 className='font-bold'>Reciever</h1>

<div className='flex items-center justify-center flex-col'>
  <div className='font-bold overflow-scroll no-scrollbar  justify-center flex items-center w-48'>{data.recieverPost.title}</div>

  <div className=' w-48 overflow-hidden' ><img src={data.recieverPost.imageUrl} alt="" className='rounded-lg' /></div>
  </div>


<div className=' overflow-scroll no-scrollbar'><b>Description: </b><p className=' w-48'>{data.recieverPost.description}</p></div>
<p><b>Requirement : </b>{data.donorPost.quantity} People</p>




</div>
</div>

<div className='flex gap-x-2 justify-center items-center'>
  <div className='text-4xl'>

      {
        
        data.likes.includes(user._id) ? ( <AiFillHeart  onClick={()=>likeHandler(data._id)} />):(<AiOutlineHeart 
          onClick={()=>likeHandler(data._id)}
          />)
        }
        </div>
      <p className='text-2xl flex justify-center items-center'>{data.likes.length}</p>
    </div>

        </div>
}))
}


    </div>
  )
}
