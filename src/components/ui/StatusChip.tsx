import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../../theme/tokens';

export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusChipProps {
  label: string;
  status: StatusVariant;
}

export const StatusChip: React.FC<StatusChipProps> = ({ label, status }) => {
  const getColors = () => {
    switch (status) {
      case 'success':
        return { bg: theme.colors.status.success + '20', text: theme.colors.status.success };
      case 'warning':
        return { bg: theme.colors.status.warning + '20', text: theme.colors.status.warning };
      case 'danger':
        return { bg: theme.colors.status.danger + '20', text: theme.colors.status.danger };
      case 'info':
        return { bg: theme.colors.primary[100], text: theme.colors.primary[600] };
      default:
        return { bg: theme.colors.surface.soft, text: theme.colors.text.secondary };
    }
  };

  const colors = getColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <AppText size="xs" weight="semibold" style={{ color: colors.text }}>
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs / 2,
    borderRadius: theme.radius.full,
    alignSelf: 'flex-start',
  },
});
