import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';

interface FeeItemProps {
  title: string;
  amount: number;
  dueDate?: string;
  status?: 'paid' | 'pending' | 'partial';
  isLast?: boolean;
}

export const FeeItem: React.FC<FeeItemProps> = ({ title, amount, dueDate, status, isLast }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'paid': return theme.colors.status.success;
      case 'pending': return theme.colors.status.danger;
      case 'partial': return theme.colors.status.warning;
      default: return theme.colors.text.primary;
    }
  };

  const getIcon = () => {
    if (status === 'paid') return { name: 'check-circle', color: theme.colors.status.success };
    return { name: 'file-text', color: theme.colors.primary[600] };
  };

  const iconData = getIcon();

  return (
    <View style={[styles.container, isLast && styles.noBorder]}>
      <View style={[styles.iconBox, { backgroundColor: status === 'paid' ? theme.colors.status.success + '15' : theme.colors.primary[50] }]}>
        <Icon name={iconData.name} library="feather" size={20} color={iconData.color} />
      </View>

      <View style={styles.content}>
        <View style={styles.left}>
          <AppText weight="medium" size="m" color={theme.colors.text.primary}>{title}</AppText>
          {dueDate && (
            <AppText size="xs" color={theme.colors.text.tertiary} style={styles.date}>
              Due: {dueDate}
            </AppText>
          )}
        </View>
        <View style={styles.right}>
          <AppText weight="bold" size="m" color={theme.colors.text.primary}>₹ {amount.toLocaleString('en-IN')}</AppText>
          {status && (
            <AppText size="xs" color={getStatusColor()} style={styles.status} weight="medium">
              {status.toUpperCase()}
            </AppText>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.soft,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
