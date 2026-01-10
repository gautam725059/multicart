import connectDb from "@/lib/connectDB";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";




export async function POST(req:NextRequest) {
    try {
       await connectDb();
       const { name, email, password } = await req.json();

       if (!name || !email || !password) {
           return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 });
       }

       const existUser = await User.findOne({ email });
       if (existUser) {
           return NextResponse.json({ message: "User already exists" }, { status: 400 });
       }

       if (password.length < 6) {
           return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
       }

       const hashPassword = await bcrypt.hash(password, 10);
       const newUser = await User.create({ name, email, password: hashPassword });
       return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
         return NextResponse.json({ message: `Register error: ${String(error)}` }, { status: 500 });
        
    }



}