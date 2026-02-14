import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { theme } from '../theme/tokens';
import { AppTabParamList } from './types';
import { HomeScreen } from '../features/dashboard/screens/HomeScreen';
import { TimetableScreen } from '../features/academic/screens/TimetableScreen';
import { LeaderboardScreen } from '../features/leaderboard/screens/LeaderboardScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import AcademicNavigator from './AcademicNavigator';

const Tab = createBottomTabNavigator<AppTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 100 : 84, // Adjusted height for 16px padding
          paddingBottom: Platform.OS === 'ios' ? 32 : 12,
          paddingTop: 16, // Adjusted to 16 as requested
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#5A53D6',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        tabBarIcon: ({ focused }) => {
          let iconName = 'circle';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Academic') iconName = 'book-open';
          else if (route.name === 'Timetable') iconName = 'calendar';
          else if (route.name === 'Leaderboard') iconName = 'bar-chart-2';
          else if (route.name === 'Profile') iconName = 'user';

          return (
            <View style={[
              styles.tabItem,
              focused && styles.tabItemFocused
            ]}>
              <Icon
                name={iconName}
                size={24}
                color={focused ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Academic" component={AcademicNavigator} />
      <Tab.Screen name="Timetable" component={TimetableScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  tabItemFocused: {
    backgroundColor: '#5A53D6', // Primary color for active state
    shadowColor: '#5A53D6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default MainTabNavigator;
