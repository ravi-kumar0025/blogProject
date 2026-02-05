import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import { useDispatch } from "react-redux";
import authService  from "./appWrite/auth.js";
import {login,logout } from "./store/slice"

function App() {
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const dispatch=useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authService.getUser();
            if (user) {
                dispatch(login(user));
            } else {
                dispatch(logout());
            }
        };
    
        checkAuth();
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let accumulated = 0;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;
            accumulated += delta;
            if (accumulated > 60 && currentScrollY > 80) {
                setHideHeader(true);
                accumulated = 0;
            }
            if (accumulated < -60) {
                setHideHeader(false);
                accumulated = 0;
            }
            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    
    return (
        <div className="min-h-screen flex flex-col">
            <Header hidden={hideHeader} />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
