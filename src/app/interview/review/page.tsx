"use client";

import useStore from "@/store/home.store";
import InterviewLayout from "@/components/layout/InterviewLayout";
import {Button} from "@/components/ui/button";
import OutputCard from "../component/outputCard";
import Question from "../component/question";
import FetchJobDetails from "@/hooks/FetchJobDetails.hook";
import FetchQuestions from "@/hooks/FetchQuestions.hook";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {customformSchema} from "@/schema/customform.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import Signup from "@/app/signup/page";

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
            <div className="w-full p-6">
                <Form {...form}>
                    <form ref={ref} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="write details here"  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="jobType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Job Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="write details here"  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="write details here"  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="write details here"  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="salary"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Salary</FormLabel>
                                    <div className="flex gap-4 items-start">
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Currency"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="AED">AED</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormControl>
                                            <Input placeholder="write details here" type="text" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage/>
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


                        <DialogContent className="fixed inset-0 bg-black/50 flex items-center justify-center">


                                <Signup/>

                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </InterviewLayout>
    );
}
