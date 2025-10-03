'use client'
import { SignUpSchema } from "@/types/schema/signUpSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, signOut, signUp } from "../auth.services";
import { toast } from "sonner";
import { SignInSchema } from "@/types/schema/signInSchema";


const useSignUp = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: SignUpSchema) => {
            await signUp(data);
        },
        onSuccess: () => {
            toast.success("Account created successfully! Please log in.");
            router.replace("/sign-in");
        }
    })
}

const useSignIn = () => {
    return useMutation({
        mutationFn: async (data: SignInSchema) => {
            await signIn(data);
        },
    });
};

const useSignOut = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            router.push("/sign-in");
        },
    });
};

export { useSignUp, useSignIn, useSignOut };