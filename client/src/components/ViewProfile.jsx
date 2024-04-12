import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import profilebg from '../assets/profile.png'


export const ViewProfile = ({setChange}) => {
  const {user}=useContext(AppContext);
  // console.log(user)

const navigate=useNavigate()


  return (
    <div className=' gap-y-6 bg-green1-light h-[100vh] 
    flex items-center justify-center  pt-16'>
        




{/* -----------shell------------- */}
<div className='bg-white rounded-3xl w-[80%] h-[83%] flex flex-col gap-y-4 px-4 py-2 overflow-x-hidden '>

<h1 className='font-bold flex flex-wrap justify-center mt-8'><b>Your Profile</b></h1>


<div className='flex flex-row flex-wrap justify-center items-center  gap-x-10 gap-y-10 w-[100%] mb-8 divide-x-400 overflow-y-auto no-scrollbar  lg:divide-x md:divide-x sm:divide-x '>



<div className='w-[45%] flex items-center justify-center h-[100%] md:min-h-[500px] lg:min-h-[500px]
 min:w-[200px]  '><img src={profilebg} alt="profilebg" className='w-[100%] h-[100%] lg:w-[150px] ' /></div>




<div className='flex flex-col gap-y-4 items-center justify-center w-[45%] min-w-[200px]'>


<div className='rounded-full bg-gradient-to-r from-red-500 to-indigo-600'>
          <img className='rounded-full p-[3px]  h-48 w-48 ' src={user.profileUrl} alt="Profile picture" />
        </div>
       

     

        <div className='flex flex-col  justify-center gap-y-4'>
    <p> <b> Name :</b> {user.firstName} {user.lastName}</p>
    <p><b>Email :</b> {user.email}</p>
       <p><b>Contact Number :</b> {user.phoneNo}</p>
    <p><b>Address :</b> {user.address}</p>
    <p><b>District :</b> {user.district}</p>
    <p><b>Role : </b>{user.role}</p>
        </div>



<button onClick={()=>setChange((prev)=> prev=prev+1)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Edit Profile
</span>
</button>


</div>


{/* ----------------------img-0p0------------------------ */}
<div className='flex gap-x-4'>
       <div className='border-2 p-2 bg-slate-400 border-black rounded-lg' onClick={()=> navigate('/userPosts')}>Your Posts</div>
        <div className='border-2 p-2 bg-slate-400 border-black rounded-lg' onClick={()=> navigate('/userConnectedPosts')}>Posts Connected To You</div>

<div className='border-2 p-2 bg-slate-400 border-black rounded-lg' onClick={()=> navigate('/createPosts')}>Create New Post</div>

       </div>


</div>

</div>

       
    </div>
  )
}
