const BASE_URL = '';
async function fetchJson(url, options) {
    const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error ${res.status}: ${errorText}`);
    }
    return res.json();
}
export const api = {
    // Authentication
    login: async (email, role, password) => {
        return fetchJson('/api/auth/login/', {
            method: 'POST',
            body: JSON.stringify({ email, role, password }),
        });
    },
    signup: async (userData) => {
        return fetchJson('/api/auth/signup/', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },
    getUsers: async () => {
        return fetchJson('/api/auth/users/');
    },
    // Students
    createStudent: async (studentData) => {
        return fetchJson('/api/students/', {
            method: 'POST',
            body: JSON.stringify(studentData),
        });
    },
    updateStudent: async (id, studentData) => {
        return fetchJson(`/api/students/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(studentData),
        });
    },
    // AI Parsers & Detail Extraction
    parseResumeWithAI: async (resumeText) => {
        return fetchJson('/api/ai/parse-resume/', {
            method: 'POST',
            body: JSON.stringify({ resume_text: resumeText }),
        });
    },
    parseJobWithAI: async (jobText) => {
        return fetchJson('/api/ai/parse-job/', {
            method: 'POST',
            body: JSON.stringify({ job_text: jobText }),
        });
    },
    createJob: async (jobData) => {
        return fetchJson('/api/jobs/', {
            method: 'POST',
            body: JSON.stringify(jobData),
        });
    },
    // Students
    getStudents: async () => {
        return fetchJson('/api/students/');
    },
    getStudentById: async (id) => {
        return fetchJson(`/api/students/${id}/`);
    },
    getAIReadiness: async (id) => {
        return fetchJson(`/api/students/${id}/ai-readiness/`, { method: 'POST' });
    },
    getStudentReadiness: async (id) => {
        return fetchJson(`/api/students/${id}/readiness/`);
    },
    getSkillGaps: async (id, role = 'Software Engineer') => {
        return fetchJson(`/api/students/${id}/skill-gaps/?role=${encodeURIComponent(role)}`);
    },
    // Jobs & Recruiters
    getJobs: async () => {
        return fetchJson('/api/jobs/');
    },
    getRecruiters: async () => {
        return fetchJson('/api/recruiters/');
    },
    // Matching
    runMatchingForJob: async (jobId) => {
        return fetchJson(`/api/matching/job/${jobId}/`);
    },
    getMatchingForStudent: async (studentId) => {
        return fetchJson(`/api/matching/student/${studentId}/`);
    },
    toggleShortlist: async (studentId, driveId, shortlist) => {
        return fetchJson('/api/matching/shortlist/', {
            method: 'POST',
            body: JSON.stringify({ student_id: studentId, drive_id: driveId, shortlist }),
        });
    },
    // Drives & Scheduling
    getDrives: async () => {
        return fetchJson('/api/drives/');
    },
    getConflicts: async () => {
        return fetchJson('/api/conflicts/');
    },
    resolveConflict: async (driveId, newStartTime = '14:00', newEndTime = '16:00') => {
        return fetchJson(`/api/drives/${driveId}/resolve-conflict/`, {
            method: 'POST',
            body: JSON.stringify({ new_start_time: newStartTime, new_end_time: newEndTime }),
        });
    },
    // Offers
    getOffers: async () => {
        return fetchJson('/api/offers/');
    },
    updateOfferStatus: async (offerId, status, joiningDate) => {
        return fetchJson(`/api/offers/${offerId}/`, {
            method: 'PATCH',
            body: JSON.stringify({ status, joining_date: joiningDate }),
        });
    },
    // Notifications
    getNotifications: async (studentId) => {
        const url = studentId ? `/api/notifications/?student_id=${studentId}` : '/api/notifications/';
        return fetchJson(url);
    },
    markNotificationRead: async (notifId) => {
        return fetchJson(`/api/notifications/${notifId}/read`, {
            method: 'PATCH',
        });
    },
    markAllNotificationsRead: async () => {
        return fetchJson('/api/notifications/mark-all-read', {
            method: 'POST',
        });
    },
    // Analytics
    getDashboardAnalytics: async () => {
        return fetchJson('/api/analytics/dashboard/');
    },
    // Demo Reset
    resetDemoData: async () => {
        return fetchJson('/api/demo/reset/', {
            method: 'POST',
        });
    },
};
