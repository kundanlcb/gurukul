import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { FeeItem } from '../components/FeeItem';
import { theme } from '../../../theme';
import { AppText } from '../../../components/ui/AppText';

const HISTORY_DATA = [
  { id: '101', title: 'Tuition Fee (Q2)', amount: 15000, date: '10 May 2025', status: 'paid' as const, method: 'UPI' },
  { id: '102', title: 'Transport Fee (Q2)', amount: 4500, date: '10 May 2025', status: 'paid' as const, method: 'Card' },
  { id: '103', title: 'Tuition Fee (Q1)', amount: 15000, date: '15 Feb 2025', status: 'paid' as const, method: 'NetBanking' },
];

export const PaymentHistoryScreen = () => {
  return (
    <ScreenWrapper title="Payment History" showBack>
      <View style={{ flex: 1 }}>
        <FlashList
          data={HISTORY_DATA}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                  <FeeItem 
                      title={item.title}
                      amount={item.amount}
                      status={item.status}
                  />
                  <View style={styles.meta}>
                      <AppText size="xs" color={theme.colors.text.secondary}>Paid on {item.date}</AppText>
                      <AppText size="xs" color={theme.colors.text.secondary}>via {item.method}</AppText>
                  </View>
              </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  list: {
      padding: theme.spacing.m,
  },
  itemWrapper: {
      marginBottom: theme.spacing.m,
      backgroundColor: theme.colors.surface.card,
      paddingHorizontal: theme.spacing.m,
      borderRadius: theme.radius.m,
      borderWidth: 1,
      borderColor: theme.colors.border.soft,
  },
  meta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: theme.spacing.s,
  }
});
