import authService from "../appWrite/auth.js"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./Input.jsx";
import { use, useRef } from "react";

const SignUp = () => {
    const ref=useRef(null);
    const navigate = useNavigate;
    const { register, handleSubmit } = useForm();

    const registerUser = async (data) => {
        try {
            await authService.createAccount(data);
            // navigate("/login");
        } catch (error) {
            console.log("ERROR TO REGISTER USER : : ", error);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <h3>Sign Up</h3>
            <p>already have an account?
                <Link to="/login" className="text-blue-500
             font-medium transition-all duration-200
            hover:underline hover:-translate-y-0.5">Login</Link>
            </p>
            <form action="" className="mt-8" onSubmit={handleSubmit(registerUser)}>
                <Input label="Email" ref={ref} type="email" placeholder="Enter your email..."
                    {...register("email", {
                        required: true,
                    })} />
                <Input label="Password" ref={ref} type="password" placeholder="Enter your password..."
                    {...register("password", {
                        required: true,
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
                            message:
                                "Password must be 8–15 chars, include upper, lower, number & special character",
                        },
                    })} />
                <Input label="Name" ref={ref} type="text" placeholder="Enter your name..."
                    {...register("name", {
                        required: true,
                    })} />
                <button type="submit" className="w-full 
              text-black font-medium rounded-lg m-2 
            transition-all duration-200
            ">Sign Up</button>
            </form>

        </div>
    )
}

export default SignUp;