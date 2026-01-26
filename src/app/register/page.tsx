"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaUser, FaStore, FaUserShield } from "react-icons/fa";

function Register() {
  const [step, setStep] = useState(1);

  const roles = [
    { label: "User", icon: <FaUser />, value: "user" },
    { label: "Vender", icon: <FaStore />, value: "vender" },
    { label: "Admin", icon: <FaUserShield />, value: "admin" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
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
            <h2 className="text-3xl font-bold mb-4 text-green-400">
              Step 2 – Registration Form
            </h2>
            <p className="text-gray-300 mb-6">
              Yahan tum apna form banayoge (Name, Email, Password, etc.)
            </p>

            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
            >
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Register;
