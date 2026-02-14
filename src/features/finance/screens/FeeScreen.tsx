import React from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
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

const HISTORY_DATA = [
    { id: '101', title: 'Tuition Fee (Q2)', amount: 15000, date: '10 May 2025', status: 'paid' as const, method: 'UPI' },
    { id: '102', title: 'Transport Fee (Q2)', amount: 4500, date: '10 May 2025', status: 'paid' as const, method: 'Card' },
    { id: '103', title: 'Tuition Fee (Q1)', amount: 15000, date: '15 Feb 2025', status: 'paid' as const, method: 'NetBanking' },
];

export const FeeScreen = () => {
    const navigation = useNavigation<any>();
    const totalDue = PENDING_FEES.reduce((sum, item) => sum + item.amount, 0);

    const handlePay = () => {
        Alert.alert('Payment Gateway', 'Initiating payment of ₹' + totalDue.toLocaleString('en-IN'));
    };

    return (
        <ScreenWrapper title="Fee Details" showBack headerAlign="left">
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Total Due Card - Premium Gradient */}
                <LinearGradient
                    colors={[theme.colors.primary[500], theme.colors.primary[600]]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={styles.totalCard}
                >
                    <View style={styles.totalCardContent}>
                        <AppText color="rgba(255,255,255,0.9)" size="s" weight="medium" style={{ letterSpacing: 0.5 }}>
                            TOTAL PAYABLE
                        </AppText>
                        <AppText size="4xl" weight="bold" color="#FFF" style={styles.amount}>
                            ₹ {totalDue.toLocaleString('en-IN')}
                        </AppText>
                        <View style={styles.dueDateBadge}>
                            <AppText size="xs" color="#FFF" weight="medium">Due by 15 Aug 2025</AppText>
                        </View>

                        <AppButton
                            title="Pay Now"
                            onPress={handlePay}
                            style={[styles.payButton, { backgroundColor: '#FFF' }]}
                            textStyle={{ color: theme.colors.primary[600], fontWeight: 'bold' }}
                        />
                    </View>
                </LinearGradient>

                {/* Pending Fees Section */}
                <View style={styles.sectionHeader}>
                    <AppText size="l" weight="bold">Breakdown</AppText>
                </View>

                <View style={styles.cardContainer}>
                    {PENDING_FEES.map((fee, index) => (
                        <FeeItem
                            key={fee.id}
                            title={fee.title}
                            amount={fee.amount}
                            dueDate={fee.dueDate}
                            status="pending"
                            isLast={index === PENDING_FEES.length - 1}
                        />
                    ))}
                    <View style={styles.totalRow}>
                        <AppText weight="bold" size="m" color={theme.colors.text.secondary}>Total Amount</AppText>
                        <AppText weight="bold" size="xl" color={theme.colors.text.primary}>₹ {totalDue.toLocaleString('en-IN')}</AppText>
                    </View>
                </View>

                {/* Payment History Section */}
                <View style={[styles.sectionHeader, { marginTop: theme.spacing.xl }]}>
                    <AppText size="l" weight="bold">Payment History</AppText>
                </View>

                <View style={styles.historyContainer}>
                    {HISTORY_DATA.map((item) => (
                        <View key={item.id} style={styles.historyCard}>
                            <FeeItem
                                title={item.title}
                                amount={item.amount}
                                status={item.status}
                                isLast={true}
                            />
                            <View style={styles.historyMeta}>
                                <AppText size="xs" color={theme.colors.text.tertiary}>Paid on {item.date}</AppText>
                                <View style={styles.methodBadge}>
                                    <AppText size="xs" weight="medium" color={theme.colors.text.secondary}>{item.method}</AppText>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.secureNote}>
                    <AppText size="xs" color={theme.colors.text.tertiary} align="center">
                        Secure payments powered by Razorpay
                    </AppText>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        padding: theme.spacing.l,
        paddingTop: theme.spacing.m,
        paddingBottom: 40,
    },
    totalCard: {
        borderRadius: 24,
        marginBottom: theme.spacing.xl,
        shadowColor: theme.colors.primary[600],
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    totalCardContent: {
        padding: theme.spacing.xl,
        alignItems: 'center',
    },
    amount: {
        marginVertical: 8,
    },
    dueDateBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 20,
    },
    payButton: {
        width: '100%',
        height: 52, // Taller button
        borderRadius: 16,
    },
    sectionHeader: {
        marginBottom: theme.spacing.m,
        paddingHorizontal: 4,
    },
    cardContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: theme.spacing.l,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.l,
        marginTop: theme.spacing.s,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.soft,
    },
    // History Styles
    historyContainer: {
        gap: theme.spacing.m,
    },
    historyCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: theme.spacing.l,
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
    },
    historyMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.m,
        marginTop: theme.spacing.xs,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.soft,
    },
    methodBadge: {
        backgroundColor: theme.colors.surface.soft,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    secureNote: {
        marginTop: theme.spacing.xxl,
        marginBottom: theme.spacing.xl,
        alignItems: 'center',
    },
});
