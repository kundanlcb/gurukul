import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppInput } from '../../../components/ui/AppInput';
import { AppButton } from '../../../components/ui/AppButton';
import { useAuthStore } from '../store';
import { theme } from '../../../theme/tokens';

type AuthStackParamList = {
  OtpVerification: { mobile: string };
};

export const OtpVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AuthStackParamList, 'OtpVerification'>>();
  const { mobile } = route.params;

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  
  const { verifyOtp, requestOtp, isLoading, error } = useAuthStore();

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter a valid OTP');
      return;
    }

    try {
      await verifyOtp(mobile, otp);
      // Navigation is usually handled by the RootNavigator listening to auth state,
      // but explicit check helps if needed. 
    } catch (e) {
      // Error is stored in store and displayed, or we can alert
      // Alert handled in store or UI
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    try {
      await requestOtp(mobile);
      setTimer(30);
      Alert.alert('Sent', 'OTP resent successfully');
    } catch (e) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  return (
    <ScreenWrapper title="Verification" showBack>
      <View style={styles.container}>
        <AppText style={styles.subtitle} color={theme.colors.text.secondary}>
          We have sent a verification code to +91 {mobile}
        </AppText>

        <View style={styles.form}>
          <AppInput
            label="Enter OTP"
            placeholder="XXXX"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            error={error || undefined}
            autoFocus
            style={styles.otpInput}
          />

          <AppButton
            title="Verify"
            onPress={handleVerify}
            isLoading={isLoading}
            style={styles.button}
          />

          <View style={styles.resendContainer}>
            <AppText color={theme.colors.text.secondary} size="s">
              Didn't receive code?{' '}
            </AppText>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
              <AppText
                weight="semibold"
                size="s"
                color={timer > 0 ? theme.colors.text.disabled : theme.colors.primary[600]}
              >
                {timer > 0 ? `Resend in ${timer}s` : 'Resend Now'}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.l,
  },
  subtitle: {
    marginBottom: theme.spacing.xl,
  },
  form: {
    marginTop: theme.spacing.m,
  },
  otpInput: {
    textAlign: 'center',
    letterSpacing: 8,
    fontSize: 24,
  },
  button: {
    marginTop: theme.spacing.l,
  },
  resendContainer: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
