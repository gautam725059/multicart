import { auth } from '@/auth'
import EditRoleandPhone from '@/component/EditRoleandPhone'
import connectDb from '@/lib/connectDB'
import User from '@/model/user.model'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Home() {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect('/login')
  }
  const inComplete = !user.role || !user.phone || (user.role as string === "user" && !user.phone);
  if (inComplete) {
    return <EditRoleandPhone />
  }
  return (
    <div>

    </div>
  )
}