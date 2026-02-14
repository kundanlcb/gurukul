import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { AppTabParamList } from './types';
import HomeScreen from '../screens/app/HomeScreen';
import TimetableScreen from '../screens/app/TimetableScreen';
import AcademicsScreen from '../screens/app/AcademicsScreen';
import ResultsScreen from '../screens/app/ResultsScreen';
import ProfileScreen from '../screens/app/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#5A53D6', // Brand Primary
        tabBarInactiveTintColor: '#6E7583', // Text Secondary
        tabBarIcon: ({ color, size }) => {
          let iconName = 'circle';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Timetable') iconName = 'calendar';
          else if (route.name === 'Academics') iconName = 'book-open';
          else if (route.name === 'Results') iconName = 'award';
          else if (route.name === 'Profile') iconName = 'user';

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="Academics" component={AcademicsScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
