import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import loginBg from '../assets/loginbg1.png'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export const Login = () => {

  const {setToken1,setUser,setIsLogged}=useContext(AppContext)
const navigate=useNavigate()

const [showpass, setshowpass] = useState(false);
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
await axios.get(process.env.REACT_APP_BACKEND_URL+'/BootUp',{},{withCredentials: true,headers: {
  'Content-Type': 'multipart/form-data'
}, credentials: 'include'})

} catch (error) {
  toast.error(error.message)
}

// console.log(';;;;;;;;;;;',process.env.REACT_APP_BACKEND_URL)

await axios.post(process.env.REACT_APP_BACKEND_URL+'/login',formData,{withCredentials: true, headers: {
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
  await axios.post(process.env.REACT_APP_BACKEND_URL+'/getUser',{
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


{/* <div className='lg:w-[730px] md:w-[730px] sm:w-[730px] all:w-[630px] h-[730px] flex lg:items-center lg:justify-center md:items-center md:justify-center sm:items-center sm:justify-center   all:items-center  all:justify-stretch '>
<img src={loginBg}  alt="" className='lg:w-[100%] lg:h-[100%] sm:w-[70%] sm:h-[70%] all:h-[60%] all:w-[60%]' />
</div> */}

<form action="" className='flex  flex-col   justify-center items-center gap-y-6  
relative overflow-hidden border-2 border-richblack-700 px-[10%] py-[7%] bg-richblack-900 rounded-2xl
' >
  
<div >
<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
<input type='text' className="bg-richblack-700 rounded-[0.5rem] text-richblack-5
        w-full p-[12px]" placeholder='Enter Your Email' name='email'  onChange={(e)=>changeHandler(e)}/>


</div>



<label htmlFor="" className='w-full relative'>
<p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Password <sup className="text-pink-200">*</sup>
        </p>
<input  type={showpass === true ? "text" : "password"} className="bg-richblack-700 rounded-[0.5rem] text-richblack-5
        w-full p-[12px]" placeholder='Enter Your Password'  name='password' onChange={(e)=>changeHandler(e)}/>

        
<span
          onClick={() => {
            setshowpass((prev) => !prev);
          }}
          className="absolute right-3 mt-2 top-[30px] cursor-pointer "
        >
          {showpass === true ? (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          )}
        </span>
</label>




<button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500  hover:border-transparent rounded-lg " type="submit" onClick={(e)=>submitHandler(e)}>
  {isLoading ? 'Please Wait ...':'login'}
</button>

<p className=' text-lightBlue300 text-sm' onClick={()=> navigate('/forgotPassword')}>Forgot <br /> password ?</p>






</form>




{/* )
} */}

</div>
  
    
  )
}
