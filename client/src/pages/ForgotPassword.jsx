import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import loginBg from '../assets/loginbg1.png'




export const ForgotPassword = () => {

  const {backendUrl}=useContext(AppContext)
const navigate=useNavigate()


const [isLoading,setIsLoading]=useState(false);
const [isLoading1,setIsLoading1]=useState(false);

const [formData,setFormData]=useState({
  email:'',
  password:'',
  confirmPassword:'',
  otp:''
})


//-----------------------------------------------funcs----------------------------------



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
    toast.error("Please Wait , Sending OTP ...")
    return;
  }
    // if(!e.target.value.includes('@')||!e.target.value.includes('.')){
  
    //   toast.error('Please enter a valid email !!!')
    //   return;
    // }
  
    setIsLoading1(true)
    await axios.post(backendUrl+'/sendOtpForForgotPassword',formData,{withCredentials: true,headers: {
      'Content-Type': 'multipart/form-data'
    }, credentials: 'include'})
    .then((e)=> {
      toast.success(e.data.message)
    })
    .catch((e)=>toast.error(e.response.data.message))
  
    setIsLoading1(false)
  }
  



const changeHandler=(e)=>{
  setFormData((prev)=>({
    ...prev,
    [e.target.name]:e.target.value
  
  }))
}



const submitHandler=async(e)=>{
e.preventDefault();


if(isLoading){
  toast.error('Please wait ...');
  return;
}
setIsLoading(true)

// console.log(formData)


// console.log(';;;;;;;;;;;',process.env.REACT_APP_BACKEND_URL)

await axios.post(backendUrl+'/forgotPassword',formData,{withCredentials: true, headers: {
  'Content-Type': 'multipart/form-data'
},credentials: 'include'})
  .then((response)=>{
  
    
    toast.success(response.data.message);
    
    navigate('/login')
    

//------------------------


// console.log('hiiii',response)

})

.catch((error)=>{
  console.log(error)
  toast.error(error.response.data.message);
})
// console.log(response)


setIsLoading(false)

// try {

// } catch (error) {
//   console.log(error)
//   toast.error(error.response.data.message+'hiiiii');
// }

}



//----------------------------------------------------------------



  return (
    <div className='  h-[100vh]  flex items-center justify-center bg-green1-light' >
{/* 
{
  isLogged ? (check()):




( */}

<div className='relative'>

<div className='w-[730px] h-[730px] flex items-center justify-center'>
<img src={loginBg}  alt="" className='lg:w-[100%] lg:h-[100%] sm:w-[70%] sm:h-[70%]' />
</div>

<form action="" className='flex  flex-col   justify-center items-center gap-y-6 absolute lg:top-[25%] lg:left-[40%] sm:top-[25%] sm:left-[37%]

all:top-[25%] all:left-[37%]

' >
  
<div className='flex flex-col '>
<p> <b> Email </b></p>
<input type="text" className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg
' placeholder='Enter Your Email' name='email'  onChange={(e)=>changeHandler(e)}/>

<button className='mt-1 className=bg-transparent hover:bg-cyan-500 text-cyan-700  font-semibold hover:text-white py-2 px-4 border border-cyan-500  hover:border-transparent rounded-lg 
rounded-lg  p-1' onClick={(e)=>sendOtp(e)}>{isLoading1 ? 'Please Wait ...':'Send OTP'}</button>
</div>



<label htmlFor="">
<p><b>  OTP </b></p>
<input type="text" className='border-2 border-black py-1 px-3 rounded-lg bg-input-200' placeholder='Enter OTP '  name='otp' onChange={(e)=>changeHandler(e)}/>
</label>


<label htmlFor="">
<p><b>  Password </b></p>
<input type="password" className='border-2 border-black py-1 px-3 rounded-lg bg-input-200' placeholder='Enter Your Password'  name='password' onChange={(e)=>changeHandler(e)}/>
</label>
<label htmlFor="">
<p><b> Confirm Password </b></p>
<input type="password" className='border-2 border-black py-1 px-3 rounded-lg bg-input-200' placeholder='Enter Your Password Again'  name='confirmPassword' onChange={(e)=>changeHandler(e)}/>
</label>




<button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500  hover:border-transparent rounded-lg " type="submit" onClick={(e)=>submitHandler(e)}>
  {isLoading ? 'Please Wait ...':'Submit'}
</button>








</form>




{/* )
} */}
</div>
</div>
  
    
  )
}
