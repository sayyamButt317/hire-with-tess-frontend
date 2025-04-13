import { useMutation } from '@tanstack/react-query';
import { SignUp } from '@/Routes/api.routes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAuthStore from '@/store/authToken.store';
import { AxiosError } from 'axios';

export default function useSignupMutation() {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();

  return useMutation({
    mutationFn: SignUp,
    onSuccess: async (response) => {
      if (response?.access_token) {
        setAccessToken(response.access_token);
        toast.success('Signup successful!');
        router.push(`/interview/generate-link`);
      } else {
        toast('Signup failed');
      }
    },
    onError: async (error) => {
      console.error(
        'Signup Error:',
        (error as AxiosError<{ detail: string }>)?.response?.data?.detail ||
          'An error occurred during signup.',
      );
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error('Signup Failed', {
        description:
          axiosError.response?.data?.detail || 'An error occurred during signup.',
      });
    },
  });
}
