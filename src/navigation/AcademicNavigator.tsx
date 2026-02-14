import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AcademicStackParamList } from './types';
import { AcademicScreen } from '../features/academic/screens/AcademicScreen';
import { AttendanceScreen } from '../features/academic/screens/AttendanceScreen';
import { HomeworkListScreen } from '../features/academic/screens/HomeworkListScreen';
import { HomeworkDetailScreen } from '../features/academic/screens/HomeworkDetailScreen';
import { TimetableScreen } from '../features/academic/screens/TimetableScreen';

const Stack = createNativeStackNavigator<AcademicStackParamList>();

const AcademicNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AcademicHub" component={AcademicScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="HomeworkList" component={HomeworkListScreen} />
      <Stack.Screen name="HomeworkDetail" component={HomeworkDetailScreen} />
      <Stack.Screen name="Timetable" component={TimetableScreen} />
    </Stack.Navigator>
  );
};

export default AcademicNavigator;
