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
        <div className="md:w-1/3 sm:w-1/2 mx-auto m-20 mt-25">
            <div className="mx-auto w-full bg-gray-700  border-2 border-white
        text-white rounded-xl p-8 ">
                <h1 className="text-2xl font-bold mb-5">Login</h1>
                <p>Don't have an account? <Link to="/signup"
                    className="text-blue-500 font-medium transition-all
            duration-200 hover:underline hover:-translate-y-0.5">Register</Link></p>
                {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

                <form action="" onSubmit={handleSubmit(loginUser)} className="mt-8 flex flex-col gap-y-2">
                    <Input label="Email" ref={ref} type="email" placeholder="Enter your email..."
                        {...register("email", { required: true })} />
                    <Input label="Password" ref={ref} type="password" placeholder="Enter your password..."
                        {...register("password", { required: true })} />
                    <button type="submit" className="bg-blue-500 self-center
             font-medium rounded-lg py-2 hover:text-white
            hover:bg-blue-600 transition-all duration-400 mt-5 w-1/2
            ">Login</button>
                </form>

            </div>
        </div>
    )
}
export default Login;