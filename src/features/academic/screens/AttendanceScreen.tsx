import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';
import { AppCard } from '../../../components/ui/AppCard';

// Mock data for attendance
const ATTENDANCE_DATA: Record<string, 'present' | 'absent' | 'leave' | 'holiday'> = {
  '2025-02-01': 'present',
  '2025-02-02': 'holiday',
  '2025-02-03': 'present',
  '2025-02-04': 'absent',
  '2025-02-05': 'present',
  '2025-02-06': 'present',
  '2025-02-07': 'present',
  '2025-02-08': 'holiday',
  '2025-02-09': 'holiday',
  '2025-02-10': 'leave',
  '2025-02-13': 'present',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const AttendanceScreen = () => {
  const [currentDate] = useState(new Date('2025-02-13')); // Fixed for demo

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const status = ATTENDANCE_DATA[dateStr];
        let statusColor = 'transparent';
        let textColor: string = theme.colors.text.primary;
        let isToday = i === currentDate.getDate();

        if (status === 'present') {
            statusColor = theme.colors.status.success + '20';
            textColor = theme.colors.status.success;
        } else if (status === 'absent') {
            statusColor = theme.colors.status.danger + '20';
            textColor = theme.colors.status.danger;
        } else if (status === 'leave') {
            statusColor = theme.colors.status.warning + '20';
            textColor = theme.colors.status.warning;
        } else if (status === 'holiday') {
            statusColor = theme.colors.surface.soft;
            textColor = theme.colors.text.secondary;
        }

        days.push(
            <View key={i} style={[styles.dayCell, isToday && styles.todayCell]}>
                <View style={[styles.dayCircle, { backgroundColor: statusColor }]}>
                    <AppText size="s" style={{ color: textColor }} weight={isToday ? 'bold' : 'regular'}>
                        {i}
                    </AppText>
                </View>
            </View>
        );
    }

    return days;
  };

  const stats = {
      present: 18,
      absent: 1,
      late: 0,
      total: 24
  };

  return (
    <ScreenWrapper title="Attendance" showBack scrollable>
      <View style={styles.container}>
        <AppCard style={styles.calendarCard}>
            <View style={styles.monthHeader}>
                <AppText size="l" weight="bold">February 2025</AppText>
            </View>
            
            <View style={styles.weekDays}>
                {DAYS.map(day => (
                    <AppText key={day} size="xs" color={theme.colors.text.secondary} style={styles.weekDayText}>
                        {day}
                    </AppText>
                ))}
            </View>
            
            <View style={styles.daysGrid}>
                {renderCalendar()}
            </View>
        </AppCard>

        <AppText size="m" weight="bold" style={styles.sectionTitle}>Summary</AppText>
        
        <View style={styles.statsRow}>
            <AppCard style={styles.statCard}>
                <AppText size="xxl" weight="bold" color={theme.colors.status.success}>{stats.present}</AppText>
                <AppText size="xs" color={theme.colors.text.secondary}>Present</AppText>
            </AppCard>
            <AppCard style={styles.statCard}>
                <AppText size="xxl" weight="bold" color={theme.colors.status.danger}>{stats.absent}</AppText>
                <AppText size="xs" color={theme.colors.text.secondary}>Absent</AppText>
            </AppCard>
             <AppCard style={styles.statCard}>
                <AppText size="xxl" weight="bold" color={theme.colors.status.warning}>{stats.late}</AppText>
                <AppText size="xs" color={theme.colors.text.secondary}>Late</AppText>
            </AppCard>
        </View>

        <AppCard style={styles.legendCard}>
            <AppText weight="semibold" style={{ marginBottom: 8 }}>Legend</AppText>
            <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: theme.colors.status.success }]} />
                    <AppText size="s">Present</AppText>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: theme.colors.status.danger }]} />
                    <AppText size="s">Absent</AppText>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.dot, { backgroundColor: theme.colors.status.warning }]} />
                    <AppText size="s">Leave</AppText>
                </View>
            </View>
        </AppCard>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  calendarCard: {
      padding: theme.spacing.m,
  },
  monthHeader: {
      alignItems: 'center',
      marginBottom: theme.spacing.m,
  },
  weekDays: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: theme.spacing.s,
  },
  weekDayText: {
      width: 40,
      textAlign: 'center',
  },
  daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  dayCell: {
      width: '14.28%', // 100% / 7
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 4,
  },
  dayCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
  },
  todayCell: {
      // border for today if needed
  },
  sectionTitle: {
      marginTop: theme.spacing.l,
      marginBottom: theme.spacing.m,
  },
  statsRow: {
      flexDirection: 'row',
      gap: theme.spacing.m,
      marginBottom: theme.spacing.m,
  },
  statCard: {
      flex: 1,
      alignItems: 'center',
      padding: theme.spacing.m,
  },
  legendCard: {
      marginTop: theme.spacing.s,
  },
  legendRow: {
      flexDirection: 'row',
      gap: theme.spacing.l,
  },
  legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
  },
  dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
  }
});
