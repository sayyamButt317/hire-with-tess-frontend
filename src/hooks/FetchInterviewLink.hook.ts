import { GenerateInterviewLink } from '@/Routes/Client/Api/api.routes';
import { useQuery } from '@tanstack/react-query';
import useHomeStore from '@/store/Employee/home.store';
import EmployeeAuthStore from '@/store/Employee/auth.store';

export default function useFetchInterviewLink() {
  const job_id = useHomeStore((state) => state.jobId);
  const { accessToken } = EmployeeAuthStore();

  return useQuery({
    queryKey: ['jobDetails', job_id],
    queryFn: () => GenerateInterviewLink(job_id),
    staleTime: 10000,
    retry: 2,
    enabled: !!job_id && !!accessToken,
  });
}

