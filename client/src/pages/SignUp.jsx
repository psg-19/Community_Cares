import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import axios from 'axios'


export const SignUp = () => {
  const navigate=useNavigate()
const {isLogged,Districts}=useContext(AppContext)



const [formData,setFormData]=useState({
  email:'',
  password:'',
  confirmPassword:'',
  firstName:'',
  lastName:'',
  phoneNo:'',
  role:'Donor',
  address:'',
  district:'Ujjain',
  otp:''
})


const [isLoading,setIsLoading]=useState(false)

//-----------------------------------------------funcs----------------------------------


const changeHandler=(e)=>{
  setFormData((prev)=>({
    ...prev,
    [e.target.name]:e.target.value
  
  }))
  // console.log('first')
}

const submitHandler=async(e)=>{
  setIsLoading(true)
  e.preventDefault();
  console.log(formData)
 await axios.post('https://community-cares.onrender.com/api/v1/signUp',formData)
 .then((res)=>{
  
  toast.success(res.data.message);
  navigate('/')
 })
 .catch((err)=>{
  console.log(err)
  toast.error(err.response.data.message)
})

setIsLoading(false);
}




const sendOtp=async(e)=>{
  e.preventDefault();

  // if(!e.target.value.includes('@')||!e.target.value.includes('.')){

  //   toast.error('Please enter a valid email !!!')
  //   return;
  // }

  setIsLoading(true)
  await axios.post('https://community-cares.onrender.com/api/v1/sendOtp',formData)
  .then((e)=> {
    toast.success(e.data.message)
  })
  .catch((e)=>console.log(e))

  setIsLoading(false)
}


//--------------------------------------------------------------



  return (
    <div className='flex items-center justify-center'>
     <form action="" className='flex flex-col items-center justify-center gap-y-4'>



{/* --------------------------fname-------------------------- */}
<label htmlFor="">
  First Name
<input type="text" className='ml-2 border-2 border-black'  name='firstName' onChange={(e)=>changeHandler(e)}/>

</label>

{/* //-----------------------lname----------------------------- */}
<label htmlFor="">
  Last Name 
<input type="text" className='ml-2 border-2 border-black'  name='lastName' onChange={(e)=>changeHandler(e)}/>

</label>

{/* //------------------------email------------------------
 */}

<label htmlFor="">
  Email 
<input type="email" className='ml-2 border-2 border-black'  name='email' onChange={(e)=>changeHandler(e)}/>


<button className='ml-2 border-2 border-black rounded-lg p-1' onClick={(e)=>sendOtp(e)}>{isLoading ? 'Please Wait ...':'Send OTP'}</button>


</label>


{/* -----------------------------------phone no-----------------
 */}
<label htmlFor="">
  Phone Number 
<input type="text" className='ml-2 border-2 border-black'  name='phoneNo' onChange={(e)=>changeHandler(e)}/>

</label>

{/* -----------------------------role------------------- */}
<select name="role" className='w-[40%] border-2 border-black'  id="role" onChange={(e)=> changeHandler(e)}>
  <option value="Donor">Donor</option>
  <option value="Reciever">Reciever</option>
</select>

{/* -------------------------------address------------------ */}

<label htmlFor="">
 Address
<input type="text" className='ml-2 border-2 border-black'  name='address' onChange={(e)=>changeHandler(e)}/>

</label>

{/* ----------------------------------district------------------ */}



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



{/* ----------------------------------password------- */}
<label htmlFor="">
  Password 
<input type="password" className='ml-2 border-2 border-black'  name='password' onChange={(e)=>changeHandler(e)}/>

</label>

{/* ------------------------------------conf pass----------- */}
<label htmlFor="">
  Confirm Password 
<input type="password" className='ml-2 border-2 border-black'  name='confirmPassword' onChange={(e)=>changeHandler(e)}/>

</label>

{/* ---------------------------------------------otp---------------------------------- */}
<label htmlFor="">
  OTP 
<input type="text" className='ml-2 border-2 border-black'  name='otp' onChange={(e)=>changeHandler(e)}/>

</label>


{/* ------------submit-------------------------- */}

{/* <button type="submit" value='hii' /> */}
<button onClick={(e)=> submitHandler(e)}>{isLoading ? 'Please Wait ...':'Sign In'}</button>
     </form>
</div>
    
  )
}
