'use client';
import CustomInputForm from '@/app/interview/component/customformInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import InputBox from '@/app/employer/(dashboard)/components/fieldbox';
import Waveform from '@/app/interview/component/Waveform';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserProfile() {
  const url = `blob:http://localhost:3000/2f833c2c-5118-4175-afa5-87dd844087ea`;
  return (
    <div>
      <div className="flex flex-row w-full gap-4 p-4 mt-4">
        <Avatar className="w-50 h-50">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Card className="w-3xl h-40">
          <CardTitle className="text-[18px] font-bold font-[roboto] pl-4">
            Candidate Details
          </CardTitle>
          <CardContent className="flex flex-row text-[#505050] justify-between ">
            <div className="flex flex-col text-[14px] font-[roboto] font-bold gap-2">
              <h1>Name</h1>
              <h1>Interview Status</h1>
              <h1>AI Rating</h1>
            </div>
            <div className="flex flex-col text-[#505050] text-[14px] font-[open Sans] gap-2">
              <h1>Name</h1>
              <h1>Interview Status</h1>
              <h1>AI Rating</h1>
            </div>
            <div className="flex flex-col text-[14px] font-[roboto] font-bold gap-2">
              <h1>Job Applied For</h1>
              <h1>Interview Date</h1>
            </div>
            <div className="flex flex-col  text-[#505050] text-[14px] font-[open Sans] gap-2">
              <h1>Job Applied For</h1>
              <h1>Interview Date</h1>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4 items-center justify-center">
          <Button
            variant="default"
            className="w-50 bg-[#1E4B8E] hover:bg-[#1E4B8E] cursor-pointer h-[50px] text-white"
          >
            Hire{' '}
          </Button>
          <Button
            variant="default"
            className="w-50 bg-[#F55141] hover:bg-[#F55141] cursor-pointer h-[50px] text-white"
          >
            Reject
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h1 className="font-[roboto] text-[20px] font-semibold leading-2">
          Ai Powered Questions:
        </h1>
      </div>
      <div className="mt-4 p-4">
        <InputBox label={'Question 1'}>
          <p className="w-full text-[openSans] font-normal text-[14px]">
            Describe a challenging problem you&apos;ve solved at work. What was your
            approach and the result?
          </p>
          <div className="rounded-full p-3 border mt-6 w-full">
            <div className="flex items-center gap-2 w-full">
              recordedVoiceURL
              <Waveform
                recordedVoiceURL={url}
                // seconds={seconds}
              />
            </div>
          </div>
        </InputBox>
      </div>
    </div>
  );
}
