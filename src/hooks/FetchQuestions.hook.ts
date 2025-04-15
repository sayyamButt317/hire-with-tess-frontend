import { useQuery } from '@tanstack/react-query';
import { GetQuestionById } from '@/Routes/api.routes';

export default function FetchQuestions(jobId?: string) {
  return useQuery({
    queryKey: ['questions', jobId],
    queryFn: () => GetQuestionById(jobId!),
    enabled: !!jobId,
  });
}
