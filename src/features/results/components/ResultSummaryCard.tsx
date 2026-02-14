import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppCard } from '../../../components/ui/AppCard';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';
import { StatusChip } from '../../../components/ui/StatusChip';

interface ResultSummaryProps {
  term: string;
  percentage: string;
  grade: string;
  status: 'Pass' | 'Fail';
  date: string;
  onPress: () => void;
}

export const ResultSummaryCard: React.FC<ResultSummaryProps> = ({
  term,
  percentage,
  grade,
  status,
  date,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppCard style={styles.card}>
        <View style={styles.header}>
            <View>
                <AppText weight="bold" size="l">{term}</AppText>
                <AppText size="xs" color={theme.colors.text.secondary}>{date}</AppText>
            </View>
            <StatusChip 
                label={status} 
                status={status === 'Pass' ? 'success' : 'danger'} 
            />
        </View>

        <View style={styles.divider} />

        <View style={styles.statsRow}>
            <View style={styles.statItem}>
                <AppText size="xs" color={theme.colors.text.secondary}>Percentage</AppText>
                <AppText size="xl" weight="bold" color={theme.colors.primary[600]}>
                    {percentage}%
                </AppText>
            </View>
             <View style={styles.statItem}>
                <AppText size="xs" color={theme.colors.text.secondary}>Grade</AppText>
                <AppText size="xl" weight="bold" color={theme.colors.text.primary}>
                    {grade}
                </AppText>
            </View>
             <View style={styles.statItem}>
                 {/* Placeholder for rank or other stat */}
                <AppText size="xs" color={theme.colors.text.secondary}>Action</AppText>
                <AppText size="s" color={theme.colors.primary[600]} weight="semibold">View</AppText>
            </View>
        </View>
      </AppCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.m,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.m,
  },
  divider: {
      height: 1,
      backgroundColor: theme.colors.border.soft,
      marginBottom: theme.spacing.m,
  },
  statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  statItem: {
      alignItems: 'flex-start',
  }
});
