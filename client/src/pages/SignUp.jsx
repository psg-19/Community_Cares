import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import loginBg from '../assets/loginbg1.png'




export const SignUp = () => {
  const navigate=useNavigate()
const {backendUrl,Districts}=useContext(AppContext)



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
const [isLoading1,setIsLoading1]=useState(false)

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
 await axios.post(backendUrl+'/signUp',formData,{withCredentials: true,headers: {
  'Content-Type': 'multipart/form-data'
}, credentials: 'include'})
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

  const x=formData.email.split('');
const y=formData.email.split('@')[1];
  // if(!(x.includes('@'))){
  //   return toast.error("enter valid email")
  // }
if((!(x.includes('@')))||!(x.includes("."))){
toast.error("Enter a valid Email")
  return
}

if(isLoading1){
  toast.error("Please Wait , Sending OTP")
  return;
}
  // if(!e.target.value.includes('@')||!e.target.value.includes('.')){

  //   toast.error('Please enter a valid email !!!')
  //   return;
  // }

  setIsLoading1(true)
  await axios.post(backendUrl+'/sendOtp',formData,{withCredentials: true,headers: {
    'Content-Type': 'multipart/form-data'
  }, credentials: 'include'})
  .then((e)=> {
    toast.success(e.data.message)
  })
  .catch((e)=>console.log(e))

  setIsLoading1(false)
}


//--------------------------------------------------------------



  return (
    <div className='flex items-center justify-center bg-green1-light h-[100vh]'>
     
     
     <div className='relative '>


     <div className='w-[730px] h-[730px] flex items-center justify-center '>
<img src={loginBg}  alt="" className='lg:w-[100%] lg:h-[100%] sm:w-[70%] sm:h-[70%] md:w-[100%] md:h-[100%]' />
</div>
     
     
     
     <form action="" className='flex  flex-col   justify-center items-center gap-y-10 absolute lg:top-[22%] lg:left-[20%] md:top-[22%] md:left-[20%] 
     sm:top-[25%] sm:left-[25%]
     '>


<div className='flex lg:gap-x-24 md:gap-x-16 sm:gap-x-10'>
{/* ------------------first div---------------------------- */}
<div className='flex flex-col items-center justify-center gap-y-6'>
{/* --------------------------fname-------------------------- */}
<div>
<label htmlFor="">
  <p><b>First Name</b></p>
</label>
<input type="text" className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  placeholder='Enter first Name' name='firstName' onChange={(e)=>changeHandler(e)}/>


</div>
{/* //-----------------------lname----------------------------- */}
<div>
<label htmlFor="">
 <p><b> Last Name </b></p>
</label>
<input type="text" className='  border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  placeholder='Enter last Name'  name='lastName' onChange={(e)=>changeHandler(e)}/>

</div>

{/* //------------------------email------------------------
 */}
<div className=''>
  
<label htmlFor="">
 <p><b>Email</b></p>
</label>
<input type="email" className='  border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  placeholder='Enter Email' name='email' onChange={(e)=>changeHandler(e)}/>
<br />
<button className='mt-1 className=bg-transparent hover:bg-cyan-500 text-cyan-700  font-semibold hover:text-white py-2 px-4 border border-cyan-500  hover:border-transparent rounded-lg 
rounded-lg  p-1' onClick={(e)=>sendOtp(e)}>{isLoading1 ? 'Please Wait ...':'Send OTP'}</button>


</div>
{/* ---------------------------------------------otp---------------------------------- */}

<div>
<label htmlFor="">
<p><b>  OTP </b></p>
</label>
<input type="text" className='   border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  placeholder='Enter OTP'  name='otp' onChange={(e)=>changeHandler(e)}/>

</div>
</div>






{/* --------------------------------second div ----------------------- */}



<div className='flex flex-col items-center justify-center gap-y-9'>

{/* -----------------------------------phone no-----------------
 */}
 <div>
  
<label htmlFor="">
  <p><b>Phone Number </b></p>
</label>
<input type="text" className='   border-2 border-black py-1 px-3 bg-input-200
rounded-lg' placeholder='Enter Phone Number'  name='phoneNo' onChange={(e)=>changeHandler(e)}/>

 </div>

{/* -------------------------------address------------------ */}
{/* 
<label htmlFor="">
Address
<input type="text" className='   border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  name='address' onChange={(e)=>changeHandler(e)}/>

</label> */}

{/* ----------------------------------district------------------ */}


<div>
  
<label htmlFor="district">
  <p><b>Select your District </b></p>

  </label>
 
<select name='district' className='w-[80%]  border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  id='district' onChange={(e)=>{
  changeHandler(e)
}}>
  
  {
    Districts.map((dist)=>{
      return <option value={dist}>{dist}</option>
    })
  }
</select>
</div>



{/* ----------------------------------password------- */}
<div>
<label htmlFor="">
<p><b>  Password </b></p>
</label>
<input type="password" className='   border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  placeholder='Enter Password' name='password' onChange={(e)=>changeHandler(e)}/>

</div>

{/* ------------------------------------conf pass----------- */}
<div>
  <label htmlFor="">
<p><b>  Confirm Password </b></p>
</label>
<input type="password" className='   border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  placeholder='Confirm Password'  name='confirmPassword' onChange={(e)=>changeHandler(e)}/>

</div>


</div>
</div>
{/* -----------------------third div---------------- */}

<div className='flex flex-col gap-y-6'>
  
{/* -----------------------------role------------------- */}
<select name="role" className='w-[100%]  border-2 border-black py-1 px-3 bg-input-200
rounded-lg'  id="role" onChange={(e)=> changeHandler(e)}>
  <option value="Donor">Donor</option>
  <option value="Reciever">Reciever</option>
</select>



{/* ------------submit-------------------------- */}

{/* <button type="submit" value='hii' /> */}
<button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500  hover:border-transparent rounded-lg " onClick={(e)=> submitHandler(e)}>{isLoading ? 'Please Wait ...':'Sign In'}</button>
</div>
     </form>
      </div>
</div>
    
  )
}
