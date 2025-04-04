
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log(baseUrl)
export const APIEndpoint={

    // JOB Management
    GENERATE_JOB_DETAILS:`${baseUrl}/api/v1/generate-job-details/`,
    GENERATE_QUESTION:`${baseUrl}/api/v1/generate-questions/{job_id}`,
    GET_JOB_DETAILS:`${baseUrl}/api/v1/job/{job_id}`,
    GET_INTERVIEW_LINK:`${baseUrl}/api/v1/generate-interview-link/{job_id}`,

    // Update Job Details
    UPDATE_JOB_DETAILS:`${baseUrl}/api/v1/generate-job-details/{job_id}`,
    UPDATE_JOB_QUESTIONS:`${baseUrl}/api/v1/update-questions/{job_id}`,
    UPDATE_RES_REQ:`${baseUrl}/api/v1/job/{job_id}`,

    // Interview Management
    INTERVIEW:`${baseUrl}/api/v1/interview/{job_id}`,
    INTERVIEW_SUBMIT:`${baseUrl}/api/v1/submit-interview/`,
    INTERVIEW_ANALYZER:`${baseUrl}/api/v1/analyze/{interview_id}`,

    // Authentication
    SIGNUP:`${baseUrl}/api/v1/auth/signup`,
    LOGIN:`${baseUrl}/api/v1/auth/login`,
    GOOGLE_LOGIN:`${baseUrl}/api/v1/auth/google-login`,

}