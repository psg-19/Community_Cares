import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import loginBg from '../assets/loginbg1.png'
export const Login = () => {

  const {isLogged,setToken1,backendUrl,setUser,setIsLogged}=useContext(AppContext)
const navigate=useNavigate()

const check=()=>{
  console.log(isLogged+'islooo')
  navigate('/');
  // if(!token1)
  toast.error("You are already loggedin !!!")
 
}

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

console.log(backendUrl+'/BootUp')
if(isLoading){
  toast.error('Please wait ...');
  return;
}
setIsLoading(true)

// console.log(formData)
try {
await axios.get(backendUrl+'/BootUp')

} catch (error) {
  toast.error(error.message)
}


await axios.post(backendUrl+'/login',formData)
  .then((response)=>{
    setToken1(response.data.token);
    
    toast.success(response.data.message);
    
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
  },  {withCredentials: true, credentials: 'include'})
  .then((response)=>{
    setUser(response.data.userData)
   
    // console.log(response)
// setIsLogged(true)
navigate('/')
})
.catch((error)=>{
  console.log(error)
  toast.error(error.response.data.message);
})
}
//----------------------------------------------------------------



  return (
    <div className='  h-[88vh]  flex items-center justify-center bg-green1-light' >
{/* 
{
  isLogged ? (check()):




( */}

<div className='relative'>

<div className='w-[730px] h-[730px] flex items-center justify-center'>
<img src={loginBg}  alt="" className='lg:w-[100%] lg:h-[100%] sm:w-[70%] sm:h-[70%]' />
</div>

<form action="" className='flex  flex-col   justify-center items-center gap-y-6 absolute lg:top-[40%] lg:left-[40%] sm:top-[35%] sm:left-[37%]


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




</form>




{/* )
} */}
</div>
</div>
  
    
  )
}
