import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import React from "react";

function Login() {
  return (
    <div className="h-[100vh] flex justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-[70vw] lg:w-[30vw] xl:w-[34vw] xxl:w-[22vw] m-auto px-4 py-5 rounded-lg flex flex-col gap-1 justify-center shadow-xl"
      >
        <motion.h2
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl font-semibold text-center mb-2"
        >
          Register Here
        </motion.h2>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Label htmlFor="email" className="flex items-center mb-2">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Label>
          <Input placeholder="Enter Email" type="email" />
          <p className="ps-1 text-red-500">email is correct</p>
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
          <Input placeholder="Enter Password" type="password" />
          <p className="ps-1 text-red-500">password is correct</p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button className="bg-gray-800 w-full text-white hover:bg-black">
            Login
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
