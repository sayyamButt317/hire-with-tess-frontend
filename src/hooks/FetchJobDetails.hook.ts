import { useQuery } from "@tanstack/react-query";
import { GetJobDetails } from "@/Routes/api.routes";

export default function FetchJobDetails(jobId?: string) {
    return useQuery({
        queryKey: ["jobDetails", jobId],
        queryFn: () => GetJobDetails(jobId!),
        enabled: !!jobId, 
    });
}
