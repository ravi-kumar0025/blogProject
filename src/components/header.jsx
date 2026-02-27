import LogOut from './logOut.jsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Header({hidden}) {
    const authStatus = useSelector((state) => state.auth.status)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Contact", slug: "/contact", active: true },
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
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="inline-flex items-center justify-center rounded-md p-2 text-slate-100 hover:bg-white/10 md:hidden"
                        aria-label="Toggle navigation menu"
                    >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                    <ul className={`${isMenuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-[72px] mx-2 flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/95 p-3 md:static md:mx-0 md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <NavLink
                                    to={item.slug}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block rounded-lg px-3 py-1.5 text-sm font-medium transition ${
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
