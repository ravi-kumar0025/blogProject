import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="right-0 left-0 bg-linear-to-t from-slate-900
        flex via-slate-800 to-slate-900 text-slate-300 min-w-screen justify-evenly">
            <div className="@container p-1 flex md:flex-row items-center flex-col w-full justify-evenly gap-y-3">
                {/* Brand */}
                <div className="p-4 md:w-1/3 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold text-white tracking-tight">
                        raviKumar
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-center text-slate-400">
                        Building clean, simple, and meaningful digital experiences.
                        Crafted with care, curiosity, and a love for good UI.
                    </p>
                </div>

                <div className="flex w-full md:w-1/3 @3xs:justify-evenly flex-col @3xs:flex-row justify-center items-center gap-y-2">
                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                            Company
                        </h3>
                        <ul className="space-y-0.5 text-sm">
                            <li><Link className="hover:text-white transition" to="/">Features</Link></li>
                            <li><Link className="hover:text-white transition" to="/">Pricing</Link></li>
                            <li><Link className="hover:text-white transition" to="/">Careers</Link></li>
                            <li><Link className="hover:text-white transition" to="/">Press</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                            Support
                        </h3>
                        <ul className="space-y-0.5 text-sm">
                            <li><Link className="hover:text-white transition" to="/">Help Center</Link></li>
                            <li><Link className="hover:text-white transition" to="/">Contact</Link></li>
                            <li><Link className="hover:text-white transition" to="/">Status</Link></li>
                            <li><Link className="hover:text-white transition" to="/">Community</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                            Legal
                        </h3>
                        <ul className="space-y-0.5 text-sm">
                            <li><Link className="hover:text-white transition" to="/">Privacy</Link></li>
                            <li><Link className="hover:text-white transition" to="/">Terms</Link></li>
                            <li><Link className="hover:text-white transition" to="/">Licenses</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className=" items-center justify-around gap-4 text-sm 
                text-slate-400 flex flex-col p-2 m-2 md:w-1/3">
                    <p>
                        © {new Date().getFullYear()} rKumar. All rights reserved.
                    </p>
                    <p className="italic">
                        Made with ❤️, patience, and late-night debugging.
                    </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer