"use client";
import { useSignIn } from "@/services/actions/auth.actions";
import {
    signInDefaultValues,
    signInSchema,
    SignInSchema,
} from "@/types/schema/signInSchema";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./element/FormInput";

const SignInForm = () => {
    const form = useForm<SignInSchema>({
        defaultValues: signInDefaultValues,
        resolver: zodResolver(signInSchema),
    });

    const signInMutation = useSignIn();

    const onSubmit: SubmitHandler<SignInSchema> = (data) => {
        signInMutation.mutate(data);
    };

    return (
        <FormProvider {...form}>
            <form
                className="w-full max-w-96 space-y-5 rounded-md border px-10 py-12"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="text-center">
                    <h2 className="mb-1 text-2xl font-semibold">Welcome Back</h2>
                    <p className="text-muted-foreground text-sm">
                        Sign in to your account
                    </p>
                </div>

                <div className="space-y-3">
                    <FormInput<SignInSchema> name="email" label="Email" />
                    <FormInput<SignInSchema>
                        name="password"
                        label="Password"
                        type="password"
                    />
                </div>

                <Button className="w-full" isLoading={signInMutation.isPending}>
                    Sign In
                </Button>

                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="text-primary font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </FormProvider>
    );
};

export { SignInForm };