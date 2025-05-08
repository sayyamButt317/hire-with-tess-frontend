import { useMutation } from '@tanstack/react-query';
import { SubmitInterview } from '@/Routes/Client/Api/api.routes';
import { toast } from 'sonner';
import { SubmitInterviewPayload } from '@/Types/Employer/useresponse';
import { useRouter } from 'next/navigation';

export default function useSubmitInterview() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({
      interview_id,
      data,
    }: {
      interview_id: string;
      data: SubmitInterviewPayload;
    }) => SubmitInterview(interview_id, data),
    onSuccess: () => {
      toast.success('Interview submitted successfully');
      router.push("/interview/finished")
    },
    onError: (error) => {
      console.error('Failed to submit interview', error);
      toast.error('Failed to submit interview');
    },
  });
}
