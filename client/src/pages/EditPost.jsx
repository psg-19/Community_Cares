import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { MdEditSquare } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
import  axios  from 'axios';
import {toast} from 'react-hot-toast'



export const EditPost = () => {

    const {currentPostEdit,setCurrentPostEdit,Districts}=useContext(AppContext)

    const navigate=useNavigate()

const [isLoading,setIsLoading]=useState(false);
    const [formData,setFormData]=useState({

        title:currentPostEdit.title,
        description:currentPostEdit.description,
        district:currentPostEdit.district,
        address:currentPostEdit.address ,
        quantity:currentPostEdit.quantity,
        image:null

      })
      

    //----------------------------------------------------------------------

   
      
      
      const changeHandler=(e)=>{
        setFormData((prev)=>({
          ...prev,
          [e.target.name]:e.target.value
        
        }))
      }

const submitHandler=async(e)=>{
  e.preventDefault()
    setIsLoading(true)


    
  if((isNaN(parseInt(formData.quantity)))){
    toast.error('Quantity must be a number !!!');
    return;
  }
  if(formData.quantity<1){
    toast.error('Quantity must be a positive number !!!');
    return;
  }
if(isLoading){
  toast.error('Please Wait ,image upload in progress !!!');
  return
}

    await axios.put('https://community-cares.onrender.com/api/v1/updatePost',{
        ...formData,
        postId:currentPostEdit._id
    },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      .then((res)=> {
        setCurrentPostEdit(res.data.updatedPost)
        toast.success(res.data.message)
        navigate('/userPosts')
      })
      .catch((e)=> toast.error(e.response.data.message))

    // console.log('first')
    // console.log(formData)

    setIsLoading(false)
}

const imageHandler=(e)=>{
    setFormData((prev)=>({
        ...prev,
        image:e.target.files[0]
      
      }))
// console.log(currentPostEdit)
// console.log(e.target.files[0])
    //   currentPostEdit.imageUrl=e.target.files[0].name
}
    //-------------------------------------------------------------------------------------






    //------------------------------------------------------------------------





  return (
    <div className='flex items-center justify-center'>




<form action="" className='flex flex-col gap-y-6 border-2 border-black p-6 '>




{/* //------------------title------------------------------------- */}


<label htmlFor="">
  Title 
<input type="text" className='ml-2 border-2 border-black' name='title'  onChange={(e)=>changeHandler(e)}
value={formData.title}
/>

</label>



<div className='relative'>

<img src={currentPostEdit.imageUrl}

className='rounded-lg w-[99%]'
alt="post image" />
<div className='absolute top-[92%] left-[92%]  bg-slate-200   w-10 h-10 rounded-full'></div>
<MdEditSquare className='absolute top-[94.5%] left-[94.5%] text-2xl'/>
<input type="file" className='absolute top-[93%] left-[94.5%] w-6 rounded-full opacity-0' onChange={(e)=> imageHandler(e)} />

</div>








{/* -------------------------------------description------------------------ */}

<label htmlFor="">
Description 
<input type="text" className='ml-2 border-2 border-black' name='description'  onChange={(e)=>changeHandler(e)}
value={formData.description}
/>

</label>

{/* -------------------------------------------quantity----------------------------------- */}

<label htmlFor="">
Quantity 
<input type="text" className='ml-2 border-2 border-black' name='quantity'  onChange={(e)=>changeHandler(e)}

value={formData.quantity}
/>

</label>

{/* ------------------------------address--------------------------------------------- */}

<label htmlFor="">
Address 
<input type="text" className='ml-2 border-2 border-black' name='address'  onChange={(e)=>changeHandler(e)}

value={formData.address}

/>

</label>





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


<div className='flex justify-center items-center gap-x-2'>

<button className='border-2 border-black py-1 px-3'

onClick={(e)=> submitHandler(e)}
>{isLoading ? 'Please Wait':'Save'}</button>
<button className='border-2 border-black py-1 px-3' onClick={()=>{
    navigate('/userPosts')
}} >Cancel</button>


</div>


</form>





    </div>
  )
}
