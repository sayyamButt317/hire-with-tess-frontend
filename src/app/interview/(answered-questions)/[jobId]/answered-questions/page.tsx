'use client';
import CustomInputForm from "@/app/interview/component/customformInput";
import InterviewLayout from "@/components/layout/InterviewLayout";
import FetchQuestions from "@/hooks/FetchQuestions.hook";
import { useParams } from "next/navigation";
import {Button} from "@/components/ui/button";
export default function AnsweredQuestionList() {

  const params = useParams();
  const jobId = params?.jobId as string | undefined;

  const { data } = FetchQuestions(jobId);
  console.log(data)

  return (
    <>
    <InterviewLayout useCard={false}
      showStepper={false}
      subtitle="Question Completed"
      description="Great Job,Your responses ave been recorded successfully">
      <div>
        <div className="flex font-[roboto] text-[24px] font-semibold">Interview Question</div>
      </div>
      {data?.questions.map((item: string, index: number) => (
        <div key={index} className="mb-4 p-4 border rounded-md shadow">
          <div className="flex font-[open Sans] text-[14px] font-normal">
            {item}
          </div>
        </div>
      ))}
         <Button>Save and Finish</Button>
    </InterviewLayout>
    <div className="flex flex-col item-center justify-center mt-10">
      
      <div className="flex flex-col text-center">
      <h1 className="font-[roboto] text-[#170F49] text-[34px] leading-[34px] font-bold">Help Us Improve Your Experience</h1>
      <p className="text-[#6F6C90] font-[roboto] text-[18px] font-normal leading-[30px] mt-4">Share your feedback on the interview process to help us enhance future experiences.</p>
      </div>

     <div className="flex flex-col text-center">
     <p className="font-[open sans] font-normal text-[18px] leading-[30px] text-[#6F6C90]">Share Your Experience Though Expressions </p>
     </div>
    </div>
</>
   
  );
}
