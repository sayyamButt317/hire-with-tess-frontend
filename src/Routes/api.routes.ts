import axios from "axios";
import useAuthStore from "@/store/authToken.store";

const api = axios.create({
  baseURL: "https://backend.hirewithtess.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const GenerateQuestion = async (job_id: string) => {
    const response = await api.post(`api/v1/generate-questions/${job_id}`, {
        job_id
    });
    return response.data.questions; 
};


export const GetJobDetails = async (job_id: string) => {
    const response = await api.get(`api/v1/job/${job_id}`);
    return response.data; 

};

export const SignUp = async (data: {
    first_name: string;
    last_name: string;
    organization_name: string;
    email: string;
    password: string;
    confirm_password: string;
    role: "admin";
}) => {
    console.log("Signup Request Payload:", data);
    const response = await api.post(`api/v1/auth/signup`, data);
    return response.data;
};

export const GoogleLoginIn = async (data:{accessToken:string}) =>{
    const response = await api.post(`api/v1/auth/google-login`,data )
    return response.data;
}

export const GenerateIntrviewLink = async (job_id: string) => {
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