import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  StyleProp,
  PressableProps,
  TextStyle,
} from 'react-native';
import { AppText } from './AppText';
import { theme } from '../../theme/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface AppButtonProps extends PressableProps {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: 's' | 'm' | 'l'; // Added to satisfy TS
  icon?: string; // Added to satisfy TS
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  disabled,
  style,
  textStyle,
  ...props
}) => {
  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return theme.colors.surface.soft;
    switch (variant) {
      case 'primary':
        return pressed ? theme.colors.primary[500] : theme.colors.primary[600];
      case 'secondary':
        return pressed ? theme.colors.surface.soft : theme.colors.primary[100];
      case 'danger':
        return theme.colors.status.danger;
      case 'ghost':
        return 'transparent';
      default:
        return theme.colors.primary[600];
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.text.secondary;
    switch (variant) {
      case 'primary':
      case 'danger':
        return theme.colors.text.inverse;
      case 'secondary':
        return theme.colors.primary[600];
      case 'ghost':
        return theme.colors.primary[600];
      default:
        return theme.colors.text.inverse;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: getBackgroundColor(pressed) },
        style,
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={getTextColor()}
          size="small"
        />
      ) : (
        <AppText weight="semibold" color={getTextColor()} size="m" style={textStyle}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: theme.radius.s,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
  },
});
