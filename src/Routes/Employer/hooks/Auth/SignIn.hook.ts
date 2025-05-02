import { EmployerLogin } from '@/Routes/Employer/Api/employer.route';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EmployeeAuthStore from '@/store/Employee/auth.store';

export default function LoginInMutation() {
  const router = useRouter();
  const { setAccessToken } = EmployeeAuthStore();

  return useMutation({
    mutationFn: EmployerLogin,
    onSuccess: async (data) => {
      if (!data.access_token) return;
      // Save token in localStorage
      // localStorage.setItem('accessToken', data.access_token);

      // Store token in cookies
      document.cookie = `accessToken=${data.access_token}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`;

      // (Optional) still set in Zustand store if you're using it somewhere
      setAccessToken(data.access_token);
      toast.success('SignIn successful!');
      router.push('/employer/home');
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('SignIn Failed', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during signIn.',
      });
    },
  });
}
