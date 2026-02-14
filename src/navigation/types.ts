import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerify: { mobile: string };
};

export type AcademicStackParamList = {
  AcademicHub: undefined;
  Attendance: undefined;
  HomeworkList: undefined;
  HomeworkDetail: { id: string };
  Timetable: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Academic: NavigatorScreenParams<AcademicStackParamList>;
  Timetable: undefined;
  Leaderboard: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<AppTabParamList>;
  // Finance
  FeeScreen: undefined;
  PaymentHistory: undefined;
  // Results
  ResultDetail: { id: string };
  // Communication
  Notices: undefined;
  NoticeDetail: { id: string };
  SchoolCalendar: undefined;
  // Transport
  BusTracking: undefined;
  // Notifications
  NotificationScreen: undefined;
  NotificationDetail: { notification: any };
  // Academic
  AssignmentDetail: { assignment: any };
  SubjectDetail: { subject: any };
  // Profile
  EditProfile: undefined;
  Settings: undefined;
  HelpCenter: undefined;
  PrivacyPolicy: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};
