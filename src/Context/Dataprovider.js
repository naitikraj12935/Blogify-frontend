import React from 'react'
import { createContext,useState } from 'react'
export const DataContext=createContext(null);

export default function Dataprovider({children}) {

    const [paccount,setpaccount]=useState({userName:'',name:''})
   
  return (
   <DataContext.Provider value={{
    paccount,
    setpaccount
   }}>
     {children}
   </DataContext.Provider>
  )
}
