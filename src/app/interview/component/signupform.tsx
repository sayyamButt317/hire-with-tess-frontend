'use client'
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupFormSchema } from "@/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignupForm() {
    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
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

    const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
        console.log("SUCCESS", data)
        form.reset()
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                ref={ref}
                className="space-y-8 flex flex-col items-center"
            >
                <div className="flex gap-4 items-start w-full ">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
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
                            <FormItem className="w-full">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4 items-start w-full ">
                    <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
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
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john.doe@gmail.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4 items-start w-full ">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmpassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex items-start w-full ">
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