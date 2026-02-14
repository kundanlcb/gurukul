import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppCard } from '../../../components/ui/AppCard';
import { StatusChip, StatusVariant } from '../../../components/ui/StatusChip';
import { theme } from '../../../theme';

interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

const HOMEWORK_DATA: HomeworkItem[] = [
  { id: '1', subject: 'Mathematics', title: 'Chapter 5: Fractions Worksheet', dueDate: 'Tomorrow', status: 'pending' },
  { id: '2', subject: 'Science', title: 'Draw Plant Cell Diagram', dueDate: 'Friday', status: 'pending' },
  { id: '3', subject: 'English', title: 'Read Poem "Daffodils"', dueDate: 'Yesterday', status: 'overdue' },
  { id: '4', subject: 'History', title: 'Mughal Empire Summary', dueDate: '10 Feb', status: 'completed' },
  { id: '5', subject: 'Hindi', title: 'Premchand Story', dueDate: '08 Feb', status: 'completed' },
];

export const HomeworkListScreen = () => {
  const navigation = useNavigation<any>();

  const getStatusVariant = (status: string): StatusVariant => {
      switch(status) {
          case 'pending': return 'warning';
          case 'overdue': return 'danger';
          case 'completed': return 'success';
          default: return 'neutral';
      }
  };

  const renderItem = ({ item }: { item: HomeworkItem }) => (
    <TouchableOpacity 
        onPress={() => navigation.navigate('HomeworkDetail', { homeworkId: item.id })}
    >
        <AppCard style={styles.card}>
            <View style={styles.header}>
                <AppText size="xs" weight="bold" color={theme.colors.primary[600]} style={styles.subject}>
                    {item.subject.toUpperCase()}
                </AppText>
                <StatusChip label={item.status} status={getStatusVariant(item.status)} />
            </View>
            
            <AppText weight="medium" size="m" style={styles.title}>
                {item.title}
            </AppText>
            
            <View style={styles.footer}>
                <AppText size="xs" color={theme.colors.text.secondary}>
                    Due: {item.dueDate}
                </AppText>
            </View>
        </AppCard>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper title="Homework" showBack>
      <View style={{ flex: 1 }}>
        <FlashList
          data={HOMEWORK_DATA}
          renderItem={renderItem}
          // @ts-ignore
          estimatedItemSize={120}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  card: {
      marginBottom: theme.spacing.m,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
  },
  subject: {
      letterSpacing: 0.5,
  },
  title: {
      marginBottom: theme.spacing.s,
  },
  footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
  }
});
