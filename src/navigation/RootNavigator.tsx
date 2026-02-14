import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAuthStore } from '../features/auth/store';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  // Note: We removed the global isLoading check here because useAuthStore.isLoading 
  // is shared with API calls (login actions). Blocking the root navigator on API calls 
  // causes the AuthNavigator to unmount/remount, losing navigation state.
  // TODO: Implement a separate isHydrating state if startup flash is an issue.

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
