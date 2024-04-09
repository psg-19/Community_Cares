import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { MdEditSquare } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
import  axios  from 'axios';
import {toast} from 'react-hot-toast'
import editPostBg from '../assets/update_post.png'


export const EditPost = () => {

    const {currentPostEdit,backendUrl,setCurrentPostEdit,Districts}=useContext(AppContext)

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

    await axios.put(backendUrl+'/updatePost',{
        ...formData,
        postId:currentPostEdit._id
    },{
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
    <div className='gap-y-6 bg-green1-light h-[100vh] 
    flex items-center justify-center '>

<div className='bg-white rounded-3xl w-[80%] h-[83%] flex flex-col gap-y-4 px-4 py-2 overflow-x-hidden'>


<h1 className='font-bold flex flex-wrap justify-center mt-8'><b>EDIT POST</b></h1>



<div className='flex flex-row flex-wrap justify-center items-center  gap-x-10 gap-y-10 w-[100%] mb-8 divide-x overflow-y-auto no-scrollbar  divide-gray-400'>
 




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

<img src={currentPostEdit.imageUrl}

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
rounded-lg' id='district' onChange={(e)=>{
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

<button className='border-2 border-black py-1 px-3'

onClick={(e)=> submitHandler(e)}
>{isLoading ? 'Please Wait':'Save'}</button>
<button className='border-2 border-black py-1 px-3' onClick={()=>{
    navigate('/userPosts')
}} >Cancel</button>


</div>


</form>

<div className='w-[45%] h-[100%] lg:max-h-[500px] min-w-[200px]'><img src={editPostBg} alt="srgfsdg" className='w-[100%] h-[100%] ' /></div>




</div>


</div>





    </div>
  )
}
