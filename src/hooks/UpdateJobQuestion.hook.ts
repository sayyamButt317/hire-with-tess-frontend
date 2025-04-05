import { updateJobQuestions } from "@/Routes/api.routes";
import useHomeStore from "@/store/home.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateJobQuestion() {
    const { jobId } = useHomeStore();

    return useMutation({
        mutationFn: ({ questions }: { questions: string[] }) => 
            updateJobQuestions(jobId, questions), 


        onError: (error) => {
            toast.error("Error updating question: " + error.message);
        },
    });
}
