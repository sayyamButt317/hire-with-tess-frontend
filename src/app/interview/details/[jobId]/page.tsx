'use client'
import InterviewLayout from "@/components/layout/InterviewLayout";
import { Card } from "@/components/ui/card";
import { FormField, FormItem } from "@/components/ui/form";
import CustomInputForm from "@/app/interview/component/customformInput";
import React, { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CandidateDetailSchema, CandidateDetailsValidator } from "@/schema/CandidateDetail.schema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";  
import { useParams } from 'next/navigation';  

export default function CandidatesDetails() {
  const { jobId } = useParams();
  const router = useRouter(); 

  const form = useForm<CandidateDetailsValidator>({
    resolver: zodResolver(CandidateDetailSchema),
    defaultValues: {
      candidate_name: "",
      email: "",
      phone: "",
      image: "", 
    },
  });

  const onSubmit = async (data: CandidateDetailsValidator) => {
    console.log(data);
    router.push(`/interview/candidate-question`);
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
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormItem>
              )}
            />
          </Card>
        </div>

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
                  placeholder="Email"
                />
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <CustomInputForm
                  {...field}
                  label="Phone Number"
                  placeholder="Phone Number"
                />
              )}
            />
          
            <Button
              type="submit"
              className="w-full sm:w-[381px] h-[64px] leading-[20px] font-roboto cursor-pointer rounded-2xl max-w-[90%]"
            >
              Start Interview
            </Button>
          </form>
        </div>
      </FormProvider>
    </InterviewLayout>
  );
}