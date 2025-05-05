import axios from 'axios';
import { EMPLOYERAPI } from '../Constant/employer-endpoint.route';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { clearAuthToken, getAuthToken } from '@/Utils/Providers/auth';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
const token = localStorage.getItem('accessToken');
console.log("Token before request",token);
  // const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {  
//       window.location.href = '/login'; // Redirect unauthorized users  
//     }  
//     // if (error.response && error.response.status === 401) {
//     //  clearAuthToken();
//     //  if (error.response?.status === 403) {
//     //   toast.error('Unauthorized access');
//     // }
//     // if (error.response?.status === 500) {
//     //   toast.error('Server error');
//     // }else{
//     //   toast.error('Session expired. Please login again.');
//     // }
      
//     return Promise.reject(error);
//   }
// );

//Get All Jobs
export const GetAllJob = async () => {
  const response = await api.get(EMPLOYERAPI.JOB_DETAILS);
  return response.data;
};

//Get Job Details BYID
export const UserJobByID = async (job_id: string) => {
  const response = await api.get(EMPLOYERAPI.JOB_DETAIL_BYID(job_id));
  return response.data;
};

//Delete Job Details BYID
export const DeleteJobByID = async (job_id: string) => {
  const response = await api.delete(EMPLOYERAPI.DELETE_JOB_BYID(job_id));
  return response.data;
};

//Update Job Details BYID
export const UpdateJobByID = async (
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
  const response = await api.put(EMPLOYERAPI.UPDATE_JOB_BYID(job_id), data);
  return response.data;
};

//Update Job Status BYID
export const UpdateJobStatusByID = async (job_id: string, status: string) => {
  const response = await api.put(EMPLOYERAPI.UPDATE_JOBSTATUS_BYID(job_id), { status });
  return response.data;
};

//Get All Interviews
export const GetAllInterview = async () => {
  const response = await api.get(EMPLOYERAPI.INTERVIEW_DETAILS);
  return response.data;
};

//Get Job Interviews BYID
export const JobeInterById = async (job_id: string) => {
  const response = await api.get(EMPLOYERAPI.JOB_INTERVIEW_BYID(job_id));
  return response.data;
};

//Get Interview Details BYID
export const GetInterviewById = async (interview_id: string) => {
  const response = await api.get(EMPLOYERAPI.INTERVIEW_DETAIL_BYID(interview_id));
  return response.data;
};

//Update Interview Status BYID
export const UpdateInterviewStatusByID = async (interview_id: string, status: string) => {
  const response = await api.put(EMPLOYERAPI.UPDATE_INTERVIEW_STATUS_BYID(interview_id), {
    status,
  });
  return response.data;
};

//Dashboard Card Stats
export const DashboardCardStats = async () => {
  const response = await api.get(EMPLOYERAPI.DASHBOARD_CARD_STATS);
  return response.data;
};

//Candidate Card stats
export const CandidateCardStats = async () => {
  const response = await api.get(EMPLOYERAPI.CANDIDATE_CARD_STATS);
  return response.data;
};

//Job card stats
export const JobCardStats = async () => {
  const response = await api.get(EMPLOYERAPI.JOB_CARD_STATS);
  return response.data;
};

//Filtered Job
export const FilteredJob = async () => {
  const response = await api.get(EMPLOYERAPI.FILTER_JOBS);
  return response.data;
};

//Filter Interview
export const FilterInterview = async () => {
  const response = await api.get(EMPLOYERAPI.FILTER_INTERVIEW);
  return response.data;
};

//Delete Profile
export const DeleteProfile = async () => {
  const response = await api.delete(EMPLOYERAPI.DELETE_PROFILE);
  return response.data;
};

//Admin Notification
export const AdminNotification = async () => {
  const response = await api.get(EMPLOYERAPI.NOTIFICATION);
  return response.data;
};

//Admin Notificaation Setting
export const NotificationSetting = async () => {
  const response = await api.get(EMPLOYERAPI.NOTIFICATION_SETTING);
  return response.data;
};

//Update Notification Setting
export const UpdateNotificationType = async (notification_type: string) => {
  const response = await api.put(
    EMPLOYERAPI.UPDATE_ADMIN_NOTIFICATION(notification_type),
  );
  return response.data;
};

//Employer Login
export const EmployerLogin = async (data: { email: string; password: string }) => {
  const response = await api.post(EMPLOYERAPI.EMPLOYER_LOGIN, data);
  return response.data;
};
