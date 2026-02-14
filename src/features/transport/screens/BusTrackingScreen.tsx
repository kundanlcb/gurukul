import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { theme } from '../../../theme';
import { AppText } from '../../../components/ui/AppText';

// Since react-native-maps is not installed, we use a placeholder.
// import MapView, { Marker } from 'react-native-maps';

export const BusTrackingScreen = () => {
  return (
    <ScreenWrapper title="Bus Tracking" showBack>
      <View style={styles.container}>
        <View style={styles.mapPlaceholder}>
          <AppText size="l" weight="medium" color={theme.colors.text.secondary}>Map View Placeholder</AppText>
          <AppText size="s" color={theme.colors.text.secondary} style={styles.instruction}>
            Install react-native-maps to view live tracking.
          </AppText>
          <View style={styles.mockBus}>
            <AppText style={styles.busText}>🚌 Bus 12 (On Route)</AppText>
          </View>
        </View>
        <View style={styles.infoPanel}>
          <AppText size="m" weight="bold">Route: Morning Pickup</AppText>
          <AppText size="s">ETA: 10 mins</AppText>
          <AppText size="xs" color={theme.colors.text.secondary}>Last updated: Just now</AppText>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.app,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    marginTop: theme.spacing.s,
  },
  mockBus: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.s,
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.radius.m,
    borderWidth: 1,
    borderColor: theme.colors.primary[500],
  },
  busText: {
    fontWeight: 'bold',
    color: theme.colors.primary[600],
  },
  infoPanel: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.soft,
  },
});
