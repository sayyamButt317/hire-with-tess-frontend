import { z } from "zod";

export const signupFormSchema = z.object({
    firstname: z.string().min(3, { message: "First name must be at least 3 characters long." }),
    lastname: z.string().min(1, { message: "Last name is required." }),
    organization: z.string().min(1, { message: "Please enter your organization name." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
    confirmpassword: z.string().min(6, { message: "Confirm password must match the password." })
}).refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match.",
    path: ["confirmpassword"]
});

export type SignupFormValidator = z.infer<typeof signupFormSchema>;
