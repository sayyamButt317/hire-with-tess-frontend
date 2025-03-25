import { useQuery } from "@tanstack/react-query";
import { GenerateQuestion } from "@/Routes/api.routes";

export default function FetchQuestions(jobId?: string) {
    return useQuery({
        queryKey: ["questions", jobId],
        queryFn: () => GenerateQuestion(jobId!),
        enabled: !!jobId, 
    });
}
