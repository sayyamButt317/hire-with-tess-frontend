import { GenerateQuestion } from '@/Routes/api.routes';
import { useMutation } from '@tanstack/react-query';

export default function GenerateQuestionResponse() {
  return useMutation({
    mutationFn: ({ job_id }: { job_id: string }) => GenerateQuestion(job_id),
  });
}
