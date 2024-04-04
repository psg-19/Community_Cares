import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

export const CreatePost = () => {

const [isLoading,setIsLoading]=useState(false)
const {user,Districts}=useContext(AppContext)

const x=FormData()

  
//---------------------funv---------------------------------

const changeHandler=(e)=>{
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    
    }))
    // console.log(formData)
  }



  const [formData,setFormData]=useState({
    title:'',
    description:'',
    district:'',
    address:'',
    quantity:''
  })
  





//-----------------------------------------------------------------------------










  return (
    <div className='flex gap-y-6 items-center justify-center flex-col'>

<h1 className='font-bold'>Create A New {user.role} Post </h1>

<form action="" className='flex flex-col gap-y-4'>


{/* --------------------------------------------titlr-------------------------- */}
<label htmlFor="">
  Title 
<input type="text" className='ml-2 border-2 border-black'  name='title'  onChange={(e)=>changeHandler(e)}/>

</label>

{/* ---------------------------------------description------------------------------------ */}

<label htmlFor="">
  Description 
<input type="text" className='ml-2 border-2 border-black'  name='description'  onChange={(e)=>changeHandler(e)}/>

</label>

{/* ------------------------------------------address-------------------------- */}

<label htmlFor="">
Address 
<input type="text" className='ml-2 border-2 border-black'  name='address'  onChange={(e)=>changeHandler(e)}/>

</label>
{/* ------------------------------------quantity------------------------------- */}

<label htmlFor="">
Quantity 
<input type="text" className='ml-2 border-2 border-black'  name='quantity'  onChange={(e)=>changeHandler(e)}/>

</label>

{/* -------------------district--------------------------------------- */}


<label htmlFor="district">
  Select your District 

 
<select name='district' className='w-[40%] border-2 border-black' id='district' onChange={(e)=>{
  changeHandler(e)
}}>
  
  {
    Districts.map((dist)=>{
      return <option value={dist}>{dist}</option>
    })
  }
</select>
</label>




</form>

    </div>
  )
}
