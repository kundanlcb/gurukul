import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppButton } from '../../../components/ui/AppButton';
import { useAuthStore } from '../../auth/store';
import { theme } from '../../../theme/tokens';

export const ProfileScreen = () => {
  const { logout, user } = useAuthStore();

  return (
    <ScreenWrapper title="Profile" scrollable>
      <View style={styles.content}>
        <AppButton 
          title="Logout" 
          variant="secondary" 
          onPress={logout} 
          style={styles.logoutButton}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.m,
  },
  logoutButton: {
    marginTop: theme.spacing.xl,
    borderColor: theme.colors.status.danger,
    borderWidth: 1,
  },
});
