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
  const { data: JobPostedTableData } = UseGetAllJob();
  console.log('Job Posting Table Data:', JobPostedTableData);

  const DATA = 
  (JobPostedTableData?.items || []).map((item: any) => [
    <Eye key={item?.id} className="w-5 h-5 text-gray-600" />,
    item?.job_title,
    <Badge key={'status'} className="bg-tess-green/10 text-tess-green">
      {item?.status}
    </Badge>,
    item?.shortlisted_stats?.shortlisted,
    item?.shortlisted_stats?.shortlist_ratio,
    item?.job_type,
    item?.created_at,
    item?.expiry_date,
  ]);

  return (
    <div>
      <h1 className="text-2xl font-open-sans font-semibold ml-2 mb-4">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <CardComponent
          heading="Total Job"
          subheading={jobdata?.total_jobs}
          icon={<Users color="#f7941D" size={20} strokeWidth={1.5} />}
        />
        <CardComponent
          heading="New Job"
          subheading={jobdata?.active_jobs}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        />
        <CardComponent
          heading="Close Job"
          subheading={jobdata?.closed_jobs}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        />
        <CardComponent
          heading="Total Candidates"
          subheading={jobdata?.total_candidates}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        />
      </div>
      <div className="mt-10">
        <h1 className="font-roboto text-2xl font-bold leading-[30px] mb-4">
          Jobs
        </h1>
        <Searchbar />
        <TableComponent
          header={TITLE}
          subheader={DATA}
          paginationstart={JobPostedTableData?.current_page}
          paginationend={JobPostedTableData?.total}
        />
      </div>
    </div>
  );
}
