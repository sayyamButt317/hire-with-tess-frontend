import { updateJobDetails } from "@/Routes/api.routes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useHomeStore from "@/store/home.store";

export const useUpdateJob = () => {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({ data }: { data: any }) =>
      updateJobDetails(jobId, data),

    onError: () => {
      toast.error("Failed to update job details", {
        position: "bottom-right",
      });
    },
  });
};
