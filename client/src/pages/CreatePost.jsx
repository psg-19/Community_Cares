import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


export const CreatePost = () => {

const [isLoading,setIsLoading]=useState(false)
const {user,Districts,token1}=useContext(AppContext)
const navigate=useNavigate()
const [formData,setFormData]=useState({
  title:'',
  description:'',
  district:user.district,
  address:'',
  quantity:'',
  image:null
})

// const [isLoading,setIsLoading]=useState(false)


  
//---------------------funv---------------------------------

const changeHandler=(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value

      
    
    }))  
    // console.log(formData)
  }  

  const imageHandler=(e)=>{
    setFormData((prev)=>({
      ...prev,
      image:e.target.files[0]

      
    
    })) 
    // console.log(e.target.files[0])
  }
  

const submitHandler=async(e)=>{

  e.preventDefault();

  if((isNaN(parseInt(formData.quantity)))){
    toast.error('Quantity must be a number !!!');
    return;
  }
  if(formData.quantity<1){
    toast.error('Quantity must be a positive number !!!');
    return;
  }
  // console.log()

  if(isLoading){
    toast.error('Please Wait ,Image upload in progress ...');
    return;
  }
  // e.preventDefault();

  setIsLoading(true)
  
  // console.log(formData)



  try {
    await axios.post('http://localhost:4000/api/v1/createPost',{
      ...formData,
      token:token1
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    .then((res)=>{ 
      // console.log(res);
      toast.success(res.data.message)
      navigate('/userPosts');
    })


    .catch((e)=> {
      // console.log(e);
      toast.error(e.response.data.message);
      
    })

setIsLoading(false)

  } catch (error) {
    // console.log(error);
    toast.error(error.message);
  }
  
  setIsLoading(false)

}





//-----------------------------------------------------------------------------










  return (
    <div className='flex gap-y-6 items-center justify-center flex-col'>

<h1 className='font-bold'>Create A New {user.role} Post </h1>

<form action="" className='flex flex-col gap-y-4 items-center justify-center'>


{/* --------------------------------------------titlr-------------------------- */}
<label htmlFor="">
  Title 
<input type="text" className='ml-2 border-2 border-black'  name='title'  onChange={(e)=>changeHandler(e)}

value={formData.title}
/>

</label>

{/* ---------------------------------------description------------------------------------ */}

<label htmlFor="">
  Description 
<input type="text" className='ml-2 border-2 border-black'  name='description'  onChange={(e)=>changeHandler(e)}

value={formData.description}
/>

</label>

{/* ------------------------------------------address-------------------------- */}

<label htmlFor="">
Address 
<input type="text" className='ml-2 border-2 border-black'  name='address'  onChange={(e)=>changeHandler(e)}

value={formData.address}
/>

</label>
{/* ------------------------------------quantity------------------------------- */}

<label htmlFor="">
Quantity 
<input type="text" className='ml-2 border-2 border-black'  name='quantity'  onChange={(e)=>changeHandler(e)}

value={formData.quantity}
/>

</label>


{/* -------------------------image---------------------------------------------------- */}

<label htmlFor="">
Organisation Image


<input type="file" 
name='image'
onChange={(e)=>{
  imageHandler(e)
}}


/>


</label>






{/* -------------------district--------------------------------------- */}


<label htmlFor="district">
  Select your District 

 
<select name='district' className='w-[40%] border-2 border-black' value={formData.district} id='district' onChange={(e)=>{
  changeHandler(e)
}}>
  
  {
    Districts.map((dist)=>{
      return <option value={dist}>{dist}</option>
    })
  }
</select>
</label>


<button type="submit" className='border-2 border-black rounded-lg w-20' onClick={(e)=> submitHandler(e)} >
  {isLoading ? 'Please Wait ...':'Submit' }
  </button>

</form>

    </div>
  )
}
