import { updateJobQuestions } from '@/Routes/api.routes';
import useHomeStore from '@/store/home.store';
import { useMutation } from '@tanstack/react-query';
export default function useUpdateJobQuestion() {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({ questions }: { questions: string[] }) =>
      updateJobQuestions(jobId, questions),
  });
}
