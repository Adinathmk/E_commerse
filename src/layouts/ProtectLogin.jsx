import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectLogin() {
    const{currentUser}=useAuth()
    if(currentUser){
        return <Navigate to='/'/>
    }
    return <Outlet/>
}

export default ProtectLogin