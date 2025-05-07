'use client';
import CustomInputForm from '@/app/interview/component/customformInput';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';
import LoginInMutation from '@/Routes/Employer/hooks/Auth/SignIn.hook';
import UseProfileInfo from '@/Routes/Employer/hooks/GET/profile/profileinfohook';
import {
  AccountDetailformSchema,
  AccountFormValidator,
} from '@/schema/accountDetail.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRoundPen } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

export default function AdminAccountDetail() {
  const form = useForm<AccountFormValidator>({
    resolver: zodResolver(AccountDetailformSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      organization: '',
      email: '',
      password: '',
    },
  });

  const SignInMutation = LoginInMutation();
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: AccountFormValidator) => {
    SignInMutation.mutate({
      first_name: data.firstname,
      last_name: data.lastname,
      organization_name: data.organization,
      email: data.email,
      password: data.password,
    });
  };

  const {data} = UseProfileInfo();
  return (
    <div>
  <div className="flex items-center justify-between mb-4">
  <h1 className="text-xl font-semibold text-gray-900">Account Details</h1>
  <UserRoundPen className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
</div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          ref={ref}
          className="space-y-8 flex flex-col overflow-auto max-h-[80vh] py-8"
        >
          <div className="flex gap-4 items-start w-3xl mt-4 ">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name={data.first_name}
                      type="text"
                      label="First Name"
                      placeholder="John"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name={data.last_name}
                      type="text"
                      label="Last Name"
                      placeholder="Doe"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 items-start  w-3xl ">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name={data.organization_name}
                      label="Organization Name"
                      placeholder="King Palm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name={data.email}
                      type="email"
                      label="Email"
                      placeholder="john.doe@gmail.com"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 items-start w-sm ">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomInputForm
                      {...field}
                      name="password"
                      type="text"
                      label="Password"
                      placeholder="******"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex ">
            <Button
              type="submit"
              className=" leading-[20px] font-roboto cursor-pointer "
              // disabled={signupMutation.isPending}
            >
              Update Profile
              {/* {signupMutation.isPending ? 'Signing Up...' : 'Sign Up to Continue'} */}
            </Button>
            <Button
              type="reset"
              variant="ghost"
              className="leading-[20px] font-roboto cursor-pointer "
              // disabled={signupMutation.isPending}
            >
              Reset
              {/* {signupMutation.isPending ? 'Signing Up...' : 'Sign Up to Continue'} */}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}