'use client';
import InterviewLayout from '@/components/layout/InterviewLayout';
import { Card } from '@/components/ui/card';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import CustomInputForm from '@/app/interview/component/customformInput';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CandidateDetailSchema,
  CandidateDetailsValidator,
} from '@/schema/CandidateDetail.schema';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';

export default function CandidatesDetails() {
  const { jobId } = useParams();
  const router = useRouter();

  const form = useForm<CandidateDetailsValidator>({
    resolver: zodResolver(CandidateDetailSchema),
    defaultValues: {
      candidate_name: '',
      email: '',
      phone: '',
      image: null,
    },
  });

  const onSubmit = async (data: CandidateDetailsValidator) => {
    console.log(data);
    router.push(`/interview/${jobId}/candidate-question`);
  };

  const ref = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      form.clearErrors('image');
      setFileName(file.name);
    }
  };

  const removeFile = () => {
    setFileName(null);
    form.setValue('image', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <InterviewLayout
      showStepper={false}
      useCard={false}
      subtitle="Fill In Your Details!"
      description="Please fill out your details before starting your Interview"
    >
      <FormProvider {...form}>
        <div>
          <Card className="border-dashed border-[#6F6C90] h-[159px] px-4 items-center justify-center relative">
            <FormField
              control={form.control}
              name="image"
              render={({}) => (
                <FormItem className="w-full h-full">
                  {fileName ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
                        <span className="text-sm truncate max-w-[200px]">{fileName}</span>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="text-[#1E4B8E] cursor-pointer text-center"
                      >
                        Click to upload image
                      </label>
                    </div>
                  )}
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />
          </Card>
        </div>

        <div className="mt-8">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={ref}
            className="space-y-8 px-4"
          >
            <FormField
              control={form.control}
              name="candidate_name"
              render={({ field }) => (
                <FormItem>
                  <CustomInputForm {...field} label="Your Name" placeholder="Name" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <CustomInputForm {...field} label="Email" placeholder="Email" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <CustomInputForm
                    {...field}
                    label="Phone Number"
                    placeholder="Phone Number"
                  />
                </FormItem>
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
