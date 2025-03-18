import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRegister } from "@/store/features/auth/user.slice";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import Loader from "@/components/static/Loader";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoading } = useSelector(store => store.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function moveToNext(response) {
    console.log(response)
    if (response.success) {
      toast.success(response.message)
      navigate("/")
    } else {
      toast.error(response)
    }
  }

  function submitHandler(data) {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password
    }
    dispatch(UserRegister({ payload, moveToNext }))
  }

  return (
    <div className="h-[100vh] flex justify-center">
      <Toaster />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[70vw] lg:w-[30vw] xl:w-[34vw] xxl:w-[22vw] m-auto px-4 py-4 rounded-lg flex flex-col gap-3 justify-center shadow-xl"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-xl font-semibold text-center mb-2"
        >
          Register Here
        </motion.h2>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Label htmlFor="username" className="flex items-center mb-2">
            <User className="h-4 w-4 mr-2" />
            Username
          </Label>
          <Input
            placeholder="Enter Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="ps-1 text-red-500">{errors.username.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Label htmlFor="email" className="flex items-center mb-2">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Label>
          <Input
            placeholder="Enter Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="ps-1 text-red-500">{errors.email.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Label htmlFor="password" className="flex items-center mb-2">
            <Lock className="h-4 w-4 mr-2" />
            Password
          </Label>
          <Input
            placeholder="Enter Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="ps-1 text-red-500">{errors.password.message}</p>
          )}
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-2"
        >
          <Button
            className="bg-gray-800 w-full text-white hover:bg-black"
            onClick={handleSubmit(submitHandler)}
            disabled={userLoading}
          >
            {userLoading ? <Loader /> : "Register"}
          </Button>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center text-sm mt-3 font-sm"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Login
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;
