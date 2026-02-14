import { client } from '../services/api/client';
import {
    AcademicControllerApi,
    AnalyticsControllerApi,
    AttendanceControllerApi,
    AuthenticationApi,
    CalendarControllerApi,
    DashboardControllerApi,
    DocumentControllerApi,
    FinanceConfigControllerApi,
    FinanceOperationsControllerApi,
    HomeworkControllerApi,
    NoticeControllerApi,
    NotificationControllerApi,
    ProfileControllerApi,
    RoutineControllerApi,
    StudentControllerApi,
    TeacherControllerApi,
    TransportTrackingApi
} from './index';

// Instantiate APIs using the existing axios client (which handles auth/interceptors)
// Arguments: configuration (undefined), basePath (undefined - handled by client), axios (client)

export const academicApi = new AcademicControllerApi(undefined, undefined, client);
export const analyticsApi = new AnalyticsControllerApi(undefined, undefined, client);
export const attendanceApi = new AttendanceControllerApi(undefined, undefined, client);
export const authApi = new AuthenticationApi(undefined, undefined, client);
export const calendarApi = new CalendarControllerApi(undefined, undefined, client);
export const dashboardApi = new DashboardControllerApi(undefined, undefined, client);
export const documentApi = new DocumentControllerApi(undefined, undefined, client);
export const financeConfigApi = new FinanceConfigControllerApi(undefined, undefined, client);
export const financeOpsApi = new FinanceOperationsControllerApi(undefined, undefined, client);
export const homeworkApi = new HomeworkControllerApi(undefined, undefined, client);
export const noticeApi = new NoticeControllerApi(undefined, undefined, client);
export const notificationApi = new NotificationControllerApi(undefined, undefined, client);
export const profileApi = new ProfileControllerApi(undefined, undefined, client);
export const routineApi = new RoutineControllerApi(undefined, undefined, client);
export const studentApi = new StudentControllerApi(undefined, undefined, client);
export const teacherApi = new TeacherControllerApi(undefined, undefined, client);
export const transportApi = new TransportTrackingApi(undefined, undefined, client);
