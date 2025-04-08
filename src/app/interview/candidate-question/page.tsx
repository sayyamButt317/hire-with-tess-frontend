"use client";
import { useState } from "react";
import Stepper from "../component/stepper";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { Timer } from "@/components/ui/timer";
import useHomeStore from "@/store/home.store";
import FetchQuestions from "@/hooks/FetchQuestions.hook";
import SpeechRecordingInput from "@/components/interview/SpeechToTextInput";

export default function CandidateInterviewQuestions() {
    const job = useHomeStore();
    console.log("jobId", job)
    // const {data} = FetchQuestions(jobId);
    // console.log("data", data)
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [time, setTime] = useState(32 * 60 + 10);

  const questions = [
    "Describe a challenging problem you've solved at work. What was your approach and the result?",
    "Can you describe a time when you had to solve a challenging problem at work? What was your approach, and the result?",
    "Tell me about a time you demonstrated leadership skills in a difficult situation.",
  ];

  return (
    <div className=" min-h-screen flex flex-col items-center p-6">
      <h1 className="text-center items-center justify-center text-[30px] mt-6 font-normal text-black leading-[28px] font-spaceGrotesk sm:font-spaceGrotesk sm:font-normal">
        Hirewithtess
      </h1>
      <div className="flex justify-between items-center my-10 w-full">
        <Stepper currentStep={currentStep} totalSteps={totalSteps} />
        {/* <Timer seconds={time} /> */}
      </div>
      <div className="mb-6 flex flex-col items-center sm:items-start sm:text-left text-center gap-0.5 w-10/12">
        <p className="text-sm text-gray-500 mb-2">{`Question ${currentStep}`}</p>
        <h2 className="text-lg font-bold mb-8">{questions[currentStep - 1]}</h2>
        {/* <textarea
        // value={editedRes}
        // onChange={(e) => setEditedRes(e.target.value)}
        placeholder="Your response will appear here as you speak. Make sure to speak clearly for the best transcription..."
        className="w-full p-2 border rounded-md h-40 resize-none font-normal font-openSans  text-[14px] leading-[24px] mt-15"
      /> */}
        <SpeechRecordingInput onSaveAndContinue={() => {}} />

      </div>

      <div className="flex justify-center mt-4">
        {/* <Button className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-0 flex items-center justify-center shadow-md">
          <Mic className="text-white" size={30} />
        </Button> */}
      </div>
    </div>
  );
}
