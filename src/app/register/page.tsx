"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUser, FaStore, FaUserShield } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { ClipLoader } from "react-spinners";

function Register() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      setLoading(false);
      setEmail("");
      setName("");
      setPassword("");
      router.push("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  };


    const roles = [
      { label: "User", icon: <FaUser />, value: "user" },
      { label: "Vender", icon: <FaStore />, value: "vender" },
      { label: "Admin", icon: <FaUserShield />, value: "admin" },
    ];

    return (
      <div className="min-h-screen flex items-center justify-center
     bg-gradient-to-br from-gray-900 via-black to-gray-900
      text-white">
        <AnimatePresence mode="wait">
          {/* Step 1 UI */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg text-center bg-white/10 backdrop-blur-md 
            rounded-2xl shadow-2xl p-10 border border-white/20"
            >
              <h1 className="text-4xl font-bold mb-4 text-blue-400">
                Welcome to MultiCart
              </h1>
              <p className="text-gray-300 mb-6">
                Register with one of the following account types:
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {roles.map((role, index) => (
                  <button
                    key={index}
                    onClick={() => setStep(2)}
                    className="flex flex-col items-center justify-center gap-2 p-4 
                  rounded-xl bg-white/10 hover:bg-blue-500/20 border border-white/20 
                  transition-all duration-300"
                  >
                    <span className="text-2xl text-blue-400">{role.icon}</span>
                    <span className="text-sm font-semibold">{role.label}</span>
                  </button>
                ))}
              </div>

              <motion.button
                onClick={() => setStep(2)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-8 py-3 flex items-center
             justify-center gap-2 bg-blue-500 hover:bg-blue-600
              rounded-xl font-medium w-full"
              >Next< TbPlayerTrackNext /></motion.button>


            </motion.div>
          )}

          {/* Step 2 UI */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-lg text-center bg-white/10 backdrop-blur-md 
            rounded-2xl shadow-2xl p-10 border border-white/20"
            >
              <h1 className="text-2xl font-semibold mb-6 text-blue-400 text-center">
                Create Your Account
              </h1>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  className="bg-white/10 border border-white/30
                 rounded-lg p-3 focus:outline focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)} value={name}
                />
                <input
                  type="email"
                  required
                  className="bg-white/10 border border-white/30
                 rounded-lg p-3 focus:outline focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)} value={email}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="bg-white/10 relative border border-white/30
                 rounded-lg p-3 focus:outline focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)} value={password}
                />


                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-14 top-63 -translate-y-1/2
              text-gray-400 hover:text-white transition">
                  {showPassword ? <IoEye size={18} /> : <IoMdEyeOff size={18} />}
                </button>

                <motion.button
                disabled={loading}
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-8 py-3 flex items-center
                  justify-center gap-2 bg-blue-500 hover:bg-blue-600
                 rounded-xl font-medium w-full"
                >
                  {loading ? <ClipLoader size={20} color="white" /> : "Register Now"}
                </motion.button>


                <div className="flex items-center my-3">
                  <div className="flex-1 h-px bg-gray-600"></div>
                  <span className="px-3 text-sm text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-600"></div>
                </div>

                <motion.button

                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-3 py-3 bg-white/10 
                hover:bg-white/20 rounded-xl border border-white/30 transition"
                ><FcGoogle className="w-5 h-5" size={20} />
                  <span className="font-medium">Continue with Google</span>

                </motion.button>

                <p className=" text-center text-sm text-gray-400 mt-4">
                  Already have an account?{" "}
                  <a onClick={() => router.push("/login")} className="text-blue-400 hover:underline">Login Here</a>
                </p>
              </form>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  export default Register;
