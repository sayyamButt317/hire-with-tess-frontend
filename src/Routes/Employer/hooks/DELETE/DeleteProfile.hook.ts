import { useMutation } from "@tanstack/react-query";
import { DeleteProfile } from "../../Api/employer.route";
import { toast } from "sonner";

export default function(){
    return useMutation({
        mutationFn:DeleteProfile,
        onSuccess:()=>{
            toast.success('Profile deleted successfully');
            
        },
        onError:(error)=>{
            toast.error('Unable to delete profile');
            console.log(error)
        }
    })
}