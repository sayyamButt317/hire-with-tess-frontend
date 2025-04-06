import InterviewLayout from "@/components/layout/InterviewLayout";

export default function CandidateInstructions() {
    return(
        <InterviewLayout
            useCard={true}
            title="Your next oppurtunity starts here!"
            subtitle="Let's get started.Record your response at your own pace and put your best foot! "
            showTitle={true} >
            <div ></div>
        </InterviewLayout>
    )
}