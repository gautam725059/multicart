"use client"
import { AnimatePresence, motion } from 'motion/react'
import { FaUser, FaStore, FaUserShield } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { set } from 'mongoose'
import { useRouter } from 'next/navigation'

const EditRoleandPhone = () => {

    const [role, setRole] = useState<string>("")
    const [phone, setPhone] = useState<string>("")


    const roles = [
        { label: "User", icon: <FaUser />, value: "user" },
        { label: "Vendor", icon: <FaStore />, value: "vendor" },
        { label: "Admin", icon: <FaUserShield />, value: "admin" },
    ];
    const [loading, setLoading] = useState(false)
    const [adminExists, setAdminExists] = useState<boolean>(false)
    const router = useRouter();
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await axios.get('/api/admin/check-admin')
                setAdminExists(res.data.exists)
            }
            catch (error) {
                setAdminExists(false)
                console.log('Error checking admin existence:', error)
            }
        }
        checkAdmin()
    }, [])
    const handaleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
       if(!role || !phone){
        alert("Please select a role and enter phone number")
        return;
       }
       setLoading(true);
       try {
        const result = await axios.post('/api/user/edit-role-phone', {
            role,
            phone
        });
        console.log("Role and phone updated:", result.data);
        alert("Role and phone updated successfully")
        setLoading(false);
       } catch (error) {
        console.error("Error updating role and phone:", error);
        setLoading(false);
        router.push("/")
    }
    return (
        <div className="min-h-screen flex items-center 
    justify-center bg-gradient-to-r from-gray-500 via-black
    to-gray-900 text-white p-6">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm bg-white/10
           backdrop-blur-md rounded-3xl shadow-xl p-4 border-white/10" >
                    <h1 className='text-4xl font-semibold text-center mb-4' >choose Your Role</h1>
                    <p className='text-center text-gray-300 mb-8 text-base'>
                        select your role and enter your mobile number to contuinue...
                    </p>
                    <form onSubmit={handaleSubmit} className='flex flex-col gap-8'>
                        <input
                            type='text'
                            placeholder='Enter your mobile number..'
                            maxLength={10}
                            required
                            className='bg-white/10 border border-white/30 rounded-lg p-4
                text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={(e) => setPhone(e.target.value)} value={phone} />

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
                            {
                                roles.map((rol) => {
                                    const isAdminRole = rol.value === "admin" &&
                                        adminExists
                                    return (
                                        <motion.div key={rol.value}
                                            onClick={() => !isAdminRole && setRole(rol.value)}
                                            className={`cursor-pointer p-6 text-center rounded-2xl border transition text-lg font-medium ${role === rol.value
                                                ? "border-blue-500 bg-blue-500/20"
                                                : "border-white/20 hover:bg-white/10"
                                                } ${isAdminRole ? "opacity-50 cursor-not-allowed" : ""
                                                }`}>
                                            <span className="text-3xl block mb-2">{rol.icon}</span>
                                            <span>{rol.label}</span>
                                        </motion.div>
                                    )
                                })
                            }
                        </div>

                    </form>

                </motion.div>
            </AnimatePresence>

        </div>
    )
}
}

export default EditRoleandPhone