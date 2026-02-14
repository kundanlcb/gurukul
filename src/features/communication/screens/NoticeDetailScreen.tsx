import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { theme } from '../../../theme/tokens';
import { AppText } from '../../../components/ui/AppText';
import { MOCK_NOTICES } from './NoticesScreen';

export const NoticeDetailScreen = () => {
  const route = useRoute<any>();
  const { noticeId } = route.params;

  const notice = MOCK_NOTICES.find(n => n.id === noticeId);

  if (!notice) {
    return (
      <View style={styles.container}>
        <AppText>Notice not found</AppText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AppText size="xl" weight="bold" style={styles.title}>{notice.title}</AppText>
        <AppText size="s" color={theme.colors.text.secondary} style={styles.date}>{notice.date}</AppText>
        {notice.priority === 'high' && (
          <View style={styles.priorityBadge}>
            <AppText style={styles.priorityText}>High Priority</AppText>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <AppText size="s" style={styles.bodyText}>
          {notice.preview}
          {'\n\n'}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          {'\n\n'}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </AppText>
      </View>
    </ScrollView>
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
  title: {
    marginBottom: theme.spacing.s,
    color: theme.colors.text.primary,
  },
  date: {
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.s,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary[100],
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: theme.radius.s,
  },
  priorityText: {
    color: theme.colors.status.danger,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: theme.spacing.m,
  },
  bodyText: {
    lineHeight: 24,
    color: theme.colors.text.secondary,
  },
});
