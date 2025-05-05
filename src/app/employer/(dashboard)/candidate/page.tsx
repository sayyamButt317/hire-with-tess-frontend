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
    'Status',
    'Ai Score',
  ];

  const { data: candidatestats } = UseDashboardCandidateCardStats();
  const { data: CandidateTableData } = UseGetAllInterview();
  console.log('Interview Candidate Table Data:', CandidateTableData);
  const DATA = [
    [
      <Eye key={CandidateTableData?.id} className="w-5 h-5 text-tess-gray" />,
      CandidateTableData?.candidate_name,
      CandidateTableData?.job_title,
      CandidateTableData?.created_at,
      <Badge key={'status'} className="bg-tess-green/10 text-tess-green">
        {CandidateTableData?.status}
      </Badge>,
      '81%',
    ],
  ];
  return (
    <div>
      <h1 className="text-2xl font-open-sans font-semibold ml-2 mb-4">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <CardComponent
          heading="Total Candidates"
          subheading={candidatestats?.total_candidates}
          icon={<Users className="text-tess-orange" />}
        ></CardComponent>
        <CardComponent
          heading="New Candidates"
          subheading={candidatestats?.hired}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} className="text-tess-orange" />}
        ></CardComponent>

        <CardComponent
          heading="Shortlisted Candidates"
          subheading={candidatestats?.shortlisted}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} className="text-tess-orange" />}
        ></CardComponent>
        <CardComponent
          heading="Rejected Candidates"
          subheading={candidatestats?.rejected}
          icon={<BriefcaseBusiness size={20} strokeWidth={1.5} className="text-tess-orange" />}
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
