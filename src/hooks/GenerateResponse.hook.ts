import { useMutation } from "@tanstack/react-query";
import {GenerateJobDetails} from "@/Routes/api.routes";
import { useRouter } from 'next/navigation';
import useHomeStore from "@/store/home.store";
import { toast } from "sonner";

export default function useGenerateResponse() {
    const router = useRouter();
    const { setJobId } = useHomeStore();

    return useMutation({
        mutationFn: GenerateJobDetails,
        onSuccess: async (data) => {
            if (data?.id) {
                setJobId(data.id);
                router.push(`/interview?job_id=${data.id}`);
            } else {
                toast("Error", {
                    description: "Invalid job data received",
                });
            }
        },
        onError: () => {
            toast("Error", {
                description: "Failed to generate response",
            });
        },
    });
}
