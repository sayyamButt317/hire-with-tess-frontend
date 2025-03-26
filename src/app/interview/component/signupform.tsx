'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupformSchema } from "@/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignupForm() {
    const form = useForm<z.infer<typeof SignupformSchema>>({
        resolver: zodResolver(SignupformSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            organization: "",
            email: "",
            password: "",
            confirmpassword: "",
        },
    })
    const ref = useRef<HTMLFormElement>(null)

    const onSubmit = async (data: z.infer<typeof SignupformSchema>) => {
        console.log("SUCCESS", data)
        form.reset()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className="space-y-8 items-center justify-center">
                <div className="flex gap-4 items-start">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl className="w-xl">
                                    <Input placeholder="John" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Type</FormLabel>
                                <FormControl className="w-xl">
                                    <Input placeholder="Doe" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-4 items-start">

                    <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl className="w-xl">
                                    <Input placeholder="King Palm" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl className="w-xl">
                                    <Input placeholder="john.doe@gmail.com" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4 items-start">

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl className="w-xl">
                                    <Input placeholder="******" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmpassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl className="w-xl">
                                    <Input placeholder="******" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree to the Terms of Service and acknowledge you have read our Privacy Policy
                    </label>
                </div>
            </form>
        </Form>
    )
}