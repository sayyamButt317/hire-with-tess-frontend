import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const CandidateDetailSchema = z.object({
    job_id: z.string().min(1, "Job ID is required"),
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
        candidate_name : z.string().min(3, { message: "Please provide your User name." }),
    email: z
        .string()
        .min(1, { message: "Email field has to be filled." })
        .email("This is not a valid email."),
    phone: z
    .string()
    .min(11,{message:"Telephone field has to be filled"})
    .regex(phoneRegex, 'Invalid Number!'),

});

export type CandidateDetailsValidator = z.infer<typeof CandidateDetailSchema>;