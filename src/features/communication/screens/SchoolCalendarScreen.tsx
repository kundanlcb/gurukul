import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { theme } from '../../../theme';
import { AppText } from '../../../components/ui/AppText';
import { AppCard } from '../../../components/ui/AppCard';

const MOCK_EVENTS = [
  { id: '1', title: 'Science Fair', date: '2023-10-25', type: 'event', description: 'Annual Science Exhibition in the Main Hall.' },
  { id: '2', title: 'Diwali Break Starts', date: '2023-11-01', type: 'holiday', description: 'School closed for Diwali celebrations.' },
  { id: '3', title: 'Math Olympiad', date: '2023-11-15', type: 'exam', description: 'Inter-school competition for selected students.' },
  { id: '4', title: 'Winter Vacation', date: '2023-12-20', type: 'holiday', description: 'Standard Grade 1-5' },
];

export const SchoolCalendarScreen = () => {
  const renderItem = ({ item }: { item: typeof MOCK_EVENTS[0] }) => (
    <AppCard style={styles.card}>
      <View style={styles.dateBox}>
        <AppText size="l" weight="bold" style={styles.dateDay}>{item.date.split('-')[2]}</AppText>
        <AppText size="xs" weight="medium" style={styles.dateMonth}>OCT</AppText>
      </View>
      <View style={styles.details}>
        <AppText size="m" weight="bold" style={styles.title}>{item.title}</AppText>
        <AppText size="s" color={theme.colors.text.secondary}>{item.description}</AppText>
        <View style={[styles.tag, item.type === 'holiday' ? styles.holidayTag : styles.eventTag]}>
          <AppText size="xs" weight="bold" style={styles.tagText}>{item.type.toUpperCase()}</AppText>
        </View>
      </View>
    </AppCard>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText size="xl" weight="bold">School Calendar</AppText>
      </View>
      <FlashList
        data={MOCK_EVENTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.app,
  },
  header: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.soft,
  },
  list: {
    padding: theme.spacing.m,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    padding: theme.spacing.s,
  },
  dateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.s,
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.radius.s,
    marginRight: theme.spacing.m,
    minWidth: 50,
  },
  dateDay: {
    color: theme.colors.primary[600],
    fontWeight: 'bold',
  },
  dateMonth: {
    color: theme.colors.primary[500],
    textTransform: 'uppercase',
  },
  details: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  tag: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  eventTag: {
    backgroundColor: theme.colors.surface.soft,
  },
  holidayTag: {
    backgroundColor: '#FEF3C7', // Hardcode light yellow for warning
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.text.secondary,
  },
});
