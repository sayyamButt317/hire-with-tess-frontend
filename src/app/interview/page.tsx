"use client"
import { Card } from "@/components/ui/card"
import Stepper from "./component/stepper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "@/schema/formschema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image";
import useStore from "@/store/home.store"
import Link from "next/link"
import OutputCard from "./component/outputCard"
import NoQuestion from "./component/emptycard"
import GenerateResponse from "@/hooks/generateResponse.hook";
import { LoaderCircle } from "lucide-react"
export default function InterviewForm() {
  const { jobDescription, jobTitle, jobType, companyName, location, salary } = useStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: jobDescription || "",
      jobTitle: jobTitle || "",
      jobType: jobType || "",
      companyName: companyName || "",
      location: location || "",
      salary: salary || "",
    },
  })
  const ref = useRef<HTMLFormElement>(null)
  const generatemutation = GenerateResponse();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    generatemutation.mutate({
      job_description: data.jobDescription,
      job_title: data.jobTitle,
      job_type: data.jobType,
      company_name: data.companyName,
      location: data.location,
      salary: data.salary
    });
  }

  // Extract response data
  const responseData = generatemutation.data || null;

  return (
    <div className="text-center pt-10 pb-10">
      <h1 className="text-xl text-center font-extralight text-black">Hirewithtess</h1>
      <h1 className="text-[34px] font-bold">Create an AI-Powered Interview in Second</h1>
      <p className="mt-4 mb-8 text-gray-600">
        Enter the job details, and let AI generate tailored interview question for you
      </p>

      <Card className="mt-4 mx-6 p-4 relative">
        <div className="flex justify-center w-full mb-8">
          <Stepper currentStep={1} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className="space-y-8">
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Overview</FormLabel>
                  <FormControl>
                    <Input placeholder="write details here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="write details here" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Input placeholder="write details here" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="write details here" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="write details here" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <div className="flex gap-4 items-start">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Currency" />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              disabled={generatemutation.isPending}
            className="bg-[#f7941D] hover:bg-[#e88b19]" type="submit">
              <Image src="/images/Vector.png" alt="alt" width={20} height={20} />
              {generatemutation.isPending && <LoaderCircle className="animate-spin"/>}
               Generate
            </Button>
          </form>
        </Form>
      </Card>

      <Card className="mt-4 mx-6 p-4 relative">
        {responseData ?
          <OutputCard
            req={responseData.requirements || []}
            res={responseData.responsibilities || []}
            skill={responseData.skills || []} />
          : <NoQuestion />}
        <div className="my-2"> 
        <Button 
  disabled={generatemutation.isPending}
  onClick={() => onSubmit(form.getValues())} 
  className="bg-transparent text-black hover:text-white rounded-2xl"
>
  {generatemutation.isPending ? "Regenerating....." : "Regenerate response"}
</Button>

            </div>
      </Card>

      <div className="flex justify-end items-end mt-4 mr-10 gap-4">
        <Button variant={"secondary"} type="button">
          Cancel
        </Button>
        <Link href="/interview/question">
          <Button type="submit">Next Step</Button>
        </Link>
      </div>

    </div>
  )
}

