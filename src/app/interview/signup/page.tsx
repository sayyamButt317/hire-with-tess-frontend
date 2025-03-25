import InterviewLayout from "@/components/layout/InterviewLayout";
import { Button } from "@/components/ui/button";
import SignupForm from "../component/signupform";

export default function Signup() {
    return (
        <InterviewLayout
            subtitle="Sign Up to Share Your AI-Generated Interview"
            description="Get started with a 60-day free trial - no credit required!"
        >
            <div className="w-full">
                <SignupForm />
                <div className="flex justify-center mt-8">
                {/* <Button className="w-80 bg-transparent text-black hover:bg-transparent border-2 border-solid border-gray-500 flex items-center justify-center gap-2">
                <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
                {buttonText}
            </Button> */}
                    <Button className="w-60"  type="submit">
                        Sign Up with Google
                    </Button>
    </div>
            </div>
        </InterviewLayout>
    )
}