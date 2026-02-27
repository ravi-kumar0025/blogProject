import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from "../store/slice.js";
import { useNavigate } from 'react-router-dom';
import auth from "../appWrite/auth.js"

const LogOut = () => {
    const disPatch=useDispatch();
    const navigate=useNavigate();

    const handleLogOut=async()=>{
        try {
          const status = await auth.logOut();
          if (!status) {
            console.log("LOGOUT FAILED ON SERVER, CLEARNING LOCAL STATE");
          }
          disPatch(logout());
          navigate('/login');
        } catch (error) {
            console.log("ERROR TO LOGOUT IN COMPONENT : : ",error);
            disPatch(logout());
            navigate('/login');
        }
    }

  return (
    <button
    className='cursor-pointer'
    onClick={handleLogOut}>LogOut</button>
  )
}

export default LogOut
