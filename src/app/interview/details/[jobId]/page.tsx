'use client';
import InterviewLayout from "@/components/layout/InterviewLayout";
import { Card } from "@/components/ui/card";
import { FormField, FormItem } from "@/components/ui/form";
import CustomInputForm from "@/app/interview/component/customformInput";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CandidateDetailSchema,
  CandidateDetailsValidator,
} from "@/schema/CandidateDetail.schema";
import AddUserDetailsHook from "@/hooks/PostUserDetailshook";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CandidatesDetails() {
    const searchParams = useSearchParams();
    const job_id = searchParams.get("job_id") || "";
    console.log(job_id)
  const form = useForm<CandidateDetailsValidator>({
    resolver: zodResolver(CandidateDetailSchema),
    defaultValues: {
    candidate_name : "",
      email: "",
      phone: "",
      image: "", 
    //   job_id: job_id,
    },
  });


//   const UserDetailmutation = AddUserDetailsHook(); 

  const onSubmit = async () => {
    // UserDetailmutation.mutate({
    //     // job_id,
    //     candidate_name: values.candidate_name  || "",
    //   email: values.email || "",
    //   phone: values.phone || "",
    //   image: values.image || "", 
    // });

  };


  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  

  const ref = useRef<HTMLFormElement>(null);

  return (
    <InterviewLayout
      showStepper={false}
      useCard={false}
      subtitle="Fill In Your Details!"
      description="Please fill out your details before starting your Interview"
    >
        <FormProvider {...form}>
      <div>
        <Card className="border-dashed border-[#6F6C90] h-[159px] px-4 items-center justify-center">
        <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await convertToBase64(file);
                      form.setValue("image", base64);
                    }
                  }}
                />
              </FormItem>
            )}
          />
        </Card>
      </div>
      <input type="hidden" value={job_id} {...form.register("job_id")} />

      <div className="mt-8">
      
        <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className="space-y-8 px-4">
          <FormField
            control={form.control}
            name="candidate_name"
            render={({ field }) => (
              <CustomInputForm
                {...field}
            
                label="Your Name"
                placeholder="Name"
              />
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              
                <CustomInputForm
                  {...field}
                  
                  label="Email"
                  placeholder="email"
                />
            
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              
                <CustomInputForm
                  {...field}
                  name="PhoneNumber"
                  label="Phone Number"
                  placeholder="Phone Number"
                  
                />
        
            )}
          />
          
            <Link href={"/interview/candidate-question"}>
            <Button type="submit"
   
   className="w-full sm:w-[381px] h-[64px] leading-[20px] font-roboto cursor-pointer rounded-2xl max-w-[90%]" >
 Start Interview
   </Button></Link>
          

          {/* <Button type="submit"
           disabled={UserDetailmutation.isPending}
          className="w-full sm:w-[381px] h-[64px] leading-[20px] font-roboto cursor-pointer rounded-2xl max-w-[90%]" >
           {UserDetailmutation.isPending ? "Interview Starting.." : "Start Interview"} 
          </Button> */}
        </form>
   
      </div>
      </FormProvider>
    </InterviewLayout>
  );
}
