import { auth } from "@/auth";
import connectDb from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {
        connectDb();
        const { phone, role } = await req.json();
        const session = await auth();
        const user = await User.findOneAndUpdate({
            email: session?.user?.email
        }, { phone, role }, { new: true })
        if (!user) {
            return NextResponse.json({ message: "User not found" },
                { status: 404 })
        }
        return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Error editing role and phone: "
                + error
        }, { status: 500 })
    }

}