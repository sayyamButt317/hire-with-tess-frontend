'use client'
import useHomeStore from "@/store/home.store";
import InterviewLayout from "@/components/layout/InterviewLayout";
import { Button } from "@/components/ui/button";
import OutputCard from "../component/outputCard";
import FetchJobDetails from "@/hooks/FetchJobDetails.hook";
import FetchQuestions from "@/hooks/FetchQuestions.hook";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { customformSchema } from "@/schema/customform.schema";
import {  useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Signup from "@/app/signup/page";
import CustomInputForm from "@/app/interview/component/customformInput";
import { useRouter } from 'next/navigation'

export default function InterviewReview() {
    const { jobId } = useHomeStore();

    const jobDetailsQuery = FetchJobDetails(jobId);
    const jobData = jobDetailsQuery?.data || {};

    const {data} = FetchQuestions(jobId);

    const form = useForm<z.infer<typeof customformSchema>>({});
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter()

    return (
        <InterviewLayout
            subtitle="Review Your AI-Generated Interview"
            description="Take a final look before sharing it with candidates. You can edit or regenerate questions if needed."
            showStepper={true}
            currentStep={3}
            showGoogleLogin={false}
            useCard={false}
        >
            <div className="w-full p-6 mt-8">
                <Form {...form}>
                    <form ref={ref} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInputForm
                                            {...field}
                                            name="jobTitle"
                                            label="Job Title"
                                            placeholder={jobData.job_title|| "Job Title"}

                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="jobType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInputForm
                                            {...field}
                                            name="jobType"
                                            label="Job Type"
                                            placeholder={jobData.job_type || "Job Type"}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInputForm
                                            {...field}
                                            name="companyName"
                                            label="Company Name"
                                            placeholder={jobData.company_name || "Company Name"}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInputForm
                                            {...field}
                                            name="location"
                                            label="Location"
                                            placeholder={ jobData.location || "Location"}
                                        />
                                    </FormControl>
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
                                        currencyName={jobData.currency || "currency"}
                                        label="Salary"
                                        placeholder={jobData.salary ||"Enter salary"}
                                        type="number"
                                    />
                                </FormItem>
                            )}
                        />


                    </form>
                </Form>

                {Object.keys(jobData).length > 0 && (

                    <div className="mt-4 w-full">
                        <OutputCard
                            containerPadding=""
                            showHeading={false}
                            showAvatar={false}
                            showEditIcon={false}
                            req={jobData.requirements || []}
                            res={jobData.responsibilities || []}
                            skill={jobData.skills || []}
                        />
                    </div>
                )}
                <div className="text-left space-y-2 w-full">
                    <h2 className="text-lg font-semibold mt-4 mb-6">AI Powered Questions:</h2>
                    <Form {...form}>
                        <form>
                            {data?.questions.map((question: string, index: number) => (
                                <FormField
                                    key={index}
                                    control={form.control}
                                    name={`questions.${index}`}
                                    render={({ field }) => (
                                        <FormItem className="space-y-2 pt-2 pb-2">
                                            <CustomInputForm
                                                {...field}
                                                name={`questions.${index}`}
                                                label={`Question ${index + 1}`}
                                                placeholder={question}


                                            />
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </form>
                    </Form>
                </div>
                <div className="flex float-right gap-2 mt-8">
                    <div>
                        <Button onClick={() => router.back()} variant="secondary">Back</Button>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-40">Sign up to Continue</Button>
                        </DialogTrigger>
                        <DialogContent className="items-center bg-white shadow-2xl rounded-lg w-5xl">
                            <Signup />
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </InterviewLayout>
    );
}
