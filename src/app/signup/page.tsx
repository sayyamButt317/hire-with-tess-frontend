'use client';
import { Button } from '@/components/ui/button';
import SignupForm from '../interview/component/signupform';
import Image from 'next/image';
import React from 'react';
// import useGoogleLoginHook from '@/hooks/GoogleLogin.hook';

export default function Signup() {
  // const GoogleLoginMutation = useGoogleLoginHook();
  //
  // const handleGoogleLogin = (googleResponse) => {
  //     const accessToken = googleResponse?.accessToken;
  //     if (accessToken) {
  //         GoogleLoginMutation.mutate(accessToken);
  //     }
  // };

  return (
    <div className="py-4">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-[roboto] font-medium text-[20px] sm:text-[24px]  w-full sm:w-[607px]">
          Sign Up to Share Your AI-Generated Interview
        </h1>
        <p className="font-[roboto] font-[400] text-[14px] sm:text-[16px] leading-[24px] text-[#606778] mt-2 w-full sm:w-[642px]">
          Get started with a 60-day free trial - no credit required!
        </p>

        <Button
          // onClick={() => handleGoogleLogin()}
          className="w-max-2xl sm:w-[528px] h-[64px] border-r-[14px] rounded-[14px] border-[1px] mt-4 mb-4 font-[roboto] font-normal bg-transparent text-black
                hover:bg-transparent border-gray-400 flex items-center justify-center gap-2"
        >
          <Image src="/images/google.png" alt="Google Icon" width={20} height={20} />
          Continue with Google
        </Button>
      </div>

      <div className="w-full mt-4">
        <div className="relative flex items-center justify-center w-full mt-2 mb-2">
          <hr className="w-full h-[1px]  bg-[#CBCAD7] border-0 rounded-sm " />
          <div className="absolute px-4  font-openSans  font-normal text-[18px] space-x-[28px] bg-white text-gray-600 left-1/2 transform -translate-x-1/2 ">
            Or
          </div>
        </div>
        <div className="w-full sm:flex-col px-4 mt-4">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
