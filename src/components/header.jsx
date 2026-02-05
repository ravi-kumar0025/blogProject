import LogOut from './logOut.jsx'
import "../App.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header({hidden}) {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus, },
        { name: "Signup", slug: "/signup", active: !authStatus, },
        { name: "All Posts", slug: "/all-posts", active: authStatus, },
        { name: "Add Post", slug: "/add-post", active: authStatus, },
    ]

    return (
        <header
            className={` z-50 min-w-screen bg-white/80 backdrop-blur-md shadow-md rounded-2xl
        bg-linear-to-t from-slate-900 via-slate-800 to-slate-900
        mt-1 fixed top-0 right-0 left-0
        transition-transform duration-300
        ${hidden ? "-translate-y-full" : ""} m-2 p-2`}
        >
            <nav className="flex items-center justify-end m-1 border-2 border-white rounded-2xl">
                {/* <button className='self-start text-white'>BG</button> */}
                <ul className="flex items-center flex-wrap gap-1 w-full  sm:w-1/2 md:w-2/5  justify-evenly p-2">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name} className=''>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className=" text-lg  font-medium
                        bg-linear-to-r bg-violet-500 text-white
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