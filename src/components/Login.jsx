import { useState, createRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import authService from "../appWrite/auth";
import { login } from "../store/slice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
function Login() {
    const ref = createRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const loginUser = async (data) => {
        setError("");
        try {
            const user = await authService.getUser();
            if (user) {
                dispatch(login({ userData: user }));
                navigate("/");
                return;
            }
            const res = await authService.login(
                data.email, data.password);
            if (!res) {
                setError("Wrong email or password.");
                return;
            }
            const userData = await authService.getUser();
            if (userData) {
                dispatch(login({ userData }));
                navigate("/");
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            setError(err.message || "Login failed");
        }
    }

    return (
        <div className="mx-auto my-6 w-[92%] sm:my-8 sm:w-3/4 md:my-10 md:w-1/2 lg:w-1/3">
            <div className="mx-auto w-full rounded-2xl border border-white/10 bg-slate-800/90 p-5 text-white shadow-lg shadow-cyan-900/20 sm:p-6">
                <h1 className="mb-3 text-center text-2xl font-bold">Login</h1>
                <p className="text-center text-sm text-slate-300">Don't have an account? <Link to="/signup"
                    className="font-semibold text-cyan-300 transition-all duration-200 hover:underline">Register</Link></p>
                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

                <form action="" onSubmit={handleSubmit(loginUser)} className="mt-6 flex flex-col gap-y-3">
                    <Input label="Email" ref={ref} type="email" placeholder="Enter your email..."
                        {...register("email", { required: true })} />
                    <Input label="Password" ref={ref} type="password" placeholder="Enter your password..."
                        {...register("password", { required: true })} />
                    <button type="submit" className="mt-4 w-full self-center rounded-lg bg-cyan-300 py-2 font-semibold text-slate-900
            transition-all duration-200 hover:bg-cyan-200 sm:w-2/3
            ">Login</button>
                </form>

            </div>
        </div>
    )
}
export default Login;
