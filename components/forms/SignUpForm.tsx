import { useSignUp } from '@/services/actions/auth.actions'
import { signUpDefaultValues, signUpSchema, SignUpSchema } from '@/types/schema/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import FormInput from './controlled/FormInput'
import { Button } from '../ui/button'
import Link from 'next/link'

const SignUpForm = () => {
    const form = useForm<SignUpSchema>({
        defaultValues: signUpDefaultValues,
        resolver: zodResolver(signUpSchema)
    })

    const signUpMutation = useSignUp()

    const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
        signUpMutation.mutate(data)
    }

    return (
        <FormProvider {...form}>
            <form
                className="w-full max-w-96 space-y-5 rounded-md border px-10 py-12"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="text-center">
                    <h2 className="mb-1 text-2xl font-semibold">Create Account</h2>
                    <p className="text-muted-foreground text-sm">Sign up to get Started</p>
                </div>

                <div className="space-y-3">
                    <FormInput<SignUpSchema> name="name" label="Full Name" />
                    <FormInput<SignUpSchema> name="email" label="Email" />
                    <FormInput<SignUpSchema> 
                        name="password" 
                        label="Password"
                        type="password" 
                    />
                    <FormInput<SignUpSchema> 
                        name="confirmPassword" 
                        label="Confirm Password"
                        type="password" 
                    />
                </div>

                <Button className="w-full" isLoading={signUpMutation.isPending}> Sign Up</Button>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-primary font-medium hover:underline">Sign in</Link>
                </div>
            </form>
        </FormProvider>
    )
}

export default SignUpForm