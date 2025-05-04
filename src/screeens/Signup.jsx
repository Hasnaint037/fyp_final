import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reset, UserRegister } from "@/store/features/auth/user.slice";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Loader from "@/components/static/Loader";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoading } = useSelector((store) => store.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function moveToNext(response) {
    console.log(response);
    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response);
      dispatch(reset());
    }
  }

  function submitHandler(data) {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(UserRegister({ payload, moveToNext }));
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-teal-500 to-blue-500 p-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl font-bold text-center text-gray-800 mb-6"
        >
          Create an Account
        </motion.h2>

        {/* Username Field */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Label
            htmlFor="username"
            className="flex items-center mb-2 text-gray-700"
          >
            <User className="h-5 w-5 mr-2 text-gray-500" />
            Username
          </Label>
          <Input
            placeholder="Enter Username"
            className="mb-4"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Label
            htmlFor="email"
            className="flex items-center mb-2 text-gray-700"
          >
            <Mail className="h-5 w-5 mr-2 text-gray-500" />
            Email
          </Label>
          <Input
            placeholder="Enter Email"
            type="email"
            className="mb-4"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Label
            htmlFor="password"
            className="flex items-center mb-2 text-gray-700"
          >
            <Lock className="h-5 w-5 mr-2 text-gray-500" />
            Password
          </Label>
          <Input
            placeholder="Enter Password"
            type="password"
            className="mb-4"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </motion.div>

        {/* Register Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-4"
        >
          <Button
            className="bg-teal-600 w-full text-white hover:bg-teal-700"
            onClick={handleSubmit(submitHandler)}
            disabled={userLoading}
          >
            {userLoading ? <Loader /> : "Register"}
          </Button>
        </motion.div>

        {/* Login Link */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-sm mt-3 text-gray-600"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Signup;
