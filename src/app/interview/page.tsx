"use client"
import { Card } from "@/components/ui/card"
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
import InterviewLayout from "@/components/layout/InterviewLayout";


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
  const generateMutation = GenerateResponse();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    generateMutation.mutate({
      job_description: data.jobDescription,
      job_title: data.jobTitle,
      job_type: data.jobType,
      company_name: data.companyName,
      location: data.location,
      salary: data.salary
    });
  }

  const responseData = generateMutation.data || null;

  return (
      <><InterviewLayout
          showGoogleLogin={false}

      >
          <div className=" text-center pt-10 pb-10 w-full">

              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className="space-y-8">
                      <FormField
                          control={form.control}
                          name="jobDescription"
                          render={({field}) => (
                              <FormItem>
                                  <FormLabel>Position Overview</FormLabel>
                                  <FormControl>
                                      <Input placeholder="write details here" className="font-normal text-[16px]" {...field} />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          )}/>

                      <FormField
                          control={form.control}
                          name="jobTitle"
                          render={({field}) => (
                              <FormItem>
                                  <FormLabel>Job Title</FormLabel>
                                  <FormControl>
                                      <Input placeholder="write details here" type="text" {...field} />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          )}/>
                      <FormField
                          control={form.control}
                          name="jobType"
                          render={({ field }) => (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Job Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value="Onsite">Onsite</SelectItem>
                                      <SelectItem value="Remote">Remote</SelectItem>
                                  </SelectContent>
                              </Select>
                          )}
                      />

                      <FormField
                          control={form.control}
                          name="companyName"
                          render={({field}) => (
                              <FormItem>
                                  <FormLabel>Company Name</FormLabel>
                                  <FormControl>
                                      <Input placeholder="write details here" type="text" {...field} />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          )}/>
                      <FormField
                          control={form.control}
                          name="location"
                          render={({field}) => (
                              <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                      <Input  placeholder="write details here" type="text" {...field} />
                                  </FormControl>
                                  <FormMessage/>
                              </FormItem>
                          )}/>
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
                                          <Input placeholder="write details here" type="number" {...field} />
                                      </FormControl>
                                  </div>
                                  <FormMessage/>
                              </FormItem>
                          )}/>
                      <Button
                          className="cursor-pointer"
                          disabled={generateMutation.isPending}
                           type="submit">
                          <Image src="/images/Vector.png" alt="alt" width={20} height={20}/>
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
                                  {generateMutation.isPending ? "Regenerating....." : "Regenerate response"}
                              </Button>
                          </div>
                      </>
                  ) : (
                      <NoQuestion />
                  )}

              </Card>
          </div>

          <div className="flex justify-end mr-16  sm:justify-end items-center mt-6 mb-4 sm:mr-18 gap-4">
              <Button variant={"secondary"} className=" sm:w-auto cursor-pointer" type="button">
                  Cancel
              </Button>
              <Link href="/interview/question">
                  <Button type="submit" className="w-full sm:w-auto cursor-pointer">Next Step</Button>
              </Link>
          </div>
      </>
  )
}

