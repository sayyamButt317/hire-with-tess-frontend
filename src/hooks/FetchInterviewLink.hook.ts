import {GenerateInterviewLink} from "@/Routes/api.routes";
import { useQuery } from "@tanstack/react-query";
import useHomeStore from "@/store/home.store";
import useAuthStore from "@/store/authToken.store";

export default function useFetchInterviewLink() {
    const job_id = useHomeStore((state) => state.jobId);
    const { accessToken } = useAuthStore();

    return useQuery({
        queryKey: ["jobDetails", job_id],
        queryFn: async () => {
            if (!job_id) throw new Error("No job ID provided");
            if (!accessToken) throw new Error("No access token available");

            return GenerateInterviewLink(job_id);
        },
        enabled: !!job_id && !!accessToken,
    });
}
