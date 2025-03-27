import { useMutation } from "@tanstack/react-query";
import { SignUp } from "@/Routes/api.routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useSignupMutation() {
    const router = useRouter();

    return useMutation({
        mutationFn: SignUp,
        onSuccess: async () => {
            toast.success("Signup successful!");
            router.push("/interview/generatelink");
        },
        onError: async (error) => {
            toast.error("Signup Failed", {
                description: error?.message || "Something went wrong",
            });
        },
    });
}
