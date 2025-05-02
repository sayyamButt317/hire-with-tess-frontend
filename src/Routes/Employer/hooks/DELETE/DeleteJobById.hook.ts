import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteJobByID } from "../../Api/employer.route";
import { toast } from "sonner";
import { UserJobResponse } from "@/Types/userJob";

export default function UseDeleteJobByID() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (job_id: string) => DeleteJobByID(job_id),
        onSuccess: async (job_id: string) => {
            toast.success('Job deleted successfully');
            queryClient.setQueryData(['userjobid'], (data: UserJobResponse[]) => {
                return data.filter((job: UserJobResponse) => job._id !== job_id)
            })
             // Refetch to ensure data is in sync
             queryClient.invalidateQueries({ queryKey: ['userjobid'] })
        },
        onError: (error) => {
        toast.error("Unable to delete")
        console.log(error)
        }
    })
}