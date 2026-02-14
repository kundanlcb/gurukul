// src/components/ui/OfflineBanner.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../../theme/tokens';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineBanner = () => {
  const isOnline = useOnlineStatus();
  // Animation logic can be added here
  
  if (isOnline) return null;

  return (
    <View style={styles.container}>
      <AppText size="s" style={styles.text}>
        You are offline. Some features may be limited.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.status.danger,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
});
