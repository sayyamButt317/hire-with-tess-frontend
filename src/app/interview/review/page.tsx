"use client";
import { useSearchParams } from "next/navigation";
import useStore from "@/store/home.store";
import InterviewLayout from "@/components/layout/InterviewLayout";
import CustomForm from "../component/customform";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import OutputCard from "../component/outputCard";
import Question from "../component/question";
import FetchJobDetails from "@/hooks/FetchJobDetails.hook";
import FetchQuestions from "@/hooks/FetchQuestions.hook";

export default function InterviewReview() {
    const searchParams = useSearchParams();
    const storeJobId = useStore((state) => state.jobId);
    const jobId = searchParams.get("job_id") || storeJobId;

    // Fetch job details
    const jobDetailsQuery = FetchJobDetails(jobId);
    const responseData = jobDetailsQuery.data || {};    
    console.log(responseData)

    // Fetch AI-generated questions
    const questionQuery = FetchQuestions(jobId);
    const questions = questionQuery.data || [];

    return (
        <InterviewLayout
            subtitle="Review Your AI-Generated Interview"
            description="Take a final look before sharing it with candidates. You can edit or regenerate questions if needed."
            showStepper={true}
            currentStep={3}
        >
            <div className="w-full p-6">
                <CustomForm />

                {/* Display Job Requirements, Responsibilities, and Skills */}
                <Card className="mt-4 mx-6 p-4 relative">
                    <OutputCard
                        req={responseData.requirements || []}
                        res={responseData.responsibilities || []}
                        skill={responseData.skills || []}
                    />
                </Card>

                {/* Display AI-generated questions */}
                <Question questions={questions} />

                {/* Navigation Buttons */}
                <div className="flex float-right gap-2 mt-4">
                    <Button variant="secondary">Back</Button>
                    <Link href="/interview/signup">
                        <Button className="w-40" type="submit">
                            Sign up to Continue
                        </Button>
                    </Link>
                </div>
            </div>
        </InterviewLayout>
    );
}
