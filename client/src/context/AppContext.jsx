import { createContext, useEffect } from "react";
import { useState } from "react";




export const AppContext=createContext();


export default function AppContextProvider({children}){

const [isLogged,setIsLogged]=useState(true);
const[token1,setToken1]=useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFheXVzaGd1cHRhNDc0N0BnbWFpbC5jb20iLCJfaWQiOiI2NjA1NzUyYWFkOTNlMjBjNWNkNWE0NGIiLCJyb2xlIjoiRG9ub3IiLCJkaXN0cmljdCI6IlVqamFpbiIsImlhdCI6MTcxMTgxODg0NywiZXhwIjoxNzExODI2MDQ3fQ.RcgoK_FJrJrmnWBmJzEG7iwr0rLC7r28-aTnYxIrda0')
const [user,setUser]=useState({})

const value={
    isLogged,setIsLogged,
    user,setUser,
    token1,setToken1
    
   
}
return <AppContext.Provider value={value}>
    {children}
</AppContext.Provider>
}


