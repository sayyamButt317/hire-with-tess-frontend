import InterviewLayout from "@/components/layout/InterviewLayout";

export default function CandidateInstructions() {
    return(
        <InterviewLayout
            showStepper={false}
            useCard={false}
            description="Let's get started.Record your response at your own pace and put your best foot! "
            subtitle="Your next opportunity starts here! "
            showTitle={true} >
            <div ></div>
        </InterviewLayout>
    )
}