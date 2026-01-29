import LogOut from './logOut.jsx'
import "../App.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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


    // return (
    //     <header className='z-50 bg-white/80 backdrop-blur-md
    //     shadow-md rounded-2xl mx-4 mt-3  items-center h-12 p-2'>
    //         <nav className='px-6 py-4 flex items-center'>
    //             <ul className='flex flex-wrap justify-end items-center gap-4 text-end py-4'>
    //                 {navItems.map((item) =>
    //                     item.active ? (
    //                         <li key={item.name}>
    //                             <button onClick={() => navigate(item.slug)}
    //                                 className=' px-6 py-2 text-lg font-medium text-white
    //                                 bg-linear-to-r from-blue-600 to-blue-500
    //                                 rounded-xl shadow-md
    //                                 transform transition-all duration-300
    //                                 hover:-translate-y-1 hover:shadow-xl
    //                                 hover:from-blue-700 hover:to-blue-600
    //                                 active:translate-y-0'
    //                             >{item.name}</button>
    //                         </li>
    //                     ) : null
    //                 )}
    //                 {authStatus && (
    //                     <li>
    //                         <LogOut />
    //                     </li>
    //                 )}
    //             </ul>
    //         </nav>
    //     </header>
    // )

    return (
        <header className=" z-50 bg-white/80 backdrop-blur-md shadow-md rounded-2xl bg-linear-to-t from-slate-900 via-slate-800 to-slate-900  mt-1 fixed top-0 right-0 left-0 ">
            <nav className="flex items-center justify-end m-1">
                <ul className="flex items-center flex-wrap gap-1 w-full  sm:w-1/2 md:w-1/3  justify-evenly p-2">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name} className=''>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className=" text-lg  font-medium
                        bg-linear-to-r bg-white text-gray-500
                        rounded-xl shadow-md p-1
                        transition-all duration-300
                        hover:-translate-y-0.5 hover:shadow-xl "
                                >
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    )}

                    {authStatus && (
                        <li className=" text-lg  font-medium
                        bg-linear-to-r bg-white text-gray-500
                        rounded-xl shadow-md p-1
                        transition-all duration-300
                        hover:-translate-y-0.5 hover:shadow-xl ">
                            <LogOut />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )

}

export default Header