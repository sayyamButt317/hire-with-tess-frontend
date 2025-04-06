'use client'
import InterviewLayout from "@/components/layout/InterviewLayout";
import {Card} from "@/components/ui/card";
// import {FormField, FormItem} from "@/components/ui/form";
// import CustomInputForm from "@/app/interview/component/customformInput";
// import React, {useRef} from "react";
// import {Form, useForm} from "react-hook-form";
// import { FormValidator} from "@/schema/customform.schema";
// import {zodResolver} from "@hookform/resolvers/zod";
// import {CandidateDetailSchema} from "@/schema/CandidateDetail.schema";

export default function CandidatesDetails(){

    // const form = useForm<FormValidator>({
    //     resolver: zodResolver(CandidateDetailSchema),
    //     defaultValues: {
    //     },
    // });
    // const onSubmit = async (data: FormValidator) => {
    //     // generateMutation.mutate({
    //     //
    //     // });
    // };
    // const ref = useRef<HTMLFormElement>(null);
    return(
        <InterviewLayout showStepper={false} useCard={false} subtitle="Fill In Your Details!"
                         description="Please fill out your details before starting your Interview" >
            <div>
                <Card className={"border-dashed border-[#6F6C90] h-[159px] "}></Card>
            </div>

            <div>
                {/*<Form {...form}>*/}
                {/*    <form*/}
                {/*        onSubmit={form.handleSubmit(onSubmit)}*/}
                {/*        ref={ref}*/}
                {/*        className="space-y-8 px-4"*/}
                {/*    >*/}

                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="jobType"*/}
                {/*    render={({ field }) => (*/}
                {/*        <CustomInputForm*/}
                {/*            {...field}*/}
                {/*            name="Name"*/}
                {/*            label="Your Name"*/}
                {/*            jobTypeName="Name"*/}
                {/*        />*/}
                {/*    )}*/}
                {/*/>*/}
                {/*        <FormField*/}
                {/*            control={form.control}*/}
                {/*            name="jobTitle"*/}
                {/*            render={({ field }) => (*/}
                {/*                <FormItem>*/}
                {/*                    <CustomInputForm*/}
                {/*                        {...field}*/}
                {/*                        name="Email"*/}
                {/*                        label="Email"*/}
                {/*                        placeholder="email"*/}
                {/*                    />*/}

                {/*                </FormItem>*/}
                {/*            )}*/}
                {/*        />*/}


                {/*        <FormField*/}
                {/*    control={form.control}*/}
                {/*    name="PhoneNumber"*/}
                {/*    render={({ field }) => (*/}
                {/*        <FormItem>*/}
                {/*            <CustomInputForm*/}
                {/*                {...field}*/}
                {/*                name="PhoneNumber"*/}
                {/*                label="Phone Number"*/}
                {/*                placeholder="tele"*/}
                {/*            />*/}

                {/*        </FormItem>*/}

                {/*    )}*/}
                {/*/>*/}
                {/*    </form>*/}
                {/*</Form>*/}
            </div>
        </InterviewLayout>
    )
}