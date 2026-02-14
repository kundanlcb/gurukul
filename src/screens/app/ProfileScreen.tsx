import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuthStore } from '../../features/auth/store';

const ProfileScreen = () => {
  const { logout } = useAuthStore();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
};

export default ProfileScreen;
