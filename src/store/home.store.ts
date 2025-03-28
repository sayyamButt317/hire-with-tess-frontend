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
  currency:string;
  setJobId: (value: string) => void;  
  setJobDescription: (value: string) => void;
  setJobTitle: (value: string) => void;
  setJobType: (value: string) => void;
  setCompanyName: (value: string) => void;
  setLocation: (value: string) => void;
  setSalary: (value: string) => void;
  setCurrency: (value: string) => void;
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
          currency: '',
        setJobId: (value) => set({ jobId: value }), 
        setJobDescription: (value) => set({ jobDescription: value }),
        setJobTitle: (value) => set({ jobTitle: value }),
        setJobType: (value) => set({ jobType: value }),
        setCompanyName: (value) => set({ companyName: value }),
        setLocation: (value) => set({ location: value }),
        setSalary: (value) => set({ salary: value }),
          setCurrency: (value) => set({ currency: value }),
      }),
      {
        name: 'job-Details',
        storage:createJSONStorage (() => localStorage), 
      }
    )
  )
);

export default useStore;
