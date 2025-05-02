import axios from 'axios';
import { APIEndpoint } from '@/Routes/Client/Constant/endpoint.routes';
import {SubmitInterviewPayload} from '@/Types/Employer/useresponse';
import TypeInterviewLink from '@/Types/Employer/interviewlink.type';
import EmployeeAuthStore from '@/store/Employee/auth.store';
import { useRecordingStore } from '@/store/candidate/Recording.store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
//Post Job Details
export const GenerateJobDetails = async (data: {
  job_description: string;
  job_title: string;
  job_type: string;
  company_name: string;
  location: string;
  salary: string;
  currency: string;
}) => {
  const response = await api.post(APIEndpoint.GENERATE_JOB_DETAILS, data);
  return response.data;
};
//Get Job Details
export const GetJobDetails = async (job_id: string) => {
  const response = await api.get(APIEndpoint.GET_JOB_DETAILS(job_id));
  return response.data;
};
//Update Job Details
export const updateJobDetails = async (
  job_id: string,
  data: {
    job_description: string;
    job_title: string;
    job_type: string;
    company_name: string;
    location: string;
    salary: string;
    currency: string;
  },
) => {
  const response = await api.put(APIEndpoint.UPDATE_JOB_DETAILS(job_id), data);
  return response.data;
};
//Get Interview Questions
export const GetQuestionById = async (job_id: string) => {
  const response = await api.get(APIEndpoint.INTERVIEW(job_id));
  return response.data;
};
//Post Interview Questions
export const GenerateQuestion = async (job_id: string) => {
  const response = await api.post(APIEndpoint.GENERATE_QUESTION(job_id), { job_id });
  return response.data.questions;
};

//Update Interview Questions
export const updateJobQuestions = async (job_id: string, questions: string[]) => {
  const response = await api.put(APIEndpoint.UPDATE_JOB_QUESTIONS(job_id), { questions });
  return response.data;
};

//Update Req ,Res & Skill
export const updateResReq = async (
  job_id: string,
  data: {
    job_description: string;
    job_title: string;
    job_type: string;
    company_name: string;
    location: string;
    salary: string;
    currency: string;
    responsibilities: string[];
    requirements: string[];
    skills: string[];
  },
) => {
  const response = await api.put(APIEndpoint.UPDATE_RES_REQ(job_id), data);
  return response.data;
};

//Sign UP
export const SignUp = async (data: {
  first_name: string;
  last_name: string;
  organization_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: 'admin';
}) => {
  const response = await api.post(APIEndpoint.SIGNUP, data);
  return response.data;
};

//googleLogin
export const GoogleLoginIn = async (accessToken: string) => {
  const response = await api.post(
    APIEndpoint.GOOGLE_LOGIN,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
//Get Generate Interview link
export const GenerateInterviewLink = async (job_id: string): Promise<TypeInterviewLink> => {
  const { accessToken } = EmployeeAuthStore.getState();
  if (!accessToken) throw new Error('No access token available');

  const response = await api.get(APIEndpoint.GET_INTERVIEW_LINK(job_id), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

//Post Candidate Details
export const RegisterCandidate = async (data: FormData) => {
  const response = await api.post(APIEndpoint.REGISTER_CANDIDATE, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const setInterviewId = useRecordingStore.getState().setInterviewId;
  setInterviewId(response.data.interview_id);

  return response;
};


//submit Interview
export const SubmitInterview = async (
  interview_id:string
  ,data: SubmitInterviewPayload) => {
    const response =  await api.post(APIEndpoint.SUBMIT_INTERVIEW(interview_id), data);
    return response.data;
}