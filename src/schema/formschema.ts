import { z } from "zod";

export const formSchema = z.object({
    jobDescription: z.string().min(3, { message: "Please provide a detailed job description (at least 3 characters)." }),
    jobTitle: z.string().min(1, { message: "Job title is required." }),
    jobType: z.string().min(1, { message: "Please specify the job type (e.g., Full-time, Part-time)." }),
    companyName: z.string().min(2, { message: "Company name must be at least 2 characters long." }),
    location: z.string().min(3, { message: "Please enter a valid location (at least 3 characters)." }),
    salary: z.string().min(1, { message: "Please enter a valid salary amount." })
});

export type FormValidator = z.infer<typeof formSchema>;
