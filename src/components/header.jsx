import LogOut from './logOut.jsx'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Header({hidden}) {
    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus, },
        { name: "Signup", slug: "/signup", active: !authStatus, },
        { name: "All Posts", slug: "/all-posts", active: authStatus, },
        { name: "Add Post", slug: "/add-post", active: authStatus, },
    ]

    return (
        <header
            className={`z-50 fixed top-0 right-0 left-0
        transition-transform duration-300
        ${hidden ? "-translate-y-full" : ""}`}
        >
            <nav className="mx-auto mt-2 w-[96%] max-w-6xl rounded-2xl border border-white/10 bg-slate-900/85 px-4 py-3 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                    <NavLink to="/" className="text-lg font-bold tracking-wide text-cyan-300">
                        BlogSphere
                    </NavLink>
                    <ul className="flex items-center flex-wrap gap-2">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <NavLink
                                    to={item.slug}
                                    className={({ isActive }) =>
                                        `rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                                            isActive
                                                ? "bg-cyan-400 text-slate-900"
                                                : "text-slate-100 hover:bg-white/10"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null
                    )}

                    {authStatus && (
                        <li className="rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-400 transition">
                            <LogOut />
                        </li>
                    )}
                </ul>
                </div>
            </nav>
        </header>
    )

}

export default Header
