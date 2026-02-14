import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Animated, 
  StyleSheet, 
  TextInputProps, 
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native';
import { theme } from '../../theme/tokens';
import { Icon } from './Icon';

interface FloatingInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FloatingInput = React.forwardRef<TextInput, FloatingInputProps>(({
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  placeholder, // Note: placeholder usually conflicts with floating label logic if shown initially
  secureTextEntry,
  style,
  error,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Animation state: 0 = placeholder position, 1 = floating position
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: (isFocused || value) ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // fontSize/color do not support native driver
    }).start();
  }, [isFocused, value]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Interpolations
  const labelTop = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0], // Adjust based on height
  });

  const labelSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const labelColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.text.tertiary, theme.colors.primary[600]],
  });

  const borderColor = isFocused 
    ? theme.colors.primary[600] 
    : (error ? theme.colors.status.danger : theme.colors.border.default);
    
  const labelTextColor = error 
    ? theme.colors.status.danger 
    : (isFocused ? theme.colors.primary[600] : theme.colors.text.secondary);

  const isSecure = secureTextEntry && !isPasswordVisible;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.inputContainer, { borderBottomColor: borderColor }]}>
        <Animated.Text
          style={[
            styles.label,
            {
              top: labelTop,
              fontSize: labelSize,
              color: labelColor,
            }
          ]}
        >
          {label}
        </Animated.Text>
        
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isSecure}
          style={[styles.input, { color: theme.colors.text.primary }]}
          placeholderTextColor="transparent" // Hide default placeholder
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
            <Icon 
              name={isPasswordVisible ? 'eye-off' : 'eye'} 
              library="feather" 
              size={20} 
              color={theme.colors.text.tertiary} 
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Animated.Text style={styles.errorText}>
          {error}
        </Animated.Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.l,
  },
  inputContainer: {
    height: 56,
    borderBottomWidth: 1.5,
    justifyContent: 'flex-end',
    position: 'relative',
    paddingBottom: 8,
  },
  label: {
    position: 'absolute',
    left: 0,
    fontFamily: theme.typography.fontFamily.primary.regular,
  },
  input: {
    fontSize: 16,
    padding: 0,
    marginTop: 16, // Space for label
    fontFamily: theme.typography.fontFamily.primary.regular,
    height: 32,
    textAlignVertical: 'center',
    paddingRight: 32, // Space for eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
  errorText: {
    color: theme.colors.status.danger,
    fontSize: theme.typography.size.xs,
    marginTop: 4,
  },
});
