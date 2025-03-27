import {GenerateIntrviewLink} from "@/Routes/api.routes";
import { useQuery } from "@tanstack/react-query";

export default function FetchInterviewLink(job_id?: string){
    return useQuery({
        queryKey: ["jobDetails", job_id],
        queryFn: () => job_id ? GenerateIntrviewLink(job_id) : Promise.reject("No job ID provided"),
        enabled:!!job_id,
    })
}