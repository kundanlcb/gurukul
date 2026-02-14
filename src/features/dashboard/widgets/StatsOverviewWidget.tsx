import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';
import { useNavigation } from '@react-navigation/native';

const STATS = [
  { 
    id: 'gpa', 
    label: 'GPA', 
    value: '3.8', 
    icon: 'award', 
    color: '#4F46E5' // Indigo
  },
  { 
    id: 'attendance', 
    label: 'Attendance', 
    value: '95%', 
    icon: 'bar-chart-2', 
    color: '#3B82F6' // Blue
  },
  { 
    id: 'tasks', 
    label: 'Due Tasks', 
    value: '2', 
    icon: 'book-open', 
    color: '#2563EB' // Blue 600
  },
];

export const StatsOverviewWidget = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {STATS.map((stat) => (
        <View key={stat.id} style={styles.card}>
          <View style={styles.iconContainer}>
            <Icon name={stat.icon} library="feather" size={24} color={stat.color} />
          </View>
          <AppText size="xs" color={theme.colors.text.secondary} style={styles.label}>
            {stat.label}
          </AppText>
          <AppText size="l" weight="bold" color={theme.colors.text.primary}>
            {stat.value}
          </AppText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.s,
    gap: theme.spacing.s,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: theme.spacing.m,
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    marginBottom: theme.spacing.s,
  },
  label: {
    marginBottom: 4,
  }
});
