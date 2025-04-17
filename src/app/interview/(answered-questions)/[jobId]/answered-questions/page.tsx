'use client';

import { useRecordingStore } from '@/store/Recording.store';
import FetchQuestions from '@/hooks/FetchQuestions.hook';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Waveform from '@/app/interview/component/Waveform';
import { Check, X } from 'lucide-react';
import EmojiRatingSlider from '@/app/interview/component/emojislider';
import { useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function AnsweredQuestionList() {
  const params = useParams();
  const jobId = params?.jobId as string;
  const { data } = FetchQuestions(jobId);
  const storedResponses = useRecordingStore((state) => state.storedResponses);
  const feedback = useRef<HTMLFormElement>(null);

  const onSubmit = async () => {
    console.log(feedback.current);
  };



  const Userresponse = storedResponses.reduce((acc, item) => {
    if (!acc[item.questionId]) {
      acc[item.questionId] = [];
    }
    acc[item.questionId].push(item.response);
    return acc;
  }, {} as Record<string, { transcript: string; type: string; url: string }[]>);

  return (
    <>
      <InterviewLayout
        useCard={false}
        showStepper={false}
        subtitle="Question Completed"
        description="Great job! Your responses have been recorded successfully"
      >
        <div>
          <div className="flex font-[roboto] text-[24px] font-semibold mb-6">Interview Questions</div>

          {data?.questions.map((question: string, index: number) => {
            const questionId = `${jobId}-q${index + 1}`;
            const responses = Userresponse[questionId] || [];
            const hasResponse = responses.length > 0;

            return (
              <div key={index} className="mb-6 p-4 border rounded-md shadow">
                <div className="flex items-center gap-2 font-normal text-[14px] mb-2">
                  {hasResponse ? (
                    <Check className="w-5 h-5 text-[#f7941D]" />
                  ) : (
                    <X className="w-5 h-5 text-[#f7941D]" />
                  )}
                  <span>{question}</span>
                </div>

                {hasResponse ? (
                  responses.map((response, idx) => (
                    <div key={idx} className="mb-4 space-y-2">
                      {response.type === 'audio' && (
                        <div className="rounded-full p-3 border">
                          <Waveform
                            recordedVoiceURL={response.url}
                            seconds={response.transcript.length}
                          />
                        </div>
                      )}
                      {response.type === 'video' && (
                        <div className='items-center justify-center flex p-4'>
                          <video
                            controls
                            width={400}
                            src={response.url}
                            className="z-10 transition-all duration-300 ease-in-out transform group-hover:scale-105 rounded-2xl"
                          />
                        </div>
                      )}
                      {response.type === 'screen' && (
                        <div className='items-center justify-center flex p-4'>
                          <video controls width={400} src={response.url} />
                        </div>
                      )}
                      {response.transcript && (
                        <div className="mt-1 text-sm text-gray-700">
                          <p className="font-medium">📝 Transcript:</p>
                          <p>{response.transcript}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-gray-500 ml-7">No response recorded.</p>
                )}
              </div>
            );
          })}
        </div>

        <Button className="mt-4">Save and Finish</Button>
      </InterviewLayout>


      <div className="flex flex-col items-center justify-center mt-10 text-center">
        <h1 className="font-[roboto] text-[#170F49] text-[34px] leading-[34px] font-bold">
          Help Us Improve Your Experience
        </h1>
        <p className="text-[#6F6C90] font-[roboto] text-[18px] font-normal leading-[30px] mt-4">
          Share your feedback on the interview process to help us enhance future experiences.
        </p>
        <p className="font-[open sans] font-normal text-[18px] leading-[30px] text-[#6F6C90] mt-10">
          Share Your Experience Through Expressions
        </p>

        <EmojiRatingSlider />

        <div className='items-center justify-center flex mt-4'>
          <Textarea placeholder='What is the main reason for Your rating? (Optional)' className=' w-xl h-40 rounded-xl' />
        </div>
        <Button onClick={onSubmit} className="mt-6 ">
          Submit Feedback
        </Button>
      </div>
    </>
  );
}