import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export const UpdateProfile = ({setChange}) => {
  const {user}=useContext(AppContext)
console.log(user)
  return (
    <div  >
        
        



        {/* ///--------last k buttons----------- */}
        <div>

        <button onClick={()=>setChange((prev)=> prev=prev-1)}  class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">



<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Save
</span>
</button>



<button onClick={()=>setChange((prev)=> prev=prev-1)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Cancel
</span>
</button>


    </div>


    {/* //container end */}
    </div>
  )
}
