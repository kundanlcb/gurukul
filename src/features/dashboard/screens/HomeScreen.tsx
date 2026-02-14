import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { PromoBanner } from '../components/PromoBanner';
import { OfflineBanner } from '../../../components/ui/OfflineBanner';
import { useAuthStore } from '../../auth/store';
import { theme } from '../../../theme';
import { TIMETABLE_DATA, CATEGORY_COLORS } from '../../academic/screens/TimetableScreen';

import { AppStackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type HomeNavProp = NativeStackNavigationProp<AppStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeNavProp>();
  const { user } = useAuthStore();

  // Mock "Today's" data - using '18' from the dataset
  const todayClasses = TIMETABLE_DATA['18']?.slice(0, 3) || [];

  const ASSIGNMENTS = [
    { id: '1', title: 'Chapter 5 Exercises', subject: 'Mathematics', dueDate: 'Tomorrow, 5:00 PM', status: 'pending' },
    { id: '2', title: 'Physics Lab Report', subject: 'Science', dueDate: 'Fri, 20 Oct', status: 'pending' },
    { id: '3', title: 'Essay on Shakespeare', subject: 'English', dueDate: 'Mon, 23 Oct', status: 'completed' },
    { id: '4', title: 'World War II Timeline', subject: 'History', dueDate: 'Wed, 25 Oct', status: 'pending' },
  ];

  return (
    <ScreenWrapper
      scrollable
      title=""
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <OfflineBanner />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.greetingHeader}>
          <View>
            <AppText size="s" color={theme.colors.text.secondary} style={{ marginBottom: 4 }}>
              Good Morning!
            </AppText>
            <AppText size="xxl" weight="bold" style={{ fontSize: 26, lineHeight: 32 }}>
              {user?.name || 'David Warner'}
            </AppText>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('NotificationScreen')}
            >
              <Icon name="bell" library="feather" size={24} color={theme.colors.text.primary} />
              <View style={styles.badge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notice Banner */}
        <PromoBanner />



        {/* Today's Timetable */}
        <View style={styles.sectionHeader}>
          <AppText size="l" weight="bold" color={theme.colors.text.primary}>Today's Classes</AppText>
          <TouchableOpacity>
            <AppText size="s" color={theme.colors.primary[600]} weight="medium">See All</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.timelineContainer}>
          {todayClasses.map((item, index) => {
            const isLast = index === todayClasses.length - 1;
            const colors = CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.science;

            return (
              <View key={index} style={styles.timelineItem}>
                {/* Time Column */}
                <View style={styles.timeColumn}>
                  <AppText size="s" weight="bold" color={theme.colors.text.primary}>{item.startTime}</AppText>
                  <AppText size="xs" color={theme.colors.text.tertiary}>{item.endTime}</AppText>
                </View>

                {/* Decoration */}
                <View style={styles.timelineDecoration}>
                  {index !== 0 && <View style={styles.timelineLineTop} />}
                  {!isLast && <View style={styles.timelineLineBottom} />}
                  <View style={[styles.timelineDot, { backgroundColor: colors.primary, borderColor: colors.primary }]} />
                </View>

                {/* Card */}
                <View style={[styles.card, { backgroundColor: '#F8FAFC' }]}>
                  <View style={styles.cardHeader}>
                    <AppText size="m" weight="bold" color={theme.colors.text.primary}>{item.subject}</AppText>
                    {item.isActive && (
                      <View style={styles.liveBadge}>
                        <AppText size="xs" color="#FFF" weight="bold">LIVE</AppText>
                      </View>
                    )}
                  </View>
                  <AppText size="s" color={theme.colors.text.secondary} style={{ marginTop: 2 }}>
                    {item.teacher} • Room 301
                  </AppText>
                </View>
              </View>
            );
          })}
        </View>

        {/* Stats Row - Moved Here */}
        <View style={[styles.statsRow, { marginTop: theme.spacing.m, marginBottom: theme.spacing.xl }]}>
          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: theme.colors.status.success + '20' }]}>
              <Icon name="trending-up" library="feather" size={20} color={theme.colors.status.success} />
            </View>
            <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 4 }}>Good</AppText>
            <AppText size="xs" color={theme.colors.text.secondary}>Progress</AppText>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: theme.colors.primary[100] }]}>
              <Icon name="check-circle" library="feather" size={20} color={theme.colors.primary[600]} />
            </View>
            <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 4 }}>95%</AppText>
            <AppText size="xs" color={theme.colors.text.secondary}>Attendance</AppText>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: theme.colors.status.warning + '20' }]}>
              <Icon name="calendar" library="feather" size={20} color={theme.colors.status.warning} />
            </View>
            <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 4 }}>5</AppText>
            <AppText size="xs" color={theme.colors.text.secondary}>Due Tasks</AppText>
          </View>
        </View>

        {/* Assignments Section */}
        <View style={styles.sectionHeader}>
          <AppText size="l" weight="bold" color={theme.colors.text.primary}>Assignments</AppText>
          <TouchableOpacity>
            <AppText size="s" color={theme.colors.primary[600]} weight="medium">View All</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.assignmentsList}>
          {ASSIGNMENTS.slice(0, 3).map((assignment) => ( // Show only first 3
            <TouchableOpacity
              key={assignment.id}
              style={styles.assignmentCard}
              onPress={() => navigation.navigate('AssignmentDetail', { assignment })}
            >
              <View style={[styles.statusIndicator, { backgroundColor: assignment.status === 'pending' ? theme.colors.status.warning : theme.colors.status.success }]} />
              <View style={styles.assignmentContent}>
                <AppText size="m" weight="bold" color={theme.colors.text.primary}>{assignment.title}</AppText>
                <AppText size="s" color={theme.colors.text.secondary} style={{ marginTop: 2 }}>{assignment.subject} • Due {assignment.dueDate}</AppText>
              </View>
              <Icon name="chevron-right" size={20} color={theme.colors.text.tertiary} />
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.l,
    paddingTop: theme.spacing.m,
  },
  greetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl, // Standardize
    marginTop: theme.spacing.xs,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.status.danger,
    borderWidth: 1.5,
    borderColor: theme.colors.surface.app,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.surface.default,
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.l,
    paddingTop: theme.spacing.l,
    borderRadius: 16,
    marginBottom: theme.spacing.xl, // Standardize
    marginTop: 0, // Remove top margin, rely on previous section's margin or gap
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.border.soft,
    marginHorizontal: 4,
    alignSelf: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  timelineContainer: {
    marginBottom: theme.spacing.m, // Reduced spacing as requested (was xl)
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16, // Moved margin here for consistent centering
  },
  timeColumn: {
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'center', // Center vertically
    marginRight: 8,
  },
  timelineDecoration: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    marginRight: 8,
  },
  timelineLineTop: {
    position: 'absolute',
    top: 0,
    bottom: '50%', // Height is 50%
    width: 2,
    backgroundColor: theme.colors.border.soft,
  },
  timelineLineBottom: {
    position: 'absolute',
    top: '50%', // Start from center
    bottom: -16, // Extend to cover card margin (16)
    width: 2,
    backgroundColor: theme.colors.border.soft,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 0, // Remove margin, centered by flexbox
    backgroundColor: theme.colors.surface.default,
    zIndex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 0, // Removed margin from here
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadge: {
    backgroundColor: theme.colors.status.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bottomGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  gridIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  assignmentsList: {
    gap: 12,
    marginBottom: theme.spacing.xl, // Add spacing at bottom if needed
  },
  assignmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface.default,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border.soft,
  },
  statusIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 16,
  },
  assignmentContent: {
    flex: 1,
  },
});
