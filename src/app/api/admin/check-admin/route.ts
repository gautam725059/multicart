import connectDb from "@/lib/connectDB";
import User from "@/model/user.model";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        await connectDb()
        const admin = await User.findOne({role:"admin"})
        return NextResponse.json({
            exists :!!admin
        })
    } catch (error) {
        return NextResponse.json({
            massage:`check admin error: ${error}`
        },{status:500} )
    }
    
}