import React from 'react'
import LogOut from './logOut.jsx'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from './box.jsx'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


    return (
        <header className='py-3 shadow bg-gray-500 rounded-3xl my-2'>
            <Box>
                <nav className='flex'>
                    <ul className='flex mx-auto justify-evenly w-full'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={() => navigate(item.slug)}
                                        className='inline-bock px-6 py-2 duration-200 
                                        hover:bg-blue-100 rounded-full'
                                    >{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogOut />
                            </li>
                        )}
                    </ul>
                </nav>
            </Box>
        </header>
    )
}

export default Header