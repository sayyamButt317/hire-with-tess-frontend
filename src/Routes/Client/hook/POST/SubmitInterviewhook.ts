import { useMutation } from "@tanstack/react-query";
import { SubmitInterview } from "@/Routes/Client/Api/api.routes";
import { toast } from "sonner";
import { SubmitInterviewPayload } from "@/Types/Employer/useresponse";

export default function useSubmitInterview() {
  return useMutation({
    mutationFn: ({
      interview_id,
      data,
    }: {
      interview_id: string;
      data: SubmitInterviewPayload;
    }) => SubmitInterview(interview_id, data),

    onSuccess: () => {
      toast.success("Interview submitted successfully");
    },
    onError: (error) => {
      console.error("Failed to submit interview", error);
      toast.error("Failed to submit interview");
    },
  });
}
