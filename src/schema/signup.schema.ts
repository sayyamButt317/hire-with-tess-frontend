import {z} from "zod"

export const SignupformSchema= z.object({
    firstname: z.string().min(3,{message:"write descriptive message"}),
    lastname: z.string().min(1,{message:'write Job Title here'}),
    organization: z.string().min(1,{message:"Write Job Type here"}),
    email: z.string().min(2,{message:"Company name here"}),
    password:z.string().min(3,{message:'enter valid location'}),
    confirmpassword:z.string().min(1,{message:"must be a valid salary"})
})

export type FormValidator = z.infer<typeof SignupformSchema>;