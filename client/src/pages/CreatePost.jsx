import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import sidepic from '../assets/createPost.png'





export const CreatePost = () => {

const [isLoading,setIsLoading]=useState(false)
const {user,Districts,token1,backendUrl}=useContext(AppContext)
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
    await axios.post(backendUrl+'/createPost',{
      ...formData,
      token:token1
    },{ withCredentials: true,headers: {
      'Content-Type': 'multipart/form-data'
    }, credentials: 'include'
    })

    .then((res)=>{ 
      console.log(res);
      toast.success(res.data.message)
      navigate('/userPosts');
      setIsLoading(false)
    })


    .catch((e)=> {
      console.log(e);
      toast.error(e.response.data.message ? (e.response.data.message):(e.message));
      // alert(JSON.stringify(e.response))
      
      setIsLoading(false)
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
    <div className=' gap-y-6 bg-richblack-800  h-[100vh] pt-16
    flex items-center justify-center 
    '>



{/* ---------------------outer coiver---------------------------------
 */}

<div className='bg-white rounded-3xl w-[80%] h-[83%] flex flex-col gap-y-4 px-4 py-2 overflow-x-hidden'>



<h1 className='font-bold flex flex-wrap justify-center mt-8'><b>Create A New {user.role} Post </b></h1>



{/* --------------------2 ka div--------------------------------- */}
<div className='flex flex-row flex-wrap justify-center items-center  gap-x-10 gap-y-10 w-[100%] mb-8 lg:divide-x md:divide-x sm:divide-x overflow-y-auto no-scrollbar  divide-gray-400'>



<form action="" className='flex flex-col gap-y-4 items-center justify-center w-[45%] min-w-[200px] '>


{/* --------------------------------------------titlr-------------------------- */}
<div>
  
<label htmlFor="">
<p><b>  Title </b></p>
  </label>
<input type="text" className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  name='title'  placeholder='Enter Title' onChange={(e)=>changeHandler(e)}

value={formData.title}
/>

</div>

{/* ---------------------------------------description------------------------------------ */}
<div>
<label htmlFor="">
<p><b>  Description </b></p>
  </label>
<input type="text" className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg' placeholder='Enter Description' name='description'  onChange={(e)=>changeHandler(e)}

value={formData.description}
/>
</div>

{/* ------------------------------------------address-------------------------- */}
<div>
  
<label htmlFor="">
<p><b>Address </b></p>
</label>
<input type="text" className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  name='address' placeholder='Enter Address' onChange={(e)=>changeHandler(e)}

value={formData.address}
/>
</div>

{/* ------------------------------------quantity------------------------------- */}
<div>
  
<label htmlFor="">
<p><b>Quantity</b></p> 
</label>
<input type="text" className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  name='quantity' placeholder='Enter Quantity'  onChange={(e)=>changeHandler(e)}

value={formData.quantity}
/>

</div>


{/* -------------------------image---------------------------------------------------- */}
<div className='flex flex-col justify-center gap-y-3 items-center'>
  
<label htmlFor="">
  <p><b>Organisation Image</b></p>

</label>


<div className='h-[150px] border-[2px] rounded-lg border-black w-[250px] flex justify-center items-center'>{formData.image==null ?'No file selected':<img className='rounded-lg w-[100%] h-[100%] ' src={URL.createObjectURL(formData.image)} alt="" />}</div>

<input type="file" 
name='image'
className='w-[80%]'
onChange={(e)=>{
  imageHandler(e)
}}


/>
</div>








{/* -------------------district--------------------------------------- */}

<div>
<label htmlFor="district">
  <p><b>Select your District </b></p>

  </label>
 
<select name='district' className='w-[100%]  border-2 border-black py-1 px-3 bg-input-200
rounded-lg' value={formData.district} id='district' onChange={(e)=>{
  changeHandler(e)
}}>
  
  {
    Districts.map((dist,index)=>{
      return <option key={index} value={dist}>{dist}</option>
    })
  }
</select>
</div>

<button type="submit" className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded' onClick={(e)=> submitHandler(e)} >
  {isLoading ? 'Please Wait ...':'Submit' }
  </button>

</form>


{/* ------------------------image--------------------------------------- */}

<div className='w-[45%] h-[100%] lg:max-h-[500px] min-w-[200px]'><img src={sidepic} alt="srgfsdg" className='w-[100%] h-[100%] ' /></div>


</div>

</div>

    </div>
  )
}
