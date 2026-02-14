import React from 'react';
import { View, StyleSheet, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { theme } from '../../theme/tokens';

interface AppCardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat' | 'premium';
  padding?: keyof typeof theme.spacing;
  radius?: keyof typeof theme.radius;
  style?: StyleProp<ViewStyle>;
}

export const AppCard: React.FC<AppCardProps> = ({
  variant = 'elevated',
  padding = 'm',
  radius = 'm',
  style,
  children,
  ...props
}) => {
  return (
    <View 
      style={[
        styles.base, 
        { 
          padding: theme.spacing[padding], 
          borderRadius: theme.radius[radius] 
        },
        styles[variant], 
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.surface.card,
  },
  elevated: {
    ...theme.shadows.sm,
    backgroundColor: theme.colors.surface.card,
  },
  premium: {
    ...theme.shadows.md,
    backgroundColor: theme.colors.premium.card,
    borderColor: theme.colors.premium.border,
    borderWidth: 1,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border.soft,
    backgroundColor: 'transparent',
  },
  flat: {
    backgroundColor: theme.colors.surface.soft,
    borderWidth: 0,
  },
});
