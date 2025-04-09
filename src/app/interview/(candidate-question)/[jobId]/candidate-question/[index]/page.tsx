"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import FetchQuestions from "@/hooks/FetchQuestions.hook";
import Stepper from "@/app/interview/component/stepper";
import SpeechRecordingInput from "@/app/interview/component/SpeechToTextInput";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobId as string | undefined;
  const index = parseInt(params?.index as string, 10); 

  const { data } = FetchQuestions(jobId); 


  const [currentQuestion, setCurrentQuestion] = useState<string | undefined>(data?.questions[index - 1]);
  const [currentStep, setCurrentStep] = useState(index); 

  const totalSteps = data?.questions.length;

  useEffect(() => {
    if (data?.questions && data.questions.length) {
    
      setCurrentQuestion(data.questions[currentStep - 1]);
    }
  }, [data, currentStep]);

  const handleSaveAndContinue = () => {
    const nextIndex = currentStep + 1;

    if (nextIndex <= totalSteps) {
      setCurrentStep(nextIndex);
      setCurrentQuestion(data?.questions[nextIndex - 1]);
      router.push(`/interview/${jobId}/candidate-question/${nextIndex}` );
    } else {
      toast("You have completed all the questions!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-center items-center justify-center text-[30px] mt-6 font-normal text-black leading-[28px] font-spaceGrotesk sm:font-spaceGrotesk sm:font-normal">
        Hirewithtess
      </h1>

      <div className="flex justify-between items-center my-10 w-full">
        <Stepper currentStep={currentStep} totalSteps={totalSteps} circleSize={25} lineHeight={4} lineWidth={50} />
      </div>

      <div className="mb-6 flex flex-col items-center sm:items-start sm:text-left text-center gap-0.5 w-10/12">
        <p className="text-sm text-gray-500 mb-2">{`Question ${currentStep}`}</p>
        <h2 className="text-lg font-bold mb-8">{
        currentQuestion}</h2>
        <SpeechRecordingInput onSaveAndContinue={handleSaveAndContinue} />
      </div>
    </div>
  );
}
