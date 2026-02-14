import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppCard } from '../../../components/ui/AppCard';
import { AppButton } from '../../../components/ui/AppButton';
import { StatusChip } from '../../../components/ui/StatusChip';
import { theme } from '../../../theme/tokens';
import { AcademicStackParamList } from '../../../navigation/types';

export const HomeworkDetailScreen = () => {
  const route = useRoute<RouteProp<AcademicStackParamList, 'HomeworkDetail'>>();
  // In real app, fetch details using ID
  const { id } = route.params;

  const [status, setStatus] = useState<'pending' | 'completed'>('pending');

  const handleMarkComplete = () => {
    setStatus('completed');
  };

  return (
    <ScreenWrapper title="Homework Details" showBack scrollable>
      <View style={styles.container}>
        <AppCard style={styles.content}>
            <View style={styles.header}>
                <AppText size="l" weight="bold">Mathematics</AppText>
                <StatusChip 
                    label={status === 'completed' ? 'Completed' : 'Pending'} 
                    status={status === 'completed' ? 'success' : 'warning'} 
                />
            </View>
            
            <AppText size="xl" weight="semibold" style={styles.title}>
                Chapter 5: Fractions Worksheet
            </AppText>

            <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                    <AppText size="xs" color={theme.colors.text.secondary}>Assigned</AppText>
                    <AppText weight="medium">12 Feb 2025</AppText>
                </View>
                 <View style={styles.metaItem}>
                    <AppText size="xs" color={theme.colors.text.secondary}>Due Date</AppText>
                    <AppText weight="medium" color={theme.colors.status.danger}>14 Feb 2025</AppText>
                </View>
            </View>

            <View style={styles.divider} />

            <AppText weight="bold" style={styles.sectionHeader}>Description</AppText>
            <AppText style={styles.description}>
                Complete the worksheet provided in class. 
                Focus on problems 10 to 25. 
                Remember to show your rough work for long division steps.
            </AppText>

            <View style={styles.divider} />
            
            <AppText weight="bold" style={styles.sectionHeader}>Attachments</AppText>
            <TouchableOpacity style={styles.attachment}>
                <View style={styles.fileIcon}>
                    <AppText size="xs" color="white" weight="bold">PDF</AppText>
                </View>
                <AppText style={{ flex: 1 }}>fractions_worksheet_ch5.pdf</AppText>
                <AppText size="s" color={theme.colors.primary[600]} weight="bold">Download</AppText>
            </TouchableOpacity>

        </AppCard>

        {status === 'pending' && (
             <AppButton 
                title="Mark as Completed" 
                onPress={handleMarkComplete} 
                style={styles.actionButton} 
            />
        )}
       
      </View>
    </ScreenWrapper>
  );
};
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  content: {
      padding: theme.spacing.l,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.s,
  },
  title: {
      marginBottom: theme.spacing.m,
  },
  metaRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.m,
  },
  metaItem: {
      marginRight: theme.spacing.xl,
  },
  divider: {
      height: 1,
      backgroundColor: theme.colors.border.soft,
      marginVertical: theme.spacing.m,
  },
  sectionHeader: {
      marginBottom: theme.spacing.s,
  },
  description: {
      lineHeight: 22,
      color: theme.colors.text.secondary,
  },
  attachment: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.s,
      borderWidth: 1,
      borderColor: theme.colors.border.soft,
      borderRadius: theme.radius.s,
      marginTop: theme.spacing.s,
  },
  fileIcon: {
      width: 32,
      height: 32,
      backgroundColor: theme.colors.status.danger,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.m,
  },
  actionButton: {
      marginTop: theme.spacing.l,
  }
});
