import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppInput } from '../../../components/ui/AppInput';
import { AppButton } from '../../../components/ui/AppButton';
import { useAuthStore } from '../store';
import { theme } from '../../../theme/tokens';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  
  const { requestOtp, isLoading } = useAuthStore();

  const handleSendOtp = async () => {
    // Basic validation
    if (!mobile || mobile.length < 10) {
      setValidationError('Please enter a valid mobile number');
      return;
    }
    setValidationError('');

    try {
      await requestOtp(mobile);
      navigation.navigate('OtpVerification', { mobile });
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to send OTP');
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder} />
          <AppText size="xxl" weight="bold" align="center" style={styles.title}>
            Gurukul
          </AppText>
          <AppText color={theme.colors.text.secondary} align="center">
            Parent & Student Portal
          </AppText>
        </View>

        <View style={styles.form}>
          <AppText size="xl" weight="semibold" style={styles.formTitle}>
            Login
          </AppText>
          
          <AppInput
            label="Mobile Number"
            placeholder="Enter 10-digit mobile number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            maxLength={10}
            error={validationError}
            autoFocus
          />

          <AppButton
            title="Get OTP"
            onPress={handleSendOtp}
            isLoading={isLoading}
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <AppText size="xs" align="center" color={theme.colors.text.secondary}>
            By continuing, you agree to our Terms & Privacy Policy
          </AppText>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.l,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.radius.m,
    marginBottom: theme.spacing.m,
  },
  title: {
    color: theme.colors.primary[600],
    marginBottom: theme.spacing.xs,
  },
  form: {
    marginBottom: theme.spacing.xl,
  },
  formTitle: {
    marginBottom: theme.spacing.l,
  },
  button: {
    marginTop: theme.spacing.m,
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing.l,
    left: 0,
    right: 0,
  },
});
