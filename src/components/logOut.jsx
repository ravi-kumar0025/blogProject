import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from "../store/slice.js";
import { useNavigate } from 'react-router-dom';
import auth from "../appWrite/auth.js"

const logOut = () => {
    const useDispatch=useDispatch();

    const handleLogOut=async()=>{
        try {
           auth.logOut()
           .then(disPatch(logout()))
           .then(console.log("USER LOGED OUT AND REDIRECTING TO LOGIN PAGE"))
        } catch (error) {
            console.log("ERROR TO LOGOUT IN COMPONENT : : ",error);
        }
    }

  return (
    <button
    className='bg-indigo-600 hover:not-focus:bg-indigo-700'>LogOut</button>
  )
}

export default logOut
