import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppCard } from '../../../components/ui/AppCard';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';

export const AttendanceWidget = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Attendance')}>
        <AppCard style={styles.container}>
        <View style={styles.header}>
            <AppText weight="semibold">Attendance</AppText>
            <AppText size="xs" color={theme.colors.text.secondary}>Today</AppText>
        </View>
        
        <View style={styles.statusContainer}>
            <View style={styles.indicator} />
            <AppText size="xl" weight="bold" color={theme.colors.status.success}>
            Present
            </AppText>
        </View>
        
        <AppText size="xs" color={theme.colors.text.secondary} style={styles.footer}>
            Punch in: 8:05 AM
        </AppText>
        </AppCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.s,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.status.success,
    marginRight: theme.spacing.s,
  },
  footer: {
    marginTop: theme.spacing.xs,
  },
});
