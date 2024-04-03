import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';



export const ViewProfile = ({setChange}) => {
  const {user}=useContext(AppContext);
  // console.log(user)

const navigate=useNavigate()


  return (
    <div className=' flex flex-col gap-y-6'>
        
        <div>
          <img className='rounded-full h-20 w-20' src={user.profileUrl} alt="Profile picture" />
        </div>

       <div className='flex gap-x-4'>
       <div onClick={()=> navigate('/userPosts')}>Your Posts</div>
        <div onClick={()=> navigate('/userConnectedPosts')}>Posts Connected To You</div>
       </div>

        <div>
    <p>  Name : {user.firstName} {user.lastName}</p>
    <p>Email : {user.email}</p>
       <p>Contact Number : {user.phoneNo}</p>
    <p>Address : {user.address}</p>
    <p>District : {user.district}</p>
    <p>Role : {user.role}</p>
        </div>


<button onClick={()=>setChange((prev)=> prev=prev+1)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Edit Profile
</span>
</button>
    </div>
  )
}
