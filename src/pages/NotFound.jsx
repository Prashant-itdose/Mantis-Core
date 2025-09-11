import React from 'react'
import { Navigate } from 'react-router-dom';
import { useCryptoLocalStorage } from '../utils/hooks/useCryptoLocalStorage';

export default function NotFound() {
    // const token = localStorage.getItem("userData");

const token = useCryptoLocalStorage("user_Data", "get", "token")
   
    return (
        <>
            {token === null ? <Navigate to='/login' replace/> : <Navigate to='/dashboard' replace/>}
        </>
    )
}
