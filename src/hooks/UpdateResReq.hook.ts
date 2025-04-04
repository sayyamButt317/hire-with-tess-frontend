import { updateResReq } from "@/Routes/api.routes";
import useStore from "@/store/home.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useResReqHook() {
    const { jobId } = useStore(); 

    return useMutation({
        mutationFn: ({
            data
        }: { 
            data: {
                job_description: string;
                job_title: string;
                job_type: string;
                company_name: string;
                location: string;
                salary: string;
                currency: string;
                responsibilities: string[];
                requirements: string[];
                skills: string[];
            };
        }) => updateResReq(jobId, data), 

        onSuccess: () => {
            toast.success("Job details updated successfully!");
        },

        onError: (error) => {
            toast.error("Error updating job details: " + error.message);
        },
    });
}
