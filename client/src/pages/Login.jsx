import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
export const Login = () => {

  const {isLogged,setToken1,token1,user,setUser,setIsLogged}=useContext(AppContext)
const navigate=useNavigate()

const check=()=>{
  console.log(isLogged+'islooo')
  navigate('/');
  // if(!token1)
  toast.error("You are already loggedin !!!")
 
}


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
// console.log(formData)

try {
await axios.get('http://localhost:4000/api/v1/BootUp')
} catch (error) {
  toast.error(error.message)
}


await axios.post('http://localhost:4000/api/v1/login',formData)
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
 


// try {

// } catch (error) {
//   console.log(error)
//   toast.error(error.response.data.message+'hiiiii');
// }

}



const getUser=async(token)=>{
  await axios.post('http://localhost:4000/api/v1/getUser',{
    token:token
  })
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
    <div >
{/* 
{
  isLogged ? (check()):




( */}



<form action="" className='flex flex-col gap-y-4' >
  
<label htmlFor="">
  Email 
<input type="text" className='ml-2 border-2 border-black' name='email'  onChange={(e)=>changeHandler(e)}/>

</label>


<label htmlFor="">
  Password 
<input type="password" className='ml-2 border-2 border-black' name='password' onChange={(e)=>changeHandler(e)}/>

</label>


<input type="submit" onClick={(e)=>submitHandler(e)}/>

</form>




{/* )
} */}
</div>
  
    
  )
}
