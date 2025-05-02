'use client';

import { useRecordingStore } from '@/store/candidate/Recording.store';
import FetchQuestions from '@/hooks/FetchQuestions.hook';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Waveform from '@/app/interview/component/Waveform';
import { Check, X } from 'lucide-react';
import EmojiRatingSlider from '@/app/interview/component/emojislider';
import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import useSubmitInterview from '@/Routes/Client/hook/POST/SubmitInterviewhook';
import { SubmitInterviewPayload } from '@/Types/Employer/useresponse';


export default function AnsweredQuestionList() {
  const params = useParams();
  const jobId = params?.jobId as string;

  // Fetch the interview questions based on the jobId
  const { data } = FetchQuestions(jobId);

  // Access interview_id and stored responses from the Zustand store
  const interview_id = useRecordingStore((state) => state.interviewId);
  const storedResponses = useRecordingStore((state) => state.storedResponses);

  // Ref for the feedback form
  const feedback = useRef<HTMLFormElement>(null);

  // Hook for submitting the interview responses
  const { mutate, isLoading, isError } = useSubmitInterview();

  // Function to handle feedback form submission
  const onSubmitFeedback = async () => {
    const form = feedback.current;
    if (form) {
      const formData = new FormData(form);
      const feedbackText = formData.get("feedback");
      console.log("User Feedback:", feedbackText);
    }
  };

  // Function to submit interview responses
  const onSubmitInterview = async () => {
    const { storedResponses, interviewId } = useRecordingStore.getState();
  
    if (!interviewId) {
      console.error("Interview ID is missing!");
      return;
    }

    const questions_data = storedResponses.reduce((acc, item) => {
      const question = item.response.question;
      const url = item.response.url;
      if (question && url) {
        acc[question] = url;
      }
      return acc;
    }, {} as Record<string, string>);
  
    console.log("questions_data", questions_data);
    console.log("Interview ID", interviewId);
  
    mutate({
      interview_id: interviewId,
      data: {
        questions_data,
      },
    });
  };
  

  return (
    <>
      <InterviewLayout
        useCard={false}
        showStepper={false}
        subtitle="Question Completed"
        description="Great job! Your responses have been recorded successfully"
      >
        <div>
          <div className="flex font-[roboto] text-[24px] font-semibold mb-6">
            Interview Questions
          </div>

          {data?.questions.map((question: any, index: number) => {
            const questionId = `${jobId}-Question${index + 1}`;
            const matchedResponse = storedResponses.find(
              (res) => res.questionId === questionId
            );
            const hasResponse = !!matchedResponse;

            return (
              <div key={index} className="mb-6 p-4 border rounded-md shadow">
                <div className="flex items-center gap-2 font-normal text-[14px] mb-2">
                  {hasResponse ? (
                    <Check className="w-5 h-5 text-[#f7941D]" />
                  ) : (
                    <X className="w-5 h-5 text-[#f7941D]" />
                  )}
                  <span>{question?.text}</span>
                </div>

                {hasResponse ? (
                  <div className="mb-4 space-y-2">
                    {matchedResponse.response.type === 'audio' && (
                      <div className="rounded-full p-3 border">
                        <Waveform
                          recordedVoiceURL={matchedResponse.response.url}
                          seconds={matchedResponse.response.transcript?.length || 0}
                        />
                      </div>
                    )}
                    {matchedResponse.response.type === 'video' && (
                      <div className="items-center justify-center flex p-4">
                        <video
                          controls
                          width={400}
                          src={matchedResponse.response.url}
                          className="z-10 transition-all duration-300 ease-in-out transform group-hover:scale-105 rounded-2xl"
                        />
                      </div>
                    )}
                    {matchedResponse.response.type === 'screen' && (
                      <div className="items-center justify-center flex p-4">
                        <video
                          controls
                          width={400}
                          src={matchedResponse.response.url}
                        />
                      </div>
                    )}
                    {matchedResponse.response.transcript && (
                      <div className="mt-1 text-sm text-gray-700">
                        <p className="font-medium">Transcript:</p>
                        <p>{matchedResponse.response.transcript}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm italic text-gray-500 ml-7">
                    No response recorded.
                  </p>
                )}
              </div>
            );
          })}
          {isError && (
            <p className="text-red-500 text-sm mt-2">
              Something went wrong, please try again.
            </p>
          )}
        </div>

        <Button onClick={onSubmitInterview} className="mt-4" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Save and Finish"}
        </Button>

      </InterviewLayout>

      <div className="flex flex-col items-center justify-center mt-10 text-center">
        <h1 className="font-[roboto] text-[#170F49] text-[34px] leading-[34px] font-bold">
          Help Us Improve Your Experience
        </h1>
        <p className="text-[#6F6C90] font-[roboto] text-[18px] font-normal leading-[30px] mt-4">
          Share your feedback on the interview process to help us enhance future
          experiences.
        </p>

        <EmojiRatingSlider />

        <div className="items-center justify-center flex mt-4">
          <Textarea
            name="feedback"
            placeholder="What is the main reason for Your rating? (Optional)"
            className="w-xl h-40 rounded-xl"
          />
        </div>
        <Button onClick={onSubmitFeedback} className="mt-6 ">
          Submit Feedback
        </Button>
      </div>
    </>
  );
}
