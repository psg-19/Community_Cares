import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import loginBg from '../assets/loginbg1.png'
export const Login = () => {

  const {setToken1,backendUrl,setUser,setIsLogged}=useContext(AppContext)
const navigate=useNavigate()


const [isLoading,setIsLoading]=useState(false);

const [formData,setFormData]=useState({
  email:'',
  password:''
})


//-----------------------------------------------funcs----------------------------------


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
try {
await axios.get(backendUrl+'/BootUp',{},{withCredentials: true,headers: {
  'Content-Type': 'multipart/form-data'
}, credentials: 'include'})

} catch (error) {
  toast.error(error.message)
}

// console.log(';;;;;;;;;;;',process.env.REACT_APP_BACKEND_URL)

await axios.post(backendUrl+'/login',formData,{withCredentials: true, headers: {
  'Content-Type': 'multipart/form-data'
},credentials: 'include'})
  .then((response)=>{
    setToken1(response.data.token);
    
    toast.success(response.data.message);
    
    navigate('/')
    setIsLogged(true);

//------------------------

getUser(response.data.token);
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



const getUser=async(token)=>{
  await axios.post(backendUrl+'/getUser',{
    token:token
  },  {withCredentials: true, headers: {
    'Content-Type': 'multipart/form-data'
  }, credentials: 'include'})
  .then((response)=>{
    setUser(response.data.userData)
   
    // console.log(response)
// setIsLogged(true)

})
.catch((error)=>{
  console.log(error)
  toast.error(error.response.data.message);
})
}
//----------------------------------------------------------------



  return (
    <div className='  h-[100vh]  flex items-center justify-center bg-richblack-800 ' >
{/* 
{
  isLogged ? (check()):




( */}

<div className='relative'>

<div className='w-[730px] h-[730px] flex items-center justify-center'>
<img src={loginBg}  alt="" className='lg:w-[100%] lg:h-[100%] sm:w-[70%] sm:h-[70%]' />
</div>

<form action="" className='flex  flex-col   justify-center items-center gap-y-6 absolute lg:top-[40%] lg:left-[40%] sm:top-[35%] sm:left-[37%]

all:top-[40%] all:left-[37%]

' >
  
<div >
<p> <b> Email </b></p>
<input type="text" className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg
' placeholder='Enter Your Email' name='email'  onChange={(e)=>changeHandler(e)}/>
</div>



<label htmlFor="">
<p><b>  Password </b></p>
<input type="password" className='border-2 border-black py-1 px-3 rounded-lg bg-input-200' placeholder='Enter Your Password'  name='password' onChange={(e)=>changeHandler(e)}/>
</label>




<button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500  hover:border-transparent rounded-lg " type="submit" onClick={(e)=>submitHandler(e)}>
  {isLoading ? 'Please Wait ...':'login'}
</button>

<p className=' text-lightBlue300 text-sm' onClick={()=> navigate('/forgotPassword')}>Forgot <br /> password ?</p>






</form>




{/* )
} */}
</div>
</div>
  
    
  )
}
