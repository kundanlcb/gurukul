import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppCard } from '../../../components/ui/AppCard';
import { AppButton } from '../../../components/ui/AppButton';
import { FeeItem } from '../components/FeeItem';
import { theme } from '../../../theme/tokens';

const PENDING_FEES = [
  { id: '1', title: 'Tuition Fee (Q3)', amount: 15000, dueDate: '15 Aug 2025' },
  { id: '2', title: 'Transport Fee (Q3)', amount: 4500, dueDate: '15 Aug 2025' },
  { id: '3', title: 'Annual Day Charges', amount: 1000, dueDate: '15 Aug 2025' },
];

export const FeeScreen = () => {
  const navigation = useNavigation<any>();
  
  const totalDue = PENDING_FEES.reduce((sum, item) => sum + item.amount, 0);

  const handlePay = () => {
    Alert.alert('Payment Gateway', 'Initiating payment of ₹' + totalDue.toLocaleString('en-IN'));
  };

  return (
    <ScreenWrapper title="Fee Details" showBack headerRight={
        <AppText 
            size="s" 
            color={theme.colors.primary[600]} 
            weight="bold"
            onPress={() => navigation.navigate('PaymentHistory')}
        >
            History
        </AppText>
    }>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Total Due Card */}
        <AppCard style={styles.totalCard}>
            <AppText color={theme.colors.text.secondary}>Total Payable</AppText>
            <AppText size="xxl" weight="bold" color={theme.colors.primary[600]} style={styles.amount}>
                ₹ {totalDue.toLocaleString('en-IN')}
            </AppText>
            <AppButton title="Pay Now" onPress={handlePay} style={styles.payButton} />
        </AppCard>

        {/* Breakup */}
        <AppText size="l" weight="bold" style={styles.sectionTitle}>Breakup</AppText>
        <AppCard style={styles.listCard}>
            {PENDING_FEES.map((fee) => (
                <FeeItem 
                    key={fee.id}
                    title={fee.title}
                    amount={fee.amount}
                    dueDate={fee.dueDate}
                    status="pending"
                />
            ))}
             <View style={styles.totalRow}>
                <AppText weight="bold">Total</AppText>
                <AppText weight="bold">₹ {totalDue.toLocaleString('en-IN')}</AppText>
            </View>
        </AppCard>

        <AppText size="s" color={theme.colors.text.secondary} align="center" style={styles.note}>
            * Secure payments powered by Razorpay
        </AppText>

      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  totalCard: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
      marginBottom: theme.spacing.l,
      backgroundColor: theme.colors.primary[50],
      borderColor: theme.colors.primary[100],
      borderWidth: 1,
  },
  amount: {
      marginVertical: theme.spacing.s,
      fontSize: 32,
  },
  payButton: {
      marginTop: theme.spacing.m,
      width: '80%',
  },
  sectionTitle: {
      marginBottom: theme.spacing.m,
  },
  listCard: {
      paddingBottom: 0,
  },
  totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.m,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.soft,
      marginTop: theme.spacing.xs,
  },
  note: {
      marginTop: theme.spacing.xl,
  }
});
