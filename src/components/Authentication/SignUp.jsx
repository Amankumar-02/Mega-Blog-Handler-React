import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../features/auth/authSlice";
import { Button, Input } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { FaMastodon } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";


    function SignUp (){
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

  const createAccount = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      toast.success("Account created successfully");
      // navigate("/");
      if (userData) {
        const userDetails = await authService.getCurrentUser();

        if (userDetails) {
          dispatch(authLogin({userDetails}));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error);
      toast.error(error);
    }
  };
  const loginOAuth = async () => {
    setError("");
    try {
      const session = await authService.createGoogleLogin();
      if (session) {
        const userData = await authService.getCurrentUser();
        toast.success(`Hey ${userData.name}`);
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error);
    //   console.log(error);
    }
  };
  const loginGuest = async () => {
    setError("");
    try {
      const session = await authService.createGuestLogin();
      if (session) {
        const userData = await authService.getCurrentUser();
        toast.success(`Hey ${userData?.name || "Anonymous Guest"}`);
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error);
    //   console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center overflow-hidden px-4">
      <Toaster />
      <div className="w-full p-6 my-[3rem] mx-auto bg-primary rounded-md border border-gray-400 grid place-content-center shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-secondary flex justify-center gap-1 items-center">
          <FaMastodon /> Mind Mirror
        </h1>
        <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
        </h2>
        <p className=" text-base text-center mt-2 ">
          {" "}
          Already have an Account ?
          <Link
            to="/login"
            className="font-medium  text-secondary , transition-all duration-200 hover:underline"
          >
            {" "}
            Log in
          </Link>
        </p>
        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}

        <form className="space-y-4 mt-8" onSubmit={handleSubmit(createAccount)}>
          <Input
            placeholder="Username"
            type="text"
            label="Username :"
            {...register("name", {
              required: true,
            })}
          ></Input>
          <Input
            placeholder="Email Address"
            type="email"
            label="Email :"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) => {
                  /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) ||
                    "Please enter a valid email address";
                },
              },
            })}
          ></Input>

          <Input
            type="password"
            placeholder="Enter Password"
            label="Password :"
            {...register("password", {
              required: true,
              validate: {
                matchPatern: (value) => {
                  /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/.test(
                    value
                  ) || "Please enter a Strong Password";
                },
              },
            })}
          ></Input>

          <div>
            <Button type="submit" text="Create Account"  className="w-full"/>
          </div>
        </form>
          <div className="flex flex-col gap-4 my-8">
            <h1 className="text-center font-semibold text-blue-600">Other Methods</h1>
            <Button text="Google Login" className="w-full" onClick={loginOAuth}/>
            <Button text="Guest Login" className="w-full" onClick={loginGuest}/>
          </div>
      </div>
    </div>
  );
};

export default SignUp;
