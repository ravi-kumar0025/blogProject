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
        console.log("DATA", data);
        try {
            const user = await authService.getUser();
            if (user) {
                dispatch(login({ userData: user }));
                navigate("/");
                return;
            }
            const res = await authService.login(
            data.email, data.password);
        if (res) {
            const userData = await authService.getUser();
            console.log("USER DATA : : ", userData);
            if (userData) {
                dispatch(login({ userData }));
                navigate("/");
            }
        }
    } catch (err) {
        setError(err.messsage || "Login failed");
    }
}

return (
    <div className="mx-auto w-full max-w-lg 
        bg-gray-100 rounded-xl p-10 border border-black/10">
        <h1 className="text-2xl font-bold mb-5">Login</h1>
        <p>Don't have an account? <Link to="/signup"
            className="text-blue-500 font-medium transition-all
            duration-200 hover:underline hover:-translate-y-0.5">Register</Link></p>
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

        <form action="" onSubmit={handleSubmit(loginUser)} className="mt-8">
            <Input label="Email" ref={ref} type="email" placeholder="Enter your email..."
                {...register("email", { required: true })} />
            <Input label="Password" ref={ref} type="password" placeholder="Enter your password..."
                {...register("password", { required: true })} />
            <button type="submit" className="w-full bg-blue-500
             font-medium rounded-lg
            hover:bg-blue-600 transition-all duration-200
            ">Login</button>
        </form>

    </div>
)
}
export default Login;