import React, { useState } from 'react'
import { UpdateProfile } from '../components/UpdateProfile'
import { ViewProfile } from '../components/ViewProfile'

export const Profile = () => {


    // console.log(user)


    const [change,setChange]=useState(0);
   

  return (


    <div>

{change%2 ==0 ?
(<ViewProfile setChange={setChange}/>):(<UpdateProfile setChange={setChange}/>)
}

    </div>
  )
}
