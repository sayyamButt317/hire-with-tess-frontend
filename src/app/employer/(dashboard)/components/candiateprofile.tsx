import Waveform from "@/app/interview/component/Waveform";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import InputBox from "./fieldbox";
import { Button } from "@/components/ui/button";

export default function UserProfile({ data }: { data: any }) {
  if (!data) return null;

  const answers = data.answers;
  const questions = Object.keys(answers || {});
  const url = answers?.[questions[0]]?.recorded_url || ''; 

  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full gap-4 p-4 mt-4">
        <Avatar className="w-24 h-24 lg:w-50 lg:h-50 self-center lg:self-start">
          {data.image_url ? (
            <AvatarImage src={data.image_url} alt={data.candidate_name} />
          ) : (
            <AvatarFallback>{data.candidate_name?.[0] || 'C'}</AvatarFallback>
          )}
        </Avatar>

        <Card className="w-full lg:w-3xl h-auto lg:h-50">
          <CardTitle className="text-[18px] font-bold font-[roboto] pl-4 pt-2">
            Candidate Details
          </CardTitle>
          <CardContent className="flex flex-col md:flex-row text-[#505050] justify-between gap-4">
            <div className="flex flex-col text-[14px] font-[roboto] font-bold gap-2">
              <h1>Name</h1>
              <h1>Interview Status</h1>
              <h1>AI Rating</h1>
            </div>
            <div className="flex flex-col text-[#505050] text-[14px] font-[open Sans] gap-2">
              <h1>{data.candidate_name}</h1>
              <h1>{data.status}</h1>
              <h1>81%</h1>
            </div>
            <div className="flex flex-col text-[14px] font-[roboto] font-bold gap-2">
              <h1>Job Applied For</h1>
              <h1>Interview Date</h1>
            </div>
            <div className="flex flex-col text-[#505050] text-[14px] font-[open Sans] gap-2">
              <h1>{data.job_title}</h1>
              <h1>{new Date(data.created_at).toLocaleDateString()}</h1>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-row lg:flex-col gap-4 items-center justify-center">
          <Button className="w-full lg:w-50 bg-[#1E4B8E] hover:bg-[#1E4B8E] cursor-pointer h-[50px] text-white">
            Hire
          </Button>
          <Button className="w-full lg:w-50 bg-[#F55141] hover:bg-[#F55141] cursor-pointer h-[50px] text-white">
            Reject
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h1 className="font-[roboto] text-[20px] font-semibold leading-2">
          AI Powered Questions:
        </h1>
      </div>

      <div className="mt-4 p-4 space-y-4">
        {questions.map((question, index) => (
          <InputBox key={index} label={`Question ${index + 1}`}>
            <p className="w-full font-normal text-[14px]">{question}</p>
            <div className="rounded-full p-3 border mt-6 w-full">
              <div className="flex items-center gap-2 w-full">
                {answers[question]?.recorded_url && (
                  <Waveform recordedVoiceURL={answers[question].recorded_url} />
                )}
              </div>
            </div>
          </InputBox>
        ))}
      </div>
    </div>
  );
}
