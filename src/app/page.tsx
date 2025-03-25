"use client";

import EmployerLayout from '@/components/layout/EmployerLayout';
import useStore from '@/store/home.store';
import { useRouter } from 'next/navigation';
import Placeholder from './interview/component/placeholder';

export default function Home() {
  const { jobDescription, setJobDescription } = useStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobDescription(e.target.value); 
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jobDescription.trim()) return; 
    router.push('/interview'); 
  };

  return (
    <EmployerLayout>
      <div className="max-w-3xl w-full px-4 md:px-6 lg:px-0 text-center md:text-left">
        <div className="max-w-5xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold text-white mb-4 sm:mb-6 leading-tight">
            Effortless Hiring with AI-Powered Assessments
          </h2>
        </div>

        <p className="text-black font-extralight text-center mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
          Easily generate a shareable link for candidates to complete their AI-powered interview anytime, anywhere. No scheduling required.
        </p>

        <div className="w-full">
          <Placeholder onChange={handleChange} onSubmit={onSubmit} />
        </div>
      </div>
    </EmployerLayout>
  );
}
