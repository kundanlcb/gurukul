import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../theme/tokens';
import { AppText } from '../../../components/ui/AppText';
import { AppCard } from '../../../components/ui/AppCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

export const MOCK_NOTICES = [
  { 
      id: '1', 
      title: 'Start of Term Exams', 
      date: '2023-10-23', 
      preview: 'The mid-term exams will commence from next Monday. Please ensure students come prepared with necessary stationery.', 
      priority: 'high', 
      read: false 
  },
  { 
      id: '2', 
      title: 'Winter Uniform Update', 
      date: '2023-10-20', 
      preview: 'Students must wear winter uniform starting Nov 1st. Blazers are mandatory for morning assembly.', 
      priority: 'medium', 
      read: true 
  },
  { 
      id: '3', 
      title: 'Parent Teacher Meeting', 
      date: '2023-10-15', 
      preview: 'PTM is scheduled for next Saturday. Slots will be shared shortly via email.', 
      priority: 'high', 
      read: true 
  },
  { 
      id: '4', 
      title: 'Diwali Holidays', 
      date: '2023-10-10', 
      preview: 'School will remain closed for Diwali break from Oct 24th to Oct 29th.', 
      priority: 'low', 
      read: true 
  },
  { 
      id: '5', 
      title: 'Science Fair Winners', 
      date: '2023-10-05', 
      preview: 'Congratulations to Grade 5B for winning the inter-school science fair!', 
      priority: 'low', 
      read: true 
  },
];

export const NoticesScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const renderItem = ({ item }: { item: typeof MOCK_NOTICES[0] }) => (
        <TouchableOpacity onPress={() => navigation.navigate('NoticeDetail', { noticeId: item.id })}>
            <AppCard style={[styles.card, !item.read && styles.unreadCard]}>
                <View style={styles.headerRow}>
                    <AppText size="s" weight="medium" style={styles.date}>{item.date}</AppText>
                    {item.priority === 'high' && (
                        <View style={styles.badge}>
                            <AppText size="xs" weight="bold" style={styles.badgeText}>IMPORTANT</AppText>
                        </View>
                    )}
                </View>
                <AppText size="m" weight="bold" style={[styles.title, !item.read && styles.unreadText]}>{item.title}</AppText>
                <AppText size="s" color={theme.colors.text.secondary} numberOfLines={2}>{item.preview}</AppText>
            </AppCard>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.screenHeader}>
                <AppText size="xl" weight="bold">School Notices</AppText>
            </View>
            <FlashList
                data={MOCK_NOTICES}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface.app,
    },
    screenHeader: {
        padding: theme.spacing.m,
        paddingTop: theme.spacing.xl,
        backgroundColor: theme.colors.surface.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.soft,
    },
    listContent: {
        padding: theme.spacing.m,
        paddingBottom: theme.spacing.xxl,
    },
    card: {
        marginBottom: theme.spacing.m,
        borderLeftWidth: 4,
        borderLeftColor: 'transparent',
    },
    unreadCard: {
        borderLeftColor: theme.colors.primary[500],
        backgroundColor: theme.colors.primary[100],
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    date: {
        color: theme.colors.text.secondary,
    },
    title: {
        marginBottom: theme.spacing.xs,
    },
    unreadText: {
        fontWeight: '700',
        color: theme.colors.primary[600],
    },
    badge: {
        backgroundColor: theme.colors.primary[100], // Fallback for error[100]
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: 2,
        borderRadius: theme.radius.s,
    },
    badgeText: {
        color: theme.colors.status.danger,
        fontWeight: 'bold',
    },
});
