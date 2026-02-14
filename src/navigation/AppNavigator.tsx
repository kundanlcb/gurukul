import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './types';
import MainTabNavigator from './MainTabNavigator';
import { FeeScreen } from '../features/finance/screens/FeeScreen';
import { PaymentHistoryScreen } from '../features/finance/screens/PaymentHistoryScreen';
import { ResultDetailScreen } from '../features/results/screens/ResultDetailScreen';
import { NoticesScreen } from '../features/communication/screens/NoticesScreen';
import { NoticeDetailScreen } from '../features/communication/screens/NoticeDetailScreen';
import { SchoolCalendarScreen } from '../features/communication/screens/SchoolCalendarScreen';
import { BusTrackingScreen } from '../features/transport/screens/BusTrackingScreen';
import { NotificationScreen } from '../features/notifications/screens/NotificationScreen';
import { NotificationDetailScreen } from '../features/notifications/screens/NotificationDetailScreen';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { SettingsScreen } from '../features/profile/screens/SettingsScreen';
import { HelpCenterScreen } from '../features/profile/screens/HelpCenterScreen';
import { PrivacyPolicyScreen } from '../features/profile/screens/PrivacyPolicyScreen';
import { AssignmentDetailScreen } from '../features/academic/screens/AssignmentDetailScreen';
import { SubjectDetailScreen } from '../features/academic/screens/SubjectDetailScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="FeeScreen" component={FeeScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
      <Stack.Screen name="ResultDetail" component={ResultDetailScreen} />
      <Stack.Screen name="Notices" component={NoticesScreen} />
      <Stack.Screen name="NoticeDetail" component={NoticeDetailScreen} />
      <Stack.Screen name="SchoolCalendar" component={SchoolCalendarScreen} />
      <Stack.Screen name="BusTracking" component={BusTrackingScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
      <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} />
      <Stack.Screen name="SubjectDetail" component={SubjectDetailScreen} />

      {/* Profile */}
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
