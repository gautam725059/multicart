"use client"
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { signIn, useSession } from 'next-auth/react';


const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const session = useSession();
  console.log(session.data?.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        alert("Login Failed");
        console.log(result.error);
      } else {
        alert("Login Successful");
        router.push("/");
      }
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Login Failed");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-gray-900
     via-black to-gray-900 text-white p-6">
      <AnimatePresence>
        <motion.div
          key="step2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm text-center bg-white/10 backdrop-blur-md 
            rounded-2xl shadow-2xl p-9 border border-white/20"
        >
          <h1 className="text-2xl font-semibold mb-6 text-gray-100 text-center">
            Welcome Back to <span className="text-blue-600">MultiCart </span>
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">

            <input
              type="email"
              required
              className="bg-white/10 border border-white/30
                 rounded-lg p-3 focus:outline focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)} value={email}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-white/10 border border-white/30
                  rounded-lg p-3 focus:outline focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} value={password}
              />
              <button type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-white transition">
                {showPassword ? <IoEye size={18} /> : <IoMdEyeOff size={18} />}
              </button>
            </div>

            <motion.button
              disabled={loading}
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-3 flex items-center
                  justify-center gap-2 bg-blue-500 hover:bg-blue-600
                 rounded-xl font-medium w-full"
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Login"}
            </motion.button>


            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-gray-600"></div>
              <span className="px-3 text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>

            <motion.button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 py-3 bg-white/10 
                hover:bg-white/20 rounded-xl border border-white/30 transition"
            ><FcGoogle className="w-5 h-5" size={20} />
              <span className="font-medium">Login with Google</span>

            </motion.button>

            <p className=" text-center text-sm text-gray-400 mt-4">
              Don't have an account?{" "}
              <button type="button" onClick={() => router.push("/register")}
                className="text-blue-400 hover:underline">SignUp</button>
            </p>
          </form>

        </motion.div>

      </AnimatePresence>
    </div>
  )
}

export default LoginPage
