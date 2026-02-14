import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { AppText } from './AppText';
import { theme } from '../../theme/tokens';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <AppText size="s" weight="semibold" style={styles.label}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          !!error && styles.errorBorder,
          style,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.text.secondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && (
        <AppText size="xs" color={theme.colors.status.danger} style={styles.errorText}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text.primary,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border.soft,
    borderRadius: theme.radius.s,
    backgroundColor: theme.colors.surface.default,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
  },
  focused: {
    borderColor: theme.colors.primary[600],
    borderWidth: 1.5,
  },
  errorBorder: {
    borderColor: theme.colors.status.danger,
  },
  input: {
    fontFamily: theme.typography.fontFamily.primary.regular,
    fontSize: theme.typography.size.m,
    color: theme.colors.text.primary,
    height: '100%',
  },
  errorText: {
    marginTop: theme.spacing.xs,
  },
});
