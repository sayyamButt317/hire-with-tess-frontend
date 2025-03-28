"use client";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { customformSchema, FormValidator } from "@/schema/customform.schema";
import Image from "next/image";
import useStore from "@/store/home.store";
import Link from "next/link";
import OutputCard from "./component/outputCard";
import NoQuestion from "./component/emptycard";
import GenerateResponse from "@/hooks/generateResponse.hook";
import InterviewLayout from "@/components/layout/InterviewLayout";
import CustomInputForm from "@/app/interview/component/customformInput";

export default function InterviewForm() {
  const { jobDescription, jobTitle, jobType, companyName, location, salary } =
    useStore();

  const form = useForm<FormValidator>({
    resolver: zodResolver(customformSchema),
    defaultValues: {
      jobDescription: jobDescription || "",
      jobTitle: jobTitle || "",
      jobType: jobType || "",
      companyName: companyName || "",
      location: location || "",
      salary: salary || "",
    },
  });
  const ref = useRef<HTMLFormElement>(null);
  const generateMutation = GenerateResponse();

  const onSubmit = async (data: FormValidator) => {
    generateMutation.mutate({
      job_description: data.jobDescription,
      job_title: data.jobTitle,
      job_type: data.jobType,
      company_name: data.companyName,
      location: data.location,
      salary: data.salary,
      currency: data.currency,
    });
  };

  const responseData = generateMutation.data || null;

  return (
    <>
      <InterviewLayout showGoogleLogin={false} useCard={false}>
        <div className=" text-center pt-10 pb-10 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              ref={ref}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="jobDescription"
                      label="Position Overview"
                      placeholder="Position Overview here"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="jobTitle"
                      label="Job Title"
                      placeholder="Job Title here"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <CustomInputForm
                    {...field}
                    name="jobType"
                    label="Job Type"
                    jobTypeName="jobType"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="companyName"
                      label="Company Name"
                      placeholder="Company Name here"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <CustomInputForm
                      {...field}
                      name="location"
                      label="Location "
                      placeholder="Location here"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={() => (
                  <FormItem>
                    <CustomInputForm
                      name="salary"
                      currencyName="currency"
                      label="Salary"
                      placeholder="Enter salary here"
                      type="number"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="cursor-pointer"
                disabled={generateMutation.isPending}
                type="submit"
              >
                <Image
                  src="/images/Vector.png"
                  alt="alt"
                  width={20}
                  height={20}
                />
                {generateMutation.isPending ? "Generating....." : "Generate"}
              </Button>
            </form>
          </Form>
        </div>
      </InterviewLayout>
      <div className=" sm:px-18">
        <Card className="mt-4 p-12  w-full">
          {responseData ? (
            <>
              <h1 className="font-bold text-2xl">AI Powered Description</h1>
              <OutputCard
                req={responseData.requirements || []}
                res={responseData.responsibilities || []}
                skill={responseData.skills || []}
              />

              <div className="my-2 flex justify-center">
                <Button
                  disabled={generateMutation.isPending}
                  onClick={() => onSubmit(form.getValues())}
                  className="bg-transparent text-black hover:text-white  border border-gray-400 hover:border-none rounded-2xl flex items-center justify-center"
                >
                  {generateMutation.isPending
                    ? "Regenerating....."
                    : "Regenerate response"}
                </Button>
              </div>
            </>
          ) : (
            <NoQuestion />
          )}
        </Card>
      </div>

      {responseData ? (
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
          <Link href="/interview/question">
            <Button type="submit" className="w-full sm:w-auto cursor-pointer">
              Next Step
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex justify-end mr-16  sm:justify-end items-center mt-6 mb-4 sm:mr-18 gap-4"></div>
      )}
    </>
  );
}
