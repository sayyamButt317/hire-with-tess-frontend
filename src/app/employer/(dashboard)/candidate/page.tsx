'use client';
import { BriefcaseBusiness, Eye, Users } from 'lucide-react';
import CardComponent from '../components/card';
import TableComponent from '../components/table';
import { Badge } from '@/components/ui/badge';
import Searchbar from '../components/searchbar';
import UseDashboardCandidateCardStats from '@/Routes/Employer/hooks/GET/GetCandidateCardstats.hook';
import UseGetAllInterview from '@/Routes/Employer/hooks/GET/GetAllInterview.hook';

export default function CandidatePage() {
  const TITLE = [
    'Action',
    'Name',
    'Job Applied For',
    'Interview Date',
    'Interview Status',
    'Ai Score',
  ];

  const { data: candidatestats } = UseDashboardCandidateCardStats();
  const { data: CandidateTableData } = UseGetAllInterview();
 

  const DATA = CandidateTableData?.items?.map((item: any) => [
      <Eye key={item?.id} className="w-5 h-5 text-tess-gray" />,
      item?.candidate_name,
      item?.job_title,
      item?.created_at,
      <Badge key={'status'} className="bg-tess-green/10 text-tess-green">
        {item?.status}
      </Badge>,
      '81%',
  ]);
  return (
    <div>
      <h1 className="text-2xl font-open-sans font-semibold ml-2 mb-4">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <CardComponent
          heading="Total Candidates"
          subheading={candidatestats?.total_candidates}
          icon={<Users size={20} strokeWidth={1.5} color="#f7941D" />}
        ></CardComponent>
        <CardComponent
          heading="New Candidates"
          subheading={candidatestats?.hired}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        ></CardComponent>

        <CardComponent
          heading="Shortlisted Candidates"
          subheading={candidatestats?.shortlisted}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D"  />}
        ></CardComponent>
        <CardComponent
          heading="Rejected Candidates"
          subheading={candidatestats?.rejected}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} color="#f7941D" />}
        ></CardComponent>
      </div>
      <div className="mt-10">
        <h1 className="font-roboto text-2xl font-bold leading-[30px] mb-4">
          Candidates
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
