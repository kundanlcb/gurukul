import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  OtpVerify: { mobile: string };
};

export type AppTabParamList = {
  Home: undefined;
  Timetable: undefined;
  Academics: undefined;
  Results: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
};
