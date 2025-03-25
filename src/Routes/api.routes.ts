import axios from "axios";

const api = axios.create({
  baseURL: "http://13.60.186.127:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const Generate = async (data: {
  job_description: string;
  job_title: string;
  job_type: string;
  company_name: string;
  location: string;
  salary: string;
}) => {
  try {
    const response = await api.post(`api/v1/generate-job-details/`, data);
    return response.data;
  } catch (error) {
    console.error("Error generating job details:", error);
    throw error;
  }
};

export const GenerateQuestion = async (job_id: string) => {
    const response = await api.post(`api/v1/generate-questions/${job_id}`, {
        job_id
    });
    return response.data.questions; 
};


export const GetJobDetails = async (job_id: string) => {
    const response = await api.get(`api/v1/generate-job-details/${job_id}`);
    return response.data; 

};
