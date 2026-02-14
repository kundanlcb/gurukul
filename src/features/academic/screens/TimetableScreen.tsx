import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppCard } from '../../../components/ui/AppCard';
import { theme } from '../../../theme/tokens';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Mock Timetable Data
const TIMETABLE_DATA: Record<string, Array<{ time: string; subject: string; teacher: string; room: string }>> = {
  'Mon': [
    { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
    { time: '08:45 - 09:30', subject: 'English', teacher: 'Mr. Khan', room: '101' },
    { time: '09:30 - 10:15', subject: 'Science', teacher: 'Mrs. Gupta', room: 'Lab 2' },
    { time: '10:15 - 10:45', subject: 'Break', teacher: '-', room: '-' },
    { time: '10:45 - 11:30', subject: 'History', teacher: 'Mr. Singh', room: '101' },
  ],
  'Tue': [
    { time: '08:00 - 08:45', subject: 'Science', teacher: 'Mrs. Gupta', room: 'Lab 2' },
    { time: '08:45 - 09:30', subject: 'Mathematics', teacher: 'Mrs. Sharma', room: '101' },
  ],
  'Wed': [
     { time: '08:00 - 08:45', subject: 'PT', teacher: 'Coach Rakesh', room: 'Ground' },
  ],
   'Thu': [
     { time: '08:00 - 08:45', subject: 'Computer', teacher: 'Ms. Lee', room: 'Comp Lab' },
  ],
   'Fri': [
     { time: '08:00 - 08:45', subject: 'Art', teacher: 'Mr. Dave', room: 'Art Room' },
  ],
   'Sat': [
     { time: '08:00 - 11:00', subject: 'Extra Classes', teacher: 'Various', room: '101' },
  ],
};

export const TimetableScreen = () => {
  const [selectedDay, setSelectedDay] = useState('Mon');

  return (
    <ScreenWrapper title="Timetable" showBack>
      <View style={styles.container}>
        {/* Day Tabs */}
        <View style={styles.tabContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                {DAYS.map(day => (
                    <TouchableOpacity 
                        key={day} 
                        style={[styles.tab, selectedDay === day && styles.activeTab]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <AppText 
                            weight={selectedDay === day ? 'bold' : 'medium'}
                            color={selectedDay === day ? theme.colors.text.inverse : theme.colors.text.secondary}
                        >
                            {day}
                        </AppText>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

        {/* Timetable List */}
        <ScrollView contentContainerStyle={styles.listContent}>
            {TIMETABLE_DATA[selectedDay]?.map((period, index) => {
                if (period.subject === 'Break') {
                    return (
                        <View key={index} style={styles.breakItem}>
                             <AppText size="s" weight="bold" color={theme.colors.text.secondary} align="center">
                                LUNCH BREAK ({period.time})
                             </AppText>
                        </View>
                    );
                }

                return (
                    <AppCard key={index} style={styles.periodCard} variant="flat">
                        <View style={styles.timeColumn}>
                            <AppText size="s" weight="bold" color={theme.colors.primary[600]}>
                                {period.time.split(' - ')[0]}
                            </AppText>
                             <AppText size="xs" color={theme.colors.text.secondary}>
                                {period.time.split(' - ')[1]}
                            </AppText>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoColumn}>
                            <AppText weight="bold" size="m" style={styles.subject}>
                                {period.subject}
                            </AppText>
                            <View style={styles.detailsRow}>
                                <AppText size="s" color={theme.colors.text.secondary}>
                                    {period.teacher}
                                </AppText>
                                 <View style={styles.dot} />
                                <AppText size="s" color={theme.colors.text.secondary}>
                                    Room {period.room}
                                </AppText>
                            </View>
                        </View>
                    </AppCard>
                );
            })}
            
            {(!TIMETABLE_DATA[selectedDay] || TIMETABLE_DATA[selectedDay].length === 0) && (
                 <View style={styles.emptyState}>
                     <AppText color={theme.colors.text.secondary}>No classes scheduled</AppText>
                 </View>
            )}

        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
      backgroundColor: theme.colors.surface.default,
      paddingVertical: theme.spacing.m,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.soft,
  },
  tabsScroll: {
      paddingHorizontal: theme.spacing.m,
      gap: theme.spacing.m,
  },
  tab: {
      paddingHorizontal: theme.spacing.l,
      paddingVertical: theme.spacing.s,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.surface.soft,
  },
  activeTab: {
      backgroundColor: theme.colors.primary[600],
  },
  listContent: {
      padding: theme.spacing.m,
  },
  periodCard: {
      flexDirection: 'row',
      marginBottom: theme.spacing.m,
      padding: 0,
      overflow: 'hidden',
  },
  timeColumn: {
      width: 80,
      padding: theme.spacing.m,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary[50],
  },
  divider: {
      width: 1,
      backgroundColor: theme.colors.border.soft,
  },
  infoColumn: {
      flex: 1,
      padding: theme.spacing.m,
      justifyContent: 'center',
  },
  subject: {
      marginBottom: 4,
  },
  detailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.text.disabled,
      marginHorizontal: 8,
  },
  breakItem: {
      paddingVertical: theme.spacing.m,
      backgroundColor: theme.colors.surface.soft,
      borderRadius: theme.radius.m,
      marginBottom: theme.spacing.m,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: theme.colors.border.soft,
  },
  emptyState: {
      padding: theme.spacing.xl,
      alignItems: 'center',
  }
});
