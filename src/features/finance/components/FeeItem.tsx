import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';

interface FeeItemProps {
  title: string;
  amount: number;
  dueDate?: string;
  status?: 'paid' | 'pending' | 'partial';
}

export const FeeItem: React.FC<FeeItemProps> = ({ title, amount, dueDate, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'paid': return theme.colors.status.success;
      case 'pending': return theme.colors.status.danger;
      case 'partial': return theme.colors.status.warning;
      default: return theme.colors.text.primary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <AppText weight="medium">{title}</AppText>
        {dueDate && (
          <AppText size="xs" color={theme.colors.text.secondary} style={styles.date}>
            Due: {dueDate}
          </AppText>
        )}
      </View>
      <View style={styles.right}>
        <AppText weight="bold">₹ {amount.toLocaleString('en-IN')}</AppText>
        {status && (
            <AppText size="xs" color={getStatusColor()} style={styles.status}>
                {status.toUpperCase()}
            </AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.soft,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: 'flex-end',
  },
  date: {
      marginTop: 2,
  },
  status: {
      marginTop: 2,
      fontSize: 10,
  }
});
