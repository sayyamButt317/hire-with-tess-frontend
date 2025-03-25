import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware'

interface InputState {
    jobId:string;
  jobDescription: string;
  jobTitle: string;
  jobType: string;
  companyName: string;
  location: string;
  salary: string;
  setJobId: (value: string) => void;  
  setJobDescription: (value: string) => void;
  setJobTitle: (value: string) => void;
  setJobType: (value: string) => void;
  setCompanyName: (value: string) => void;
  setLocation: (value: string) => void;
  setSalary: (value: string) => void;
}

const useStore = create<InputState>()(
  devtools(
    persist(
      (set) => ({
        jobId: '',  
        jobDescription: '',
        jobTitle: '',
        jobType: '',
        companyName: '',
        location: '',
        salary: '',
        setJobId: (value) => set({ jobId: value }), 
        setJobDescription: (value) => set({ jobDescription: value }),
        setJobTitle: (value) => set({ jobTitle: value }),
        setJobType: (value) => set({ jobType: value }),
        setCompanyName: (value) => set({ companyName: value }),
        setLocation: (value) => set({ location: value }),
        setSalary: (value) => set({ salary: value }),
      }),
      {
        name: 'job-application-form', 
        storage:createJSONStorage (() => localStorage), 
      }
    )
  )
);

export default useStore;
