import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appWrite/auth.js";
import Input from "./Input.jsx";

const SignUp = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const registerUser = async (data) => {
        try {
            setError("");
            const user = await authService.createAccount(data);
            if (!user) {
                setError("Could not create account. Please try again.");
                return;
            }
            navigate("/login");
        } catch (err) {
            console.log("ERROR TO REGISTER USER : : ", err);
            setError("Registration failed. Please check your details.");
        }
    };

    return (
        <div className="mx-auto my-6 flex w-[92%] flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-800/90 p-5 text-white shadow-lg shadow-cyan-900/20 sm:my-8 sm:w-3/4 md:my-10 md:w-1/2 lg:w-1/3">
            <h1 className="my-2 rounded-xl border border-cyan-400/40 px-3 py-1 text-xl font-bold">Sign Up</h1>
            <p className="text-center text-sm text-slate-300">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-cyan-300 transition-all duration-200 hover:underline">
                    Login
                </Link>
            </p>
            <p className="mx-auto mt-2 w-full self-center text-center text-xs text-amber-300 sm:w-4/5">
                Password must contain at least one lower case, one upper case, one number, and one special character.
            </p>
            {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}

            <form className="mt-6 flex w-full flex-col items-center justify-center gap-y-3" onSubmit={handleSubmit(registerUser)}>
                <Input
                    label="Email"
                    ref={ref}
                    type="email"
                    placeholder="Enter your email..."
                    {...register("email", { required: true })}
                />
                <Input
                    label="Password"
                    ref={ref}
                    type="password"
                    placeholder="Enter your password..."
                    {...register("password", {
                        required: true,
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                            message: "Password must be 8-15 chars with upper, lower, number, and special character.",
                        },
                    })}
                />
                <Input
                    label="Name"
                    ref={ref}
                    type="text"
                    placeholder="Enter your name..."
                    {...register("name", { required: true })}
                />
                <button
                    type="submit"
                    className="mt-4 w-full rounded-lg bg-cyan-300 p-2 font-semibold text-slate-900 transition-all duration-200 hover:bg-cyan-200 sm:w-2/3"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
