import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';



export const ViewProfile = ({setChange}) => {
  const {user}=useContext(AppContext);
  // console.log(user)

const navigate=useNavigate()


  return (
    <div className=' flex flex-col gap-y-6 items-center justify-center'>
        
        <div>
          <img className='rounded-full  h-52 w-52' src={user.profileUrl} alt="Profile picture" />
        </div>

       <div className='flex gap-x-4'>
       <div className='border-2 p-2 bg-slate-400 border-black rounded-lg' onClick={()=> navigate('/userPosts')}>Your Posts</div>
        <div className='border-2 p-2 bg-slate-400 border-black rounded-lg' onClick={()=> navigate('/userConnectedPosts')}>Posts Connected To You</div>

<div className='border-2 p-2 bg-slate-400 border-black rounded-lg' onClick={()=> navigate('/createPosts')}>Create New Post</div>

       </div>

        <div className='flex flex-col items-center justify-center gap-y-4'>
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
  )
}
