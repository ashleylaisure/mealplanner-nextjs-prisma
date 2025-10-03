import { passwordSchema, requiredStringSchema } from "@/lib/zodSchemas";
import z from "zod";

const signUpSchema = z.object({
    name: requiredStringSchema,
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string().max(255),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type SignUpSchema = z.infer<typeof signUpSchema>;

const signUpDefaultValues: SignUpSchema = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export { signUpSchema, signUpDefaultValues, type SignUpSchema };