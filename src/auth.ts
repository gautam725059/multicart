import User from "./model/user.model"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/connectDB"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials, request) {
                await connectDb()
                const email = credentials.email as string
                const password = credentials.password as string

                const user = await User.findOne({ email })
                if (!user) {
                    throw new Error("user is not fond")
                }
                if (!user.password) {
                    throw new Error("user has no password set")
                }
                const isMatched = await bcrypt.compare(password, user.password)
                if (!isMatched) {
                    throw new Error("password is not matched")
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }

        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,

        })
    ],
    callbacks: {

        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await connectDb()
                let DBUser = await User.findOne({ email: user.email })
                if (!DBUser) {
                    DBUser = await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: "user",

                    })

                }
                user.id = DBUser._id.toString()
                user.role = DBUser.role
            }
            return true
        },




        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as "user" | "vendor" | "admin";
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60, // 10 days
    },
    secret: process.env.AUTH_SECRET,
})