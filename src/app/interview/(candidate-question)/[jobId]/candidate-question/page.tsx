"use client";
import { useState } from "react";
import Stepper from "../../../component/stepper";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { Timer } from "@/components/ui/timer";
import useHomeStore from "@/store/home.store";
import FetchQuestions from "@/hooks/FetchQuestions.hook";
import SpeechRecordingInput from "@/app/interview/component/SpeechToTextInput";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateInterviewQuestions() {

  const params = useParams();
  const jobId = params?.jobId as string | undefined;

  const { data } = FetchQuestions(jobId);
  const router = useRouter();


  const totalSteps = data?.questions.length;
  const [currentStep, setCurrentStep] = useState(1);

  const handleSaveAndContinue = () => {
    const nextIndex = currentStep;
    if (nextIndex < totalSteps) {
      router.push(`/interview/${jobId}/candidate-question/${nextIndex + 1}`);
    } else {
      toast("You have completed all the questions!");
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-center items-center justify-center text-[30px] mt-6 font-normal text-black leading-[28px] font-spaceGrotesk sm:font-spaceGrotesk sm:font-normal">
        Hirewithtess
      </h1>
      {/* <Timer seconds={time} /> */}
      <div className="flex justify-between items-center my-10 w-3xl ">
        {!data?.questions ? <Skeleton className="w-full h-10 px-4" /> :
          <Stepper currentStep={currentStep} totalSteps={totalSteps} circleSize={40} lineHeight={4} lineWidth={50} />
        }
      </div>

      <div className="mb-6 flex flex-col items-center sm:items-start sm:text-left text-center gap-0.5 w-10/12">
        
          {!data?.questions ? (
            <Skeleton className="w-sm h-6" />
          ) : (
            `Question ${currentStep}`
          )}
        
        <h2 className="text-lg font-bold mb-8">{data?.questions[currentStep - 1]}</h2>
        <SpeechRecordingInput onSaveAndContinue={handleSaveAndContinue} />
      </div>
    </div>
  );
}

