import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';
import { RootStackParamList } from '../../../navigation/types';

// Mock Notification Data
const NOTIFICATIONS = [
    {
        id: '1',
        title: 'Assignment Due Tomorrow',
        description: 'Mathematics Chapter 5 exercises are due tomorrow at 5:00 PM. Don\'t forget to submit!',
        time: '2 hours ago',
        type: 'academic',
        isRead: false,
    },
    {
        id: '2',
        title: 'School Holiday Notice',
        description: 'The school will remain closed on Friday, 25th Oct for Diwali celebrations.',
        time: '5 hours ago',
        type: 'system',
        isRead: true,
    },
    {
        id: '3',
        title: 'New Exam Schedule',
        description: 'The Mid-Term exam schedule has been updated. Please check the Academics tab.',
        time: '1 day ago',
        type: 'academic',
        isRead: false,
    },
    {
        id: '4',
        title: 'Fee Payment Reminder',
        description: 'Your tuition fee for the month of October is pending. Please pay by 30th Oct to avoid late fees.',
        time: '2 days ago',
        type: 'system',
        isRead: true,
    },
    {
        id: '5',
        title: 'Sports Day Registration',
        description: 'Registration for the Annual Sports Day is now open. Sign up with your class teacher.',
        time: '3 days ago',
        type: 'system',
        isRead: true,
    }
];

const FILTERS = ['All', 'Unread', 'Academic', 'System'];

type NotificationNavProp = NativeStackNavigationProp<RootStackParamList>;

export const NotificationScreen = () => {
    const navigation = useNavigation<NotificationNavProp>();
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredNotifications = NOTIFICATIONS.filter(item => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Unread') return !item.isRead;
        return item.type.toLowerCase() === activeFilter.toLowerCase();
    });

    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => {
        const iconName = item.type === 'academic' ? 'book' : 'info';
        const iconColor = item.type === 'academic' ? theme.colors.primary[600] : theme.colors.status.warning;
        const iconBg = item.type === 'academic' ? theme.colors.primary[50] : theme.colors.status.warning + '20';

        return (
            <TouchableOpacity
                style={[styles.notificationItem, !item.isRead && styles.unreadItem]}
                onPress={() => navigation.navigate('NotificationDetail', { notification: item })}
            >
                <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
                    <Icon name={iconName} size={20} color={iconColor} />
                    {!item.isRead && <View style={styles.unreadDot} />}
                </View>
                <View style={styles.contentBox}>
                    <View style={styles.headerRow}>
                        <AppText size="m" weight={!item.isRead ? 'bold' : 'medium'} color={theme.colors.text.primary} style={{ flex: 1 }}>
                            {item.title}
                        </AppText>
                        <AppText size="xs" color={theme.colors.text.tertiary}>
                            {item.time}
                        </AppText>
                    </View>
                    <AppText size="s" color={theme.colors.text.secondary} numberOfLines={2} style={{ marginTop: 4 }}>
                        {item.description}
                    </AppText>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenWrapper
            title="Notifications"
            showBack={true}
            headerAlign="left"
            headerSize="l"
            headerNoBorder
        >
            <View style={styles.container}>
                {/* Filters */}
                <View style={styles.filterContainer}>
                    <FlatList
                        horizontal
                        data={FILTERS}
                        keyExtractor={(item) => item}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filterList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.filterChip, activeFilter === item && styles.activeFilterChip]}
                                onPress={() => setActiveFilter(item)}
                            >
                                <AppText
                                    size="s"
                                    weight="medium"
                                    color={activeFilter === item ? '#FFF' : theme.colors.text.secondary}
                                >
                                    {item}
                                </AppText>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Notification List */}
                <FlatList
                    data={filteredNotifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Icon name="bell-off" size={48} color={theme.colors.text.disabled} />
                            <AppText size="m" color={theme.colors.text.secondary} style={{ marginTop: 16 }}>
                                No notifications found
                            </AppText>
                        </View>
                    }
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface.background,
    },
    filterContainer: {
        paddingVertical: theme.spacing.m,
    },
    filterList: {
        paddingHorizontal: theme.spacing.l,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: theme.colors.surface.default,
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
    },
    activeFilterChip: {
        backgroundColor: theme.colors.primary[600],
        borderColor: theme.colors.primary[600],
    },
    listContent: {
        padding: theme.spacing.l,
        paddingTop: 0,
    },
    notificationItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: theme.colors.surface.default,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
    },
    unreadItem: {
        backgroundColor: theme.colors.primary[50] + '40', // Very subtle tint
        borderColor: theme.colors.primary[100],
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        position: 'relative',
    },
    unreadDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.status.danger,
        borderWidth: 2,
        borderColor: theme.colors.surface.default,
    },
    contentBox: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    }
});
