import axios from "axios";
import useAuthStore from "@/store/authToken.store";

const api = axios.create({
  baseURL: "https://backend.hirewithtess.com/",
  headers: {
    "Content-Type": "application/json",
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
    currency:string;
}) => {
    const response = await api.post(`api/v1/generate-job-details/`, data);
    return response.data;
};
//Get Job Details
export const GetJobDetails = async (job_id: string) => {
    const response = await api.get(`api/v1/job/${job_id}`);
    return response.data; 

};
//Update Job Details
export const updateJobDetails = async (job_id: string, data: {
    job_description: string;
    job_title: string;
    job_type: string;
    company_name: string;
    location: string;
    salary: string;
      currency:string;
}) => {
    const response = await api.put(`api/v1/generate-job-details/${job_id}`, data);
    return response.data;
  };
//GetQuestions
export const GetQuestionById = async (id: string) => {
    const response = await api.get(`/api/v1/interview/${id}`);
    return response.data;
}
//Post Questions
export const GenerateQuestion = async (job_id: string) => {
    const response = await api.post(`api/v1/generate-questions/${job_id}`, {
        job_id
    });
    return response.data.questions;
};
//Update Questions
  export const updateJobQuestions = async (job_id: string, questions: string[]) => {
    const response = await api.put(`api/v1/update-questions/${job_id}`, { questions });
    return response.data;
};
//Update Req ,Res & Skill
export const updateResReq = async(job_id:string,data:{
    job_description: string;
    job_title: string;
    job_type: string;
    company_name: string;
    location: string;
    salary: string;
      currency:string;
      responsibilities:string[];
      requirements:string[];
      skills:string[]

})=>{
    const response = await api.put(`api/v1/job/${job_id}`, data);
    return response.data;
}

export const SignUp = async (data: {
    first_name: string;
    last_name: string;
    organization_name: string;
    email: string;
    password: string;
    confirm_password: string;
    role: "admin";
}) => {
    
    const response = await api.post(`api/v1/auth/signup`, data);
    return response.data;
};

export const GoogleLoginIn = async (accessToken: string) => {
    const response = await api.post(`api/v1/auth/google-login`, {}, {
        headers: {
            Authorization: `Bearer ${accessToken}`, 
        }
    });
    return response.data;
};


export const GenerateInterviewLink = async (job_id: string) => {
    const { accessToken } = useAuthStore.getState();

    if (!accessToken) {
        throw new Error("No access token available");
    }

    const response = await api.get(`/api/v1/generate-interview-link/${job_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
};