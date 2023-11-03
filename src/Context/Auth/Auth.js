import { AuthContext } from "./AuthContext";
import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

export default function Auth({ children }) {
  const [token, setToken] = useState({status: false})
  const [admin, setAdmin] = useState(null)

  const credential = localStorage.getItem('token')

  useEffect(()=>{
    let currentTimestamp = Math.floor(Date.now() / 1000);
    if(currentTimestamp > admin?.expire) {
      setToken({status: false})
      localStorage.removeItem('token')
    }
  },[setToken, admin])
  
  useEffect(()=>{
    if(credential){
      setAdmin(jwtDecode(credential))
      setToken({status: true, credential})
    } else {
      setToken({status: false})
    }
  }, [credential])

  return (
    <AuthContext.Provider value={{token, setToken, admin, setAdmin}}>
        { children }
    </AuthContext.Provider>
  )
}
