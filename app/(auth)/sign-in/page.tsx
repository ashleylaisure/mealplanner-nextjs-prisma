import { SignInForm } from '@/components/forms/SignInForm'
import { auth } from '@/lib/auth'

import { Role } from '@prisma/client'

import { redirect } from 'next/navigation'
import React from 'react'

const SignInPage = async () => {
    const session = await auth()

    if(session?.user?.role === Role.ADMIN)
        redirect("/admin/foods-management/foods")
    if(session?.user?.role === Role.USER)
        redirect("/client")

    return (
        <div className="flex min-h-screen items-center justify-center">
            <SignInForm />
        </div>
    )
}

export default SignInPage