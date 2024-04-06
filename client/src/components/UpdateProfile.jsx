import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { FaUserEdit } from "react-icons/fa";
import {toast} from 'react-hot-toast'
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom'



export const UpdateProfile = ({setChange}) => {
  const {user,Districts,setUser,token1}=useContext(AppContext)
// console.log(user)
const [isLoading,setIsLoading]=useState(false)

const [formData,setFormData]=useState({
  firstName:user.firstName,
  lastName:user.lastName,
  phoneNo:user.phoneNo,
  address:user.address,
  district:user.district,
  image:null
})


const navigate=useNavigate()



// -------------------------ufncs-------------------------------------------
const changeHandler=(e)=>{
  setFormData((prev)=>({
    ...prev,
    [e.target.name]:e.target.value
  
  }))
  // console.log('first')
}

const imageHandler=(e)=>{
  setFormData((prev)=>({
    ...prev,
    image:e.target.files[0]
  
  }))
  // console.log(e.target)
  console.log(formData)
  console.log(e.target.files[0]);


}




const reloadUser=async()=>{

  
    await axios.post('https://community-cares.onrender.com/api/v1/getUser',{
      token:token1
    })
 .then((res)=>{
  setUser(res.data.userData);
  // console.log(res.data.userData)
  // navigate('/profile')
  setChange((prev)=> prev=prev-1)
 })
 .catch((e)=>{toast.error(e.response.data.message)

})

}







const submitHandler=async(e)=>{

  e.preventDefault();


  


  if(isLoading){
    toast.error('Please Wait, Image upload in progress !!!');
    return
  }


  setIsLoading(true)
  
  // console.log('submit',formData)

// console.log(formData)


    await axios.put('https://community-cares.onrender.com/api/v1/updateUser',{
      ...formData,
      token:token1
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    .then((res)=>{ 
      // console.log(res.data);
      toast.success(res.data.message);

      reloadUser()
      

    })


    .catch((e)=> {
      // console.log(e);
      toast.error(e.response.data.message)
    })

setIsLoading(false)

//   } catch (error) {
//     // console.log(error);
//     toast.error(error.message);
//   }
  
  setIsLoading(false)




}



///--------------------------------------------------------------------



  return (
    <div className='flex flex-col items-center justify-center gap-y-6' >
        
        <h1 className='font-bold text-xl'>Update Your Profile</h1>

<form action="" className='flex flex-col items-center justify-center gap-y-4'>

  {/* -----------------img------------------------- */}
<div className='relative'>
  
  <img src={user.profileUrl} className='w-40 h-40 rounded-full '  alt="profile" />
  <div className=' bg-slate-300 rounded-full absolute top-[69%] left-[74%] h-10 w-10'
  
  

  >
  </div>
    <FaUserEdit type='file'  className='absolute top-[73%] left-[81%] text-2xl' />

    <input type="file" className='absolute top-[72%] opacity-0 left-[77%] w-8 h-8 rounded-full z-10' onChange={(e)=> imageHandler(e)}/>
    
  
  </div>
{/* -------------fname----------- */}
<label htmlFor="">
  First Name 
<input type="text" className='ml-2 border-2 border-black'  name='firstName' value={formData.firstName} onChange={(e)=>changeHandler(e)}/>

</label>

{/* --------------------------lname--------------------- */}
<label htmlFor="">
  Last Name 
<input type="text" className='ml-2 border-2 border-black'  name='lastName' value={formData.lastName} onChange={(e)=>changeHandler(e)}/>

</label>
{/* --------------------------------------phoneNo--------------------------- */}

<label htmlFor="">
  Phone Number 
<input type="text" className='ml-2 border-2 border-black'  name='phoneNo' value={formData.phoneNo}  onChange={(e)=>changeHandler(e)}/>

</label>

{/* -------------------------------------address---------------------------------- */}
<label htmlFor="">
  Address 
<input type="text" className='ml-2 border-2 border-black'  name='address' value={formData.address} onChange={(e)=>changeHandler(e)}/>

</label>

{/* -----------------dist--------------------------------------------------- */}

<label htmlFor="district">
  Select your District 

 
<select name='district' className='w-[40%] border-2 border-black' value={formData.district} id='district' onChange={(e)=>{
  changeHandler(e)
}}>
  
  {
    Districts.map((dist)=>{
      return <option value={dist}>{dist}</option>
    })
  }
</select>
</label>



<div>

<button onClick={(e)=>submitHandler(e)}  class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">



<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
{isLoading ? 'Please Wait ...':'Save'}
</span>
</button>



<button onClick={()=>setChange((prev)=> prev=prev-1)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Cancel
</span>
</button>


</div>



</form>

        {/* ///--------last k buttons----------- */}
   


    {/* //container end */}
    </div>
  )
}
