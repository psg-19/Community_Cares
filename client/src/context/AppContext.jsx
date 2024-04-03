import { createContext, useEffect } from "react";
import { useState } from "react";




export const AppContext=createContext();


export default function AppContextProvider({children}){

const [isLogged,setIsLogged]=useState(false);
const[token1,setToken1]=useState('')
const [user,setUser]=useState({})

const [donorPosts,setDonorPosts]=useState('')

const value={
    isLogged,setIsLogged,
    user,setUser,
    token1,setToken1,
    donorPosts,setDonorPosts
    
   
}
return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}


