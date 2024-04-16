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
  
  const {user,token1,setClick,Districts,setCurrentPostEdit,backendUrl}=useContext(AppContext)
  const navigate=useNavigate()
const [isLoading,setIsLoading]=useState(false)
const [isLoading2,setIsLoading2]=useState(false)


  //---------------------------vars------------------------------
  const [district,setDistrict]=useState('All');
const [recieverPosts,setRecieverPosts]=useState([])



  //-------------------------------------funcs------------------------------------


const districtHandler=(e)=>{
setDistrict(e.target.value);
}


const postCaller=async()=>{
  setIsLoading2(true)

  try {
    const response=await axios.get(backendUrl+'/getAllRecieverPosts',{},{withCredentials: true,headers: {
      'Content-Type': 'multipart/form-data'
    }, credentials: 'include'})
// console.log(response)
    if(response){
     
      setRecieverPosts(response.data.recieverPosts);
    // console.log(recieverPosts)
    }

  } catch (error) {
    console.log(error)
    console.log('error while loading recievers post !!!')
  }
setIsLoading2(false)
}




  const deleteHandler =async(id)=>{

    await axios.put(backendUrl+'/deletePost',{
      postId:id,
      token:token1
    },{withCredentials: true, headers: {
      'Content-Type': 'multipart/form-data'
    },credentials: 'include'})
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
    },{withCredentials: true,headers: {
      'Content-Type': 'multipart/form-data'
    }, credentials: 'include'});
    
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
  },{withCredentials: true,headers: {
    'Content-Type': 'multipart/form-data'
  }, credentials: 'include'});

  // console.log(response)
  console.log('Post connected successfully')
  navigate('/userConnectedPosts');
  setClick('Your Profile')
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
    <div className='flex flex-col items-center space-y-4 h-[100vh] overflow-y-scroll bg-richblack-800  pt-32 pb-10
    '>
<div className='font-bold text-2xl underline mb-4 text-white'>Reciever's Posts</div>

<div className='flex justify-center items-center flex-wrap gap-x-4'>
  
<label htmlFor="districts">
<p><b className='text-white'> Filter Posts By District</b></p>
</label>

<select name='districts' className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg w-[40%] ' id='districts' onChange={(e)=>{
  districtHandler(e)
}}>
  <option value='All'>All</option>
  {
    Districts.map((dist,index)=>{
      return <option key={index} value={dist}>{dist}</option>
    })
  }
</select>
  </div>

  <div className='h-[100vh] flex flex-row gap-y-10 w-[80%] gap-x-10 flex-wrap justify-center'>

    {

      isLoading2 ? (<Spinner/>):(
      recieverPosts=='' ? (<div className='text-white'>No Post's Available</div>):(

        
        recieverPosts.map((data,index)=>{
          return (
            district=='All' ? (<div key={index} className='flex flex-col border-2  max-h-[700px] max-w-[400px] min-w-[250px] min-h-[590px] w-[50%] h-[65%] p-4 justify-center items-center border-black  gap-y-4 bg-slate-100 rounded-lg overflow-hidden
            hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 transition-all linear 
            '>
          <h3 className='font-bold text-xl w-[14rem] overflow-scroll  justify-center flex items-center no-scrollbar'>{data.posts.title}</h3>
          <div className='flex justify-center items-center overflow-hidden w-[14rem] h-[19rem]' ><img src={data.posts.imageUrl} className='w-[100%] h-[100%] rounded-lg' alt="" /></div>

    <div className='overflow-scroll no-scrollbar w-[14rem] '>  <b>Description: </b>  <p className='w-[100%] flex itc justify-center'>{data.posts.description}</p></div>
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

<div className='flex flex-col gap-y-2 justify-center items-center'>

<div><pre><b>District : </b>{data.posts.district}</pre></div>
<pre><b>By:</b> {data.posts.userName}</pre>
{/* <div><p><b>By - </b>{data.name}</p></div> */}

</div>

        </div>) :
          
          //;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
          (data.posts.district==district &&<div className='flex flex-col border-2  max-h-[700px] max-w-[400px] min-w-[250px] min-h-[590px] w-[50%] h-[65%] p-4 justify-center items-center border-black  gap-y-4 bg-slate-100 rounded-lg overflow-hidden
          hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 transition-all linear 
          '>
          <h3 className='font-bold text-xl w-[14rem] overflow-scroll  justify-center flex items-center no-scrollbar'>{data.posts.title}</h3>
          <div className='flex justify-center items-center overflow-hidden w-[14rem] h-[19rem]' ><img src={data.posts.imageUrl} className='w-[100%] h-[100%] rounded-lg' alt="" /></div>

          <div className='overflow-scroll no-scrollbar w-[14rem] '>   <b>Description: </b> <p className='w-[100%] flex itc justify-center'>{data.posts.description}</p></div>
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

<div className='flex flex-col gap-y-2 justify-center items-center'>

<div><pre><b>District : </b>{data.posts.district}</pre></div>
<pre><b>By:</b> {data.posts.userName}</pre>
{/* <div><p><b>By - </b>{data.name}</p></div> */}

</div>
        </div>)
            
          )
        })
      )
    )
    }

   
    </div>
        </div>
  )
}
