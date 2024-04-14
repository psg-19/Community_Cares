import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'





export const Home = () => {


  const {backendUrl,setUser,setToken1,setIsLogged,setClick}=useContext(AppContext)
const navigate=useNavigate()

  const refreshHandler=async()=>{
      
      
    await axios.post(backendUrl+'/isLogged',{
      
    },  {withCredentials: true,headers: {
      'Content-Type': 'multipart/form-data'
    }, credentials: 'include'})
    
    .then((res) => {
      
   
      setToken1(res.data.token);
      getUser()
      setIsLogged(true)
      
    })
  .catch((e)=> {
    // setIsLogged(false);
    // setToken1('');
    // setUser(null)
  })
}


const getUser=async()=>{
  await axios.post(backendUrl+'/getUser',{
    
  },  {withCredentials: true, headers: {
    'Content-Type': 'multipart/form-data'
  }, credentials: 'include'})
  .then((response)=>{
    setUser(response.data.userData)
   
    // console.log(response)
// setIsLogged(true)

})
.catch((error)=>{

  toast.error(error.response.data.message);
})
}


useEffect(()=>{
  refreshHandler()
},[])



  return (
    <div className='flex flex-col bg-richblack-800 no-scrollbar    justify-center text-white overflow-y-scroll overflow-x-hidden no-scrollbar'>


{/* -------------------wrapper------------------------------------------------------ */}


{/* ---------------------------------hero=--------------------------------- */}
<div className=' bg-homeBg  w-[100vw] h-[100vh] bg-cover bg-center bg-no-repeat relative flex justify-center items-center no-scrollbar'>



  
<div className=' flex flex-col gap-y-20     '><h1 className=' text-6xl font-extrabold text-white z-10 text-center'>Welcome To
   Community Care's</h1>
   <p className=' text-center text-xl'>Join our platform and make a difference in your community by donating food.</p>
   </div>

   

</div>



{/* -------------------------------------hero-end------------------------------------------ */}


{/* ------------------------------------mid section---------------------------- */}

<div className=' flex-col w-[100vw] bg-blue1-light' >

{/* -----------------------1st----------------------------- */}

<div className=' w-[100vw] flex flex-row gap-x-12 flex-wrap justify-center items-center '  >

<div  className='lg:w-[40%] md:w-[40%] sm:w-[90%] all:w-[90%] py-12 flex flex-col gap-y-10 min-w-[300px]'>

<h1 className='text-4xl text-black font-extrabold text-center'>Volunteer With Us</h1>

<p className='text-xl text-black text-center'> Join our platform and make a difference in your community by Donating food.</p>

<div className='flex justify-center items-center gap-x-4'>
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " onClick={()=> {
  navigate('/donorPost')
  setClick('Donor Posts')
  }}>
  Donor Posts
</button>



<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " onClick={()=> navigate('/createPosts')}>
 Create Post
</button></div>

</div>
{/* ======================== */}

<div className=' py-12 min-w-[300px] lg:w-[40%] md:w-[40%] sm:w-[90%] all:w-[90%]'>
  <img src="https://ucarecdn.com/c67f35be-a6be-41c6-9545-8daebe0a085a/" alt="picture" className='h-[100%] w-[100%] '/>
</div>




</div>

{/* -----------------------1st end----------------------------- */}

{/* ---------------------------------------2nd start------------------------ */}

<div className=' w-[100vw] flex flex-row gap-x-12 flex-wrap-reverse justify-center items-center '  >



<div className=' py-12 min-w-[300px] lg:w-[40%] md:w-[40%] sm:w-[90%] all:w-[90%]'>
  <img src="https://ucarecdn.com/c67f35be-a6be-41c6-9545-8daebe0a085a/" alt="picture" className='h-[100%] w-[100%] '/>
</div>



<div  className='lg:w-[40%] md:w-[40%] sm:w-[90%] all:w-[90%] py-12 flex flex-col gap-y-10 min-w-[300px]'>

<h1 className='text-4xl text-black font-extrabold text-center'>Get  Next Meal For Your Organisation</h1>

<p className='text-xl text-black text-center'> Post a request of food for your Organisation with details about the rquest.</p>

<div className='flex justify-center items-center gap-x-4'>
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " onClick={()=>{ navigate('/recieverPost')
setClick('Reciever Posts')
}}>
  Reciever's Posts
</button>

<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " onClick={()=> navigate('/createPosts')}>
 Create Posts
</button></div>

</div>
{/* ======================== */}





</div>

{/* ---------------------------------------2nd end------------------------ */}
{/* ---------------------------------------3rd start------------------------ */}


<div className=' w-[100vw] flex flex-row gap-x-12 flex-wrap justify-center items-center '  >

<div  className='lg:w-[40%] md:w-[40%] sm:w-[90%] all:w-[90%] py-12 flex flex-col gap-y-10 min-w-[300px]'>

<h1 className='text-4xl text-black font-extrabold text-center'>Watch Others Contributing</h1>

<p className='text-xl text-black text-center'> You can now see who donated food to whom</p>

<div className='flex justify-center items-center'>
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " onClick={()=> {navigate('/connectedPosts')

setClick('Connected Posts')}}>
  Connected posts
</button></div>

</div>
{/* ======================== */}

<div className=' py-12 min-w-[300px] lg:w-[40%] md:w-[40%] sm:w-[90%] all:w-[90%]'>
  <img src="https://ucarecdn.com/c67f35be-a6be-41c6-9545-8daebe0a085a/" alt="picture" className='h-[100%] w-[100%] '/>
</div>




</div>


{/* ---------------------------------------3rd end------------------------ */}




</div>

{/* ------------------------------------mid end---------------------------- */}


{/* ----------------------------------foot 2 start----------------------------------- */}


<div className='bg-[url("https://res.cloudinary.com/dby1pwcbx/image/upload/v1713082457/shaym/hzqmouw5bw0wjnqcaxap.jpg")] w-[100vw] h-[100vh] flex flex-col justify-start items-center py-32 px-6 gap-y-12   bg-cover bg-center bg-no-repeat relative'>

<h1 className='font-extrabold text-white text-6xl'>Food Safety</h1>

<p className='font-semibold text-white text-xl '>We prioritize the safety and quality of the food we distribute.</p>
<p>Your health is our priority.</p>

<div>
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " onClick={()=> {navigate('/signUp')

setClick('Sign Up')}}>
  Join Us
</button></div>

</div>


{/* ----------------------------------foot 2 end----------------------------------- */}


{/* -------------------------------------foot 1 start---------------------------- */}

<div className='w-[100vw] flex   justify-center items-center bg-white'>


<div className='py-24 flex flex-col gap-y-8 '>

<h1 className='text-center font-extrabold text-6xl text-black'>Our Services</h1>

<p className=' text-black text-center opacity-70'>We are committed to reducing food waste and helping those in need.</p>

<div className='flex  flex-wrap w-[100vw] justify-center items-center gap-x-[2.5%] gap-y-10 lg:flex-row md:flex-col sm:flex-col all:flex-col'>




<div className='lg:w-[30%] '>

<h1 className='text-2xl text-center text-black font-semibold'>Food Collection</h1>

<p className='text-center opacity-70 text-green1-dark2'>We collect food left at the end of the day from hotels and restaurants.</p>
</div>


{/* ------------------------------------------------------ */}
<div className='lg:w-[30%] '>

<h1 className='text-center text-2xl text-black font-semibold'>FOOD DISTRIBUTION</h1>

<p className='text-center opacity-70 text-green1-dark2'>We distribute the collected food to hospitals, orphanages, and homeless communities.</p>
</div>
{/* -------------------------------------------------------- */}


<div className='lg:w-[30%] ' >

<h1 className='text-center text-2xl text-black font-semibold'>FOOD DISTRIBUTION</h1>

<p className='text-center opacity-70 text-green1-dark2 '>We distribute the collected food to hospitals, orphanages, and homeless communities.</p>
</div>







</div>

</div>


</div>


{/* --------------------------------------foot 1 end---------------------------------- */}


{/* ----------------------footer------------------------ */}



<div className='  bg-richblack-900 w-[100vw] flex flex-col gap-y-20 py-20'> 
<div className='flex flex-col gap-y-10'>

<h1 className='text-center text-5xl text-white font-semibold'>Join Us in Making a Difference</h1>

<h5 className='text-white text-center'>Your support can help us reach more people in need.</h5>

</div>


<div className='flex flex-col gap-y-2 items-center justify-center'>
<button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " onClick={()=> {navigate('/signUp')

setClick('Sign Up')}}>
  Join Us
</button>

<p className='text-white text-center'>Every contribution counts. Thank you for your support.</p>

</div>



<div className='w-[100vw]  flex flex-wrap justify-evenly items-start '>

<div className='flex justify-normal min-w-[200px] items-center'>
<p className='text-center '>© 2024 Community Cares. All rights reserved.</p>
</div>


{/* ---------------------------------------------------------------- */}

<div className='flex flex-col gap-y-4'>
<h1 className='text-2xl text-white'>Quick Links</h1>

<div className='flex flex-col justify-center  gap-y-4 items-start'>
  
<p className='cursor-pointer' onClick={()=> navigate('/')}>Home</p>

<p className='cursor-pointer' onClick={()=> navigate('/login')}>Login</p>
<p className='cursor-pointer' onClick={()=> navigate('/signUp')}>Sign Up</p>

</div>

</div>



</div>

</div>



{/* --------------------footer end-------------------------------------- */}

{/* -------------------------------------------wrapper end--------------------------- */}


    </div>
  )
}
