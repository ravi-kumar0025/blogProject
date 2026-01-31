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
        <div className="flex items-center justify-center border-2 border-white mt-20 my-20
        sm:w-1/2 md:w-1/3 text-white rounded-2xl flex-col mx-auto bg-gray-700 p-2">
            <h1 className="my-2 border p-1 px-2 font-bold text-xl rounded-xl ">Sign Up</h1>
            <p>Already have an account?
                <Link to="/login" className="text-blue-500
             font-medium transition-all duration-200
            hover:underline hover:-translate-y-0.5">Login</Link>
            </p>
            <p className="text-xs self-center text-red-400 mx-auto w-4/5">password must contain atleast one lower case,atleast one upper case,atleast one number,atleast
                one special character
            </p>
            <form action="" className="mt-8 gap-y-3 flex flex-col justify-center items-center" onSubmit={handleSubmit(registerUser)}>
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
                                "Password must be 8–15 chars, include upper, lower, number & special character,min length 8",
                        },
                    })} />
                <Input label="Name" ref={ref} type="text" placeholder="Enter your name..."
                    {...register("name", {
                        required: true,
                    })} />
                <button type="submit" className="
              text-black font-medium rounded-lg m-2  p-1
            transition-all duration-400 bg-blue-500 w-1/2 hover:border-cyan-600 border-2
            ">Sign Up</button>
            </form>

        </div>
    )
}

export default SignUp;