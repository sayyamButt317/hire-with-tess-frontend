import { updateJobDetails } from "@/Routes/api.routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useStore from "@/store/home.store";  

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  const { jobId } = useStore(); 

  return useMutation({
    mutationFn: ({ data }: { data: any }) => 
      updateJobDetails(jobId, data),

    onSuccess: () => {
      toast.success("Job details updated successfully", {
        position: "bottom-right",
      });

      queryClient.invalidateQueries(["jobs"]); 
    },

    onError: () => {
      toast.error("Failed to update job details", {
        position: "bottom-right",
      });
    },
  });
};
