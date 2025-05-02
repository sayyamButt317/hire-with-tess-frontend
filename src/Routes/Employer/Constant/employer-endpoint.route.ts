

export const EMPLOYERAPI = {

  //Jobs
  JOB_DETAILS: `/api/v1/admin/jobs`,
  JOB_DETAIL_BYID: (job_id: string) => `/api/v1/admin/jobs/${job_id}`,

  DELETE_JOB_BYID: (job_id: string) => `/api/v1/admin/jobs/${job_id}`,
  UPDATE_JOB_BYID: (job_id: string) => `/api/v1/admin/jobs/${job_id}`,
  UPDATE_JOBSTATUS_BYID: (job_id: string) => `/api/v1/admin/jobs/${job_id}/status`,

  //Interviews
  INTERVIEW_DETAILS: `/api/v1/admin/interviews`,
  JOB_INTERVIEW_BYID : (job_id: string) => `/api/v1/admin/jobs/${job_id}/interviews`,
  INTERVIEW_DETAIL_BYID: (interview_id:string) =>`/api/v1/admin/interviews/${interview_id}`,
  UPDATE_INTERVIEW_STATUS_BYID: (interview_id:string) => `/api/v1/admin/interviews/${interview_id}/status`,

  // Employer Dashboard
  DASHBOARD_CARD_STATS: `/api/v1/admin/dashboard-stats`,
  CANDIDATE_CARD_STATS: `/api/v1/admin/candidates-stats`,
  JOB_CARD_STATS: `/api/v1/admin/jobs-stats`,
  
  //Filters
  FILTER_JOBS: `/api/v1/admin/jobs/filter/`,
  FILTER_INTERVIEW:`/api/v1/admin/interviews/filter/`,

  DELETE_PROFILE:`/api/v1/admin/delete-profile`,

  //Notification
  NOTIFICATION:`/api/v1/admin/notifications`,
  NOTIFICATION_SETTING:`/api/v1/admin/notification-settings`,
  UPDATE_ADMIN_NOTIFICATION:(notification_type:string) => `/api/v1/admin/notification-settings/${notification_type}`,
  
  //Auth
  EMPLOYER_LOGIN: `/api/v1/auth/login`,
};
