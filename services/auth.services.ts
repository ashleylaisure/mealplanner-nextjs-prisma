'use server'

import { executeAction } from "@/lib/executeAction"
import { signUpSchema, SignUpSchema } from "@/types/schema/signUpSchema"
import { hashPassword } from "@/lib/utils";
import db from "@/lib/prisma";
import { signInSchema, SignInSchema } from "@/types/schema/signInSchema";
import { signIn as nextAuthSignIn, signOut as authSignOut } from "@/lib/auth";

const signUp = async (data: SignUpSchema) => {
    await executeAction({
        actionFn: async() => {
            const validatedData = signUpSchema.parse(data)
            const hashedPassword = await hashPassword(validatedData.password)

            await db.user.create({
                data: {
                    name: validatedData.name,
                    email: validatedData.email,
                    password: hashedPassword,
                    role: "USER",
                }
            })
        }
    })
}

const signIn = async (data: SignInSchema) => {
    await executeAction({
        actionFn: async () => {
        const validatedData = signInSchema.parse(data);
        await nextAuthSignIn("credentials", validatedData);
        },
    });
};

const signOut = () => {
    return executeAction({
        actionFn: authSignOut,
    });
};

export { signUp, signIn, signOut };