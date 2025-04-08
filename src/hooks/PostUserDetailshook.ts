import { UserDetails } from "@/Routes/api.routes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useHomeStore from "@/store/home.store";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function AddUserDetailsHook() {
  const router = useRouter();
  const { setJobId } = useHomeStore();

  return useMutation({
    mutationFn: UserDetails,
    onSuccess: async (data) => {
      if (data?.id) {
        setJobId(data.id);
        router.push(`/interview/candidate-question?interview_id=${data.id}`);
      } else {
        toast("Invalid Details");
      }
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      console.error(
        "Interview detail Error:",
        axiosError?.response?.data?.detail ||
          "An error occurred during Interview Start."
      );

      toast.error("Interview Failed", {
        description:
          axiosError.response?.data?.detail ||
          "An error occurred during Interview.",
      });
    },
  });
}
