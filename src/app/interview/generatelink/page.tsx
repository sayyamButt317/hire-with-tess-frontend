'use client'
import InterviewLayout from "@/components/layout/InterviewLayout";
import useStore from "@/store/home.store";
import {Input} from "@/components/ui/input";

export default function GenerateLink(){
    const data = useStore();
    console.log(data);
    return(
        <InterviewLayout

            subtitle="Your AI Interview is Ready!"
            description="Share the Interview link with candidates and start collecting responses"
            subtitleClassName="font-roboto font-bold text-[34px] mt-6"
            descriptionClassName="font-roboto font-normal text-[18px] mt-4 text-[#6F6C90]"
            currentStep={4}


        >
           <div>
               <div className="mt-8">
                   <h1 className="font-roboto text-[24px] font-bold">Interview Link</h1>
               </div>

               <p className='font-normal text-[16px] '>Copy and share the ink with Candidates</p>
               <div className="items-center max-w-[483px] mx-auto mt-8">
                   <Input
                       className=""></Input>
               </div>

           </div>

        </InterviewLayout>
    )
}