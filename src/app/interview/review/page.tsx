"use client";

import useStore from "@/store/home.store";
import InterviewLayout from "@/components/layout/InterviewLayout";
import {Button} from "@/components/ui/button";
import OutputCard from "../component/outputCard";
import Question from "../component/question";
import FetchJobDetails from "@/hooks/FetchJobDetails.hook";
import FetchQuestions from "@/hooks/FetchQuestions.hook";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {customformSchema} from "@/schema/customform.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import Signup from "@/app/signup/page";
import CustomInputForm from "@/app/interview/component/customformInput";

export default function InterviewReview() {

    const {jobId} = useStore();

    const jobDetailsQuery = FetchJobDetails(jobId);
    const jobData = jobDetailsQuery.data || {};

    const questionQuery = FetchQuestions(jobId);
    const questions = questionQuery.data || [];

    const form = useForm<z.infer<typeof customformSchema>>({
        resolver: zodResolver(customformSchema),
        defaultValues: {
            jobTitle: jobData.job_title || "",
            jobType: jobData.job_type || "",
            companyName: jobData.company_name || "",
            location: jobData.location || "",
            salary: jobData.salary || "",
            currency: jobData.currency || "",
        },
    });

    const ref = useRef<HTMLFormElement>(null)
    const {setValue} = form;


    useEffect(() => {
        if (jobData && Object.keys(jobData).length > 0) {
            setValue("jobTitle", jobData.job_title || "");
            setValue("jobType", jobData.job_type || "");
            setValue("companyName", jobData.company_name || "");
            setValue("location", jobData.location || "");
            setValue("salary", jobData.salary || "");
            setValue("currency",jobData.currency || "")
        }
    }, [jobData, setValue]);
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
                            render={({field}) => (
                                <FormItem>

                                    <FormControl>

                                        <CustomInputForm {...field} name="jobTitle" label="Job Title" placeholder="Job Title  " />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="jobType"
                            render={({field}) => (
                                <FormItem>

                                    <FormControl>
                                        <CustomInputForm {...field} name="jobType" label="Job Type" placeholder="Job Type " />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({field}) => (
                                <FormItem>

                                    <FormControl>

                                        <CustomInputForm {...field} name="companyName" label="Company Name" placeholder="Company Name " />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({field}) => (
                                <FormItem>

                                    <FormControl>
                                        <CustomInputForm {...field} name="location" label="Location" placeholder="Location " />

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
                                        currencyName="currency"
                                        label="Salary"
                                        placeholder="Enter salary"
                                        type="number"
                                    />

                                </FormItem>
                            )}
                        />

                    </form>
                </Form>
                {Object.keys(jobData).length > 0 && (
                    <div className="mt-4 w-full ">
                        <OutputCard
                            showAvatar={false}

                            req={jobData.requirements || []}
                            res={jobData.responsibilities || []}
                            skill={jobData.skills || []}
                        />
                    </div>
                )}


                <Question questions={questions} showImage={false}/>

                <div className="flex float-right gap-2 mt-4">
                    <Button variant="secondary">Back</Button>


                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-40">Sign up to Continue</Button>
                        </DialogTrigger>

                        <DialogContent className="items-center bg-white/50 p-6 rounded-lg shadow-lg w-[90vw] max-w-[1412px]">
                            <DialogHeader>
                            </DialogHeader>
                            <Signup/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </InterviewLayout>
    );
}
