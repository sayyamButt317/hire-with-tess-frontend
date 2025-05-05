'use client';
import { BriefcaseBusiness, Eye, Users } from 'lucide-react';
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

  const { data: jobdata } = UseDashboardJobCardStats();
  const { data: CandidateTableData } = UseGetAllJob();
  console.log('Interview Candidate Table Data:', CandidateTableData);

  const DATA = [
    [
      <Eye key={CandidateTableData?.id} className="w-5 h-5 text-gray-600" />,
      CandidateTableData?.job_title,
      <Badge key={'status'} className="bg-tess-green/10 text-tess-green">
        {CandidateTableData?.status}
      </Badge>,
      CandidateTableData?.shortlisted,
      CandidateTableData?.shortlisted_rate,
      CandidateTableData?.job_type,
      CandidateTableData?.created_at,
      CandidateTableData?.expiry_date,
    ],
  ];

  return (
    <div>
         <h1 className="text-2xl font-open-sans font-semibold ml-2 mb-4">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <CardComponent
          heading="Total Job "
          subheading={jobdata?.total_jobs}
            icon={<Users className="text-tess-orange"/>}
        ></CardComponent>
        <CardComponent
          heading="New Job"
          subheading={jobdata?.active_jobs}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} className="text-tess-orange" />}
        ></CardComponent>

        <CardComponent
          heading="Close Job"
          subheading={jobdata?.closed_jobs}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} className="text-tess-orange" />}
        ></CardComponent>
        <CardComponent
          heading="Total Candidates"
          subheading={jobdata?.total_candidates}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} className="text-tess-orange" />}
        ></CardComponent>
      </div>
      <div className="mt-10">
      <h1 className="font-roboto text-2xl font-bold leading-[30px] mb-4">
        Jobs
        </h1>
        <Searchbar />

        <TableComponent
          header={TITLE}
          subheader={DATA}
          paginationstart={CandidateTableData?.current_page}
          paginationend={CandidateTableData?.total}
        />
      </div>
    </div>
  );
}
