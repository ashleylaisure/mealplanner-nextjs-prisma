
import SignUpForm from '@/components/forms/SignUpForm'
import { auth } from '@/lib/auth'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

const SignUpPage = async () => {
    const session = await auth()

    if(session?.user?.role === Role.ADMIN)
        redirect("/admin/foods-management/foods")
    if(session?.user?.role === Role.USER)
        redirect("/client")

    return (
        <div className="flex min-h-screen items-center justify-center">
            <SignUpForm />
        </div>
    )
}

export default SignUpPage