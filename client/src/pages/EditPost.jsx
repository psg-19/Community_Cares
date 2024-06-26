import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { MdEditSquare } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
import  axios  from 'axios';
import {toast} from 'react-hot-toast'
import editPostBg from '../assets/update_post.png'


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

if(formData.title==currentPostEdit.title&&
  formData.description==currentPostEdit.description&&
  formData.district==currentPostEdit.district&&
  formData.address==currentPostEdit.address &&
  formData.quantity==currentPostEdit.quantity&&
  formData.image==null){
  toast.error("Make atleast one change to update post !!!");
  setIsLoading(false)
  return;
}

// console.log(formData.image)
if(formData.image!=null){
if(formData.image.size>1024*1024*6){
  toast.error("Image must be less than 6 mb");
  formData.image=null;
  setIsLoading(false)
  }
}

    await axios.put(process.env.REACT_APP_BACKEND_URL+'/updatePost',{
        ...formData,
        postId:currentPostEdit._id
    },{withCredentials: true, credentials: 'include',
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
    <div className='gap-y-6 bg-richblack-800  h-[100vh] 
    flex items-center justify-center '>

<div className='bg-white rounded-3xl w-[80%] h-[83%] flex flex-col gap-y-4 px-4 py-2 overflow-x-hidden'>


<h1 className='font-bold flex flex-wrap justify-center mt-8'><b>EDIT POST</b></h1>



<div className='flex flex-row flex-wrap justify-center items-center  gap-x-10 gap-y-10 w-[100%] mb-8 lg:divide-x md:divide-x sm:divide-x overflow-y-auto no-scrollbar  divide-gray-400'>
 




<form action="" className='flex flex-col gap-y-3 items-center justify-center w-[45%] min-w-[200px]  '>




{/* //------------------title------------------------------------- */}

<div>
  
<label htmlFor="">
 <p><b> Title </b></p>
  </label>
<input type="text" className='border-2 border-black py-1 px-3 bg-input-200
rounded-lg' name='title'  onChange={(e)=>changeHandler(e)}

placeholder='Enter Title Of The Post'
value={formData.title}
/>
</div>




<div className='relative w-[80%]'>

<img src={formData.image==null ? currentPostEdit.imageUrl:URL.createObjectURL(formData.image)}

className='rounded-lg w-[100%]'
alt="post image" />
<div className='absolute top-[86%] left-[90%]  bg-slate-200   w-10 h-10 rounded-full'></div>
<MdEditSquare className='absolute top-[90.6%] left-[93%] text-2xl'/>
<input type="file" className='absolute top-[89.5%] left-[93%] w-6 rounded-full opacity-0' onChange={(e)=> imageHandler(e)} />

</div>








{/* -------------------------------------description------------------------ */}
<div>
  
<label htmlFor="">
<p><b>Description </b></p>
</label>
<input type="text" className='border-2 border-black py-1 px-3 bg-input-200
rounded-lg' name='description' placeholder='Enter Description'  onChange={(e)=>changeHandler(e)}
value={formData.description}
/>

</div>

{/* -------------------------------------------quantity----------------------------------- */}
<div>

<label htmlFor="">
<p><b>Quantity </b></p>
</label>
<input type="text" className='border-2 border-black py-1 px-3 bg-input-200
rounded-lg' name='quantity' placeholder='Enter Quantity ' onChange={(e)=>changeHandler(e)}

value={formData.quantity}
/>
</div>


{/* ------------------------------address--------------------------------------------- */}
<div>
  
<label htmlFor="">
<p><b>Address </b></p>
</label>
<input type="text" className='border-2 border-black py-1 px-3 bg-input-200
rounded-lg' name='address'  onChange={(e)=>changeHandler(e)}

value={formData.address}

/>

</div>




<div>
  
<label htmlFor="district">
<p><b>  Select your District </b></p>

  </label>
 
<select name='district' className=' border-2 border-black py-1 px-3 bg-input-200
rounded-lg w-[100%]' id='district' onChange={(e)=>{
  changeHandler(e)
}}>
  
  {
    Districts.map((dist)=>{
      return <option value={dist}>{dist}</option>
    })
  }
</select>
</div>
 

<div className='flex justify-center items-center gap-x-2'>


<button onClick={(e)=>submitHandler(e)}  class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">



<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
{isLoading ? 'Please Wait ...':'Save'}
</span>
</button>






<button onClick={()=>{
    navigate('/userPosts')
}} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Cancel
</span>
</button>


</div>


</form>

<div className='w-[45%] h-[100%] lg:max-h-[500px] min-w-[200px]'><img src={editPostBg} alt="srgfsdg" className='w-[100%] h-[100%] ' /></div>




</div>


</div>





    </div>
  )
}
