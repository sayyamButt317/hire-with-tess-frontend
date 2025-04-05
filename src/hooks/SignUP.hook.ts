import { useMutation } from "@tanstack/react-query";
import { SignUp } from "@/Routes/api.routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuthStore from "@/store/authToken.store";

export default function useSignupMutation() {
    const router = useRouter();
    const { setAccessToken } = useAuthStore();

    return useMutation({
        mutationFn: SignUp,
        onSuccess: async (response) => {
            if (response?.access_token) {
                setAccessToken(response.access_token);
                toast.success("Signup successful!");
                router.push("/interview/generatelink");
            } else {
                toast("Signup failed");
            }
        },
        onError: async (error) => {
            console.error("Signup Error:", error.message || "An error occurred during signup.");
            toast.error("Signup Failed", {
                description: error.message || "An error occurred during signup.",
            });
        },
    });
}
