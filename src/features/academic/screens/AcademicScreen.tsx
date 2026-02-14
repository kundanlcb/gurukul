import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';
import { AcademicStackParamList, AppStackParamList } from '../../../navigation/types';

type AcademicNavProp = NativeStackNavigationProp<AppStackParamList & AcademicStackParamList>;

// Mock Data
const SUBJECTS = [
  { id: '1', name: 'Mathematics', teacher: 'Mr. John Doe', color: '#5A53D6', icon: 'divide-circle' },
  { id: '2', name: 'Science', teacher: 'Ms. Sarah Smith', color: '#10B981', icon: 'zap' },
  { id: '3', name: 'English', teacher: 'Mrs. Emily Davis', color: '#F59E0B', icon: 'book-open' },
  { id: '4', name: 'History', teacher: 'Mr. Robert White', color: '#EC4899', icon: 'clock' },
  { id: '5', name: 'Computer', teacher: 'Mr. Alan Turing', color: '#3B82F6', icon: 'monitor' },
];

const EXAMS = [
  { id: '1', title: 'Mid-Term Mathematics', date: '25 Oct', time: '10:00 AM', room: 'Hall A' },
  { id: '2', title: 'Science Quiz', date: '28 Oct', time: '02:00 PM', room: 'Lab 1' },
];

// Mock Attendance Data for a Month (30 days)
const ATTENDANCE_DATA = Array.from({ length: 30 }, (_, i) => {
  const status = Math.random() > 0.1 ? 'present' : 'absent'; // 90% attendance
  return { day: i + 1, status };
});

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const AcademicScreen = () => {
  const navigation = useNavigation<AcademicNavProp>();
  const [attendanceView, setAttendanceView] = useState<'week' | 'month'>('week');

  const renderWeekView = () => {
    // Mock current week (last 7 days of data)
    const currentWeek = ATTENDANCE_DATA.slice(0, 7).map((item, index) => ({
      ...item,
      dayName: WEEK_DAYS[index],
    }));

    return (
      <View style={styles.weekContainer}>
        {currentWeek.map((item, index) => {
          const isPresent = item.status === 'present';
          return (
            <View key={index} style={styles.weekDayItem}>
              <AppText size="xs" color={theme.colors.text.tertiary} style={{ marginBottom: 8, fontSize: 11 }}>{item.dayName}</AppText>
              <View style={[
                styles.weekDatePill,
                { backgroundColor: isPresent ? theme.colors.status.success : theme.colors.status.danger }
              ]}>
                <AppText size="s" weight="bold" color="#FFFFFF">{item.day}</AppText>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderMonthView = () => {
    return (
      <View style={styles.monthContainer}>
        {ATTENDANCE_DATA.map((item, index) => {
          const isPresent = item.status === 'present';
          // For month view, maybe subtle background for present, strong for absent? 
          // Or consistent solid colors similar to week view for unity.
          return (
            <View key={index} style={styles.monthDayWrapper}>
              <View style={[
                styles.monthDateCircle,
                { backgroundColor: isPresent ? theme.colors.status.success : theme.colors.status.danger }
              ]}>
                <AppText size="xs" color="#FFFFFF" weight="bold">{item.day}</AppText>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ScreenWrapper
      title="Academics"
      showBack={false}
      headerAlign="left"
      headerSize="xxl"
      headerNoBorder
      scrollable
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.content}>

        {/* Subjects Section */}
        <View style={[styles.sectionHeader, { paddingHorizontal: theme.spacing.l }]}>
          <AppText size="l" weight="bold" color={theme.colors.text.primary}>My Subjects</AppText>
          <TouchableOpacity>
            <AppText size="s" color={theme.colors.primary[600]} weight="medium">See All</AppText>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subjectsScroll}>
          {SUBJECTS.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[styles.subjectCard, { backgroundColor: subject.color + '15' }]}
              onPress={() => navigation.navigate('SubjectDetail', { subject })}
            >
              <View style={[styles.subjectIcon, { backgroundColor: subject.color }]}>
                <Icon name={subject.icon} size={24} color="#FFF" />
              </View>
              <AppText size="m" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 12 }}>{subject.name}</AppText>
              <AppText size="xs" color={theme.colors.text.secondary} style={{ marginTop: 4 }}>{subject.teacher}</AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Exams Section */}
        <View style={[styles.sectionHeader, { marginTop: theme.spacing.xl, paddingHorizontal: theme.spacing.l }]}>
          <AppText size="l" weight="bold" color={theme.colors.text.primary}>Upcoming Exams</AppText>
          <TouchableOpacity>
            <AppText size="s" color={theme.colors.primary[600]} weight="medium">Schedule</AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.examsList}>
          {EXAMS.map((exam) => (
            <View key={exam.id} style={styles.examCard}>
              <View style={styles.examDateBox}>
                <AppText size="s" weight="bold" color={theme.colors.primary[600]}>{exam.date.split(' ')[0]}</AppText>
                <AppText size="xs" weight="bold" color={theme.colors.primary[600]}>{exam.date.split(' ')[1]}</AppText>
              </View>
              <View style={{ flex: 1 }}>
                <AppText size="m" weight="bold" color={theme.colors.text.primary}>{exam.title}</AppText>
                <AppText size="s" color={theme.colors.text.secondary} style={{ marginTop: 2 }}>{exam.time} • {exam.room}</AppText>
              </View>
            </View>
          ))}
        </View>

        {/* Attendance Section - Redesigned */}
        <View style={[styles.sectionHeader, { marginTop: theme.spacing.xl, marginBottom: theme.spacing.s, paddingHorizontal: theme.spacing.l }]}>
          <AppText size="l" weight="bold" color={theme.colors.text.primary}>Attendance</AppText>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, attendanceView === 'week' && styles.toggleBtnActive]}
              onPress={() => setAttendanceView('week')}
            >
              <AppText size="xs" color={attendanceView === 'week' ? '#FFF' : theme.colors.text.primary} weight="bold">Week</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, attendanceView === 'month' && styles.toggleBtnActive]}
              onPress={() => setAttendanceView('month')}
            >
              <AppText size="xs" color={attendanceView === 'month' ? '#FFF' : theme.colors.text.primary} weight="bold">Month</AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.attendanceCard}>
          {attendanceView === 'week' ? renderWeekView() : renderMonthView()}

          <View style={styles.divider} />

          {/* New Stats Layout: simplified 'Dashboard' feel */}
          <View style={styles.statsRowSimplified}>
            {/* Present */}
            <View style={styles.statItemSimple}>
              <AppText size="xs" color={theme.colors.text.secondary} style={{ marginBottom: 4 }}>Present</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <AppText size="xl" weight="bold" color={theme.colors.text.primary}>142</AppText>
                <AppText size="xs" color={theme.colors.text.tertiary} style={{ marginLeft: 4 }}>days</AppText>
              </View>
            </View>

            <View style={styles.verticalDivider} />

            {/* Absent */}
            <View style={styles.statItemSimple}>
              <AppText size="xs" color={theme.colors.text.secondary} style={{ marginBottom: 4 }}>Absent</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <AppText size="xl" weight="bold" color={theme.colors.text.primary}>8</AppText>
                <AppText size="xs" color={theme.colors.text.tertiary} style={{ marginLeft: 4 }}>days</AppText>
              </View>
            </View>

            <View style={styles.verticalDivider} />

            {/* Percentage */}
            <View style={styles.statItemSimple}>
              <AppText size="xs" color={theme.colors.text.secondary} style={{ marginBottom: 4 }}>Score</AppText>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <AppText size="xl" weight="bold" color={theme.colors.status.success}>95%</AppText>
              </View>
            </View>
          </View>
        </View>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: theme.spacing.m,
    paddingHorizontal: 0, // Full width, handle padding in children
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    // paddingHorizontal set inline or handled by container if specific
  },
  attendanceCard: {
    marginHorizontal: theme.spacing.l,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    // Flat style as requested
    borderWidth: 0,
    elevation: 0, // Remove elevation
    shadowOpacity: 0, // Remove shadow
    // Optional: Add very subtle background diff if needed, but white on grey surface is standard
  },
  attendanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  overallContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  circularProgress: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 6,
    borderColor: theme.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[50],
  },
  statsRowSimplified: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  statItemSimple: {
    flex: 1,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 32,
    backgroundColor: theme.colors.border.soft,
  },
  statsColumn: {
    flex: 1,
    justifyContent: 'space-around',
    gap: 16,
  },
  statRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  subjectsScroll: {
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.m,
    gap: 12,
  },
  subjectCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    marginRight: 0,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  examsList: {
    paddingHorizontal: theme.spacing.l,
    gap: 12,
  },
  examCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.default,
    padding: 12,
    borderRadius: 16,
  },
  examDateBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: theme.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface.default,
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
    borderColor: theme.colors.border.soft,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  toggleBtnActive: {
    backgroundColor: theme.colors.primary[600],
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  weekDayItem: {
    alignItems: 'center',
  },
  weekDatePill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow for depth
    shadowColor: theme.colors.primary[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0, // Flat
    borderWidth: 1,
    borderColor: 'transparent', // Default no border
  },
  monthContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start', // Align to start for grid
    marginBottom: 8,
  },
  monthDayWrapper: {
    width: '12.5%', // Approx 7 items per row with gap
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthDateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.soft,
    marginVertical: 16,
  }
});
