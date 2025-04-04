import { updateJobQuestions } from "@/Routes/api.routes";
import useStore from "@/store/home.store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateJobQuestion() {
    const { jobId } = useStore(); 

    return useMutation({
        mutationFn: ({ questions }: { questions: string[] }) => 
            updateJobQuestions(jobId, questions), 

        onSuccess: () => {
            toast.success("Question updated successfully!");
        },

        onError: (error) => {
            toast.error("Error updating question: " + error.message);
        },
    });
}
