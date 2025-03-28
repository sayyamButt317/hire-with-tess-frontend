"use client";

import useStore from "@/store/home.store";
import InterviewLayout from "@/components/layout/InterviewLayout";
import NoQuestion from "../component/emptycard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GenerateQuestionResponse from "@/hooks/generateQuestiion.hook";
import Question from "../component/question";

export default function Questionnaire() {
  const jobId = useStore((state) => state.jobId);

  const questionMutation = GenerateQuestionResponse();
  const response = questionMutation.data || [];

  const onSubmit = () => {
    if (!jobId) return;
    questionMutation.mutate({ job_id: jobId });
  };

  return (
    <div>
      <InterviewLayout
        showStepper={true}
        currentStep={2}
        showGoogleLogin={false}
        useCard={false}
        description="Review,edit, or regenerate questions before finalizing your interview"
      >
        <div className="flex flex-col w-full h-full items-center text-center space-y-4">
          {response.length > 0 ? (
            <Question questions={response} />
          ) : (
            <NoQuestion
              title="No Questions Available"
              description="Kindly Click on the Generae Button below to generate Interview questions"
            />
          )}

          <div className="mt-auto flex justify-center ">
            {response.length > 0 ? (
              <Button
                onClick={onSubmit}
                className="w-[218px] h-[54px] mt-11 rounded-[45px] cursor-pointer bg-transparent text-black border  hover:border-white hover:text-white "
                disabled={questionMutation.isPending}
              >
                {questionMutation.isPending
                  ? "Regenerating..."
                  : "Regenerate Response"}
              </Button>
            ) : (
              <Button
                className="flex items-center gap-2 w-[201px] h-[45px] mt-11 rounded-[9px]"
                type="button"
                onClick={onSubmit}
                disabled={!jobId || questionMutation.isPending}
              >
                <Image
                  src="/images/Vector.png"
                  alt="alt"
                  width={20}
                  height={20}
                />
                {questionMutation.isPending ? "Generating..." : "Generate"}
              </Button>
            )}
          </div>
        </div>
      </InterviewLayout>

      {response.length > 0 ? (
        <div className="flex justify-end mr-16  sm:justify-end items-center mt-6 mb-4 sm:mr-18 gap-4">
          <Link href="/">
            <Button
              variant={"secondary"}
              className=" sm:w-auto cursor-pointer"
              type="button"
            >
              Cancel
            </Button>
          </Link>
          <Link href="/interview/review">
            <Button
              type="submit"
              disabled={!jobId}
              className="w-full sm:w-auto cursor-pointer"
            >
              Next Step
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-end mr-16  sm:justify-end items-center mt-6 mb-4 sm:mr-18 gap-4"></div>
      )}
    </div>
  );
}
