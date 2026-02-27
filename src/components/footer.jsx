function Footer() {
    return (
        <footer className="right-0 left-0 mt-8 flex min-w-screen justify-evenly bg-linear-to-t from-slate-900 via-slate-800 to-slate-900 text-slate-300">
            <div className="@container flex w-full flex-col items-center justify-evenly gap-y-3 p-1 md:flex-row">
                <div className="flex flex-col items-center p-4 md:w-1/2">
                    <h2 className="text-2xl font-semibold tracking-tight text-white">raviKumar</h2>
                    <p className="mt-4 max-w-md text-center text-sm leading-relaxed text-slate-400">
                        Building clean, simple, and meaningful digital experiences.
                        Crafted with care, curiosity, and a love for good UI.
                    </p>
                </div>

                <div className="m-2 flex flex-col items-center justify-around gap-4 p-2 text-sm text-slate-400 md:w-1/2">
                    <p>Copyright {new Date().getFullYear()} rKumar. All rights reserved.</p>
                    <p className="italic">Made with care, patience, and late-night debugging.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
