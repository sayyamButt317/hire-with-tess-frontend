'use client';
import { BriefcaseBusiness, Eye, Search, Users } from 'lucide-react';
import CardComponent from '../components/card';
import { Badge } from '@/components/ui/badge';
import TableComponent from '../components/table';
import Searchbar from '../components/searchbar';
import UseDashboardJobCardStats from '@/Routes/Employer/hooks/GET/GetJobCardstats.hook';
import UseGetAllJob from '@/Routes/Employer/hooks/GET/GetAllJobs.hook';


export default function JobPosting() {
  const TITLE = [
    'Action',
    'Jobs',
    'Status',
    'Shortlisted',
    'Shortlisted Rate (%)',
    'Job Type',
    'Job Posted Date',
    'Job Expiry Date',
  ];

  const {data:jobdata} = UseDashboardJobCardStats();
  const{data:JobTableData} = UseGetAllJob();
  console.log("All Job Data:", JobTableData)

  const DATA = [
    [
      <Eye key={JobTableData?.id} className="w-5 h-5 text-gray-600" />,
      JobTableData?.job_title,
      <Badge key={'status'} className="bg-green-100 text-green-800">
        {JobTableData?.status}
      </Badge>,
      JobTableData?.shortlisted,
      JobTableData?.shortlisted_rate,
      JobTableData?.job_type,
      JobTableData?.created_at,
      JobTableData?.expiry_date,
    ],
  ];

  return (
    <div>
      <h1 className="text-[24px] font-[open sans] font-semibold ml-2 mb-4">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <CardComponent
          heading="Total Job "
          subheading={jobdata?.total_jobs}
          icon={<Users className="text-[#f7941D]" />}
        ></CardComponent>
        <CardComponent
          heading="New Job"
          subheading={jobdata?.active_jobs}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        ></CardComponent>

        <CardComponent
          heading="Close Job"
          subheading={jobdata?.closed_jobs}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        ></CardComponent>
        <CardComponent
          heading="Total Candidates"
          subheading={jobdata?.total_candidates}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        ></CardComponent>
      </div>
      <div className="mt-10">
        <h1 className="font-[roboto] text-[24px] font-bold leading-[30px] mb-4"> Jobs</h1>
        <Searchbar />

        <TableComponent header={TITLE} subheader={DATA} paginationstart={JobTableData?.current_page} paginationend={JobTableData?.total} />
      </div>
    </div>
  );
}
