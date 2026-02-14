import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Feather';

type Props = NativeStackScreenProps<AuthStackParamList, 'OtpVerify'>;

const OtpVerifyScreen: React.FC<Props> = ({ route, navigation }) => {
  const { mobile } = route.params;
  const [otp, setOtp] = useState('');
  const { verifyOtp, sendOtp, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }
    setError('');
    try {
      await verifyOtp(mobile, otp);
      // Navigation handled by RootNavigator (auth state change)
    } catch (e: any) {
      // Error handled in context usually, but we can set local error too
      setError(e.message || 'Invalid OTP');
    }
  };

  const handleResend = async () => {
    if (timer === 0) {
      await sendOtp(mobile);
      setTimer(30);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#1F2533" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to {'\n'}
            <Text style={styles.boldText}>+91 {mobile}</Text>
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.otpInput}
            placeholder="0 0 0 0"
            keyboardType="number-pad"
            maxLength={4}
            value={otp}
            onChangeText={setOtp}
            placeholderTextColor="#A0A0A0"
            textAlign="center"
            autoFocus
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity 
            style={[styles.button, otp.length !== 4 && styles.buttonDisabled]} 
            onPress={handleVerify}
            disabled={otp.length !== 4 || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Verify & Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
              <Text style={[styles.resendLink, timer > 0 && styles.resendDisabled]}>
                {timer > 0 ? `Resend in ${timer}s` : 'Resend Now'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center', // Center vertically
    marginTop: -80, // Offset closer to top
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2533',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E7583',
    textAlign: 'center',
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1F2533',
  },
  form: {
    width: '100%',
  },
  otpInput: {
    backgroundColor: '#F5F6F8',
    borderRadius: 16,
    height: 64,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2533',
    letterSpacing: 16, // Spacing between digits
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#5A53D6',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5A53D6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#BCC2CC',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#6E7583',
    fontSize: 14,
  },
  resendLink: {
    color: '#5A53D6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resendDisabled: {
    color: '#A0A0A0',
  }
});

export default OtpVerifyScreen;
