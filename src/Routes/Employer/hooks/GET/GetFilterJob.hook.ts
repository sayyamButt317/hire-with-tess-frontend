import { useQuery } from "@tanstack/react-query";
import { FilteredJob } from "../../Api/employer.route";

export default function UseGetFilteredJob() {
    return useQuery({
        queryKey: ['filteredjob'],
        queryFn: () => FilteredJob()
    })
}