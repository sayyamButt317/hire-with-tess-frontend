import { updateJobDetails } from '@/Routes/api.routes';
import { useMutation } from '@tanstack/react-query';
import useHomeStore from '@/store/home.store';

export const useUpdateJob = () => {
  const { jobId } = useHomeStore();

  return useMutation({
    mutationFn: ({ data }: { data: never }) => updateJobDetails(jobId, data),
  });
};
