import { useQuery } from "@tanstack/react-query";
import { ProfileInfo } from "@/Routes/Employer/Api/employer.route";


export default function UseProfileInfo() {
  return useQuery({
    queryKey: ['profileinfo'],
    queryFn: ProfileInfo,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });
}