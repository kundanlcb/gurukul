import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';
import Icon from 'react-native-vector-icons/Feather';

const LEADERBOARD_DATA = [
    { id: '1', rank: 1, name: 'Raquel Lei', class: 'Class X-A', points: 2450, avatar: 'RL' },
    { id: '2', rank: 2, name: 'Pedro Cruz', class: 'Class X-B', points: 2380, avatar: 'PC' },
    { id: '3', rank: 3, name: 'Jeff Lee', class: 'Class IX-A', points: 2310, avatar: 'JL' },
    { id: '4', rank: 4, name: 'Samantha Wyatt', class: 'Class X-A', points: 2100, avatar: 'SW' },
    { id: '5', rank: 5, name: 'Marques Lashley', class: 'Class XI-C', points: 1950, avatar: 'ML' },
    { id: '6', rank: 6, name: 'Steven Field', class: 'Class X-B', points: 1890, avatar: 'SF' },
    { id: '7', rank: 7, name: 'John Doe', class: 'Class X-A', points: 1750, avatar: 'JD' },
];

const TIMEFRAMES = ['Week', 'Month', 'Year', 'All time'];

export const LeaderboardScreen = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('Month');

    const topThree = LEADERBOARD_DATA.slice(0, 3);
    const otherStudents = LEADERBOARD_DATA.slice(3);

    const renderTopCard = (item: typeof LEADERBOARD_DATA[0]) => {
        const isFirst = item.rank === 1;
        // MATCHING DESIGN: #1 is Deep Purple/Blue, #2 & #3 are White for cleaner look
        const bgColor = isFirst ? '#5B50D6' : '#FFFFFF';
        const textColor = isFirst ? '#FFFFFF' : '#1F2937';
        const subTextColor = isFirst ? '#E0E7FF' : '#9CA3AF';

        // Avatar styling
        const ringColor = isFirst ? '#FBBF24' : item.rank === 2 ? '#60A5FA' : '#9CA3AF'; // Gold, Blue, Gray
        const avatarBg = isFirst ? '#EF4444' : item.rank === 2 ? '#3B82F6' : '#374151'; // Red, Blue, Dark

        return (
            <View style={[styles.topCard, { backgroundColor: bgColor }, !isFirst && styles.topCardShadow]}>
                <View style={[styles.rankBadgeTop, { backgroundColor: isFirst ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)' }]}>
                    <AppText size="xs" weight="bold" color={textColor}>#{item.rank}</AppText>
                </View>

                <View style={[styles.topAvatar, { backgroundColor: avatarBg, borderColor: ringColor }]}>
                    <AppText size="l" color="#FFF" weight="bold">{item.avatar}</AppText>
                </View>

                <View style={styles.topInfo}>
                    <AppText size="m" weight="bold" color={textColor} numberOfLines={1}>{item.name}</AppText>
                    <AppText size="s" color={subTextColor}>{item.class}</AppText>
                </View>
            </View>
        );
    };

    const renderListItem = ({ item, index }: { item: typeof LEADERBOARD_DATA[0], index: number }) => {
        // Rotating avatar colors
        const avatarColors = ['#60A5FA', '#F87171', '#34D399', '#818CF8'];
        const avatarBg = avatarColors[index % avatarColors.length];

        return (
            <View style={styles.listItem}>
                {/* Left Side: Avatar + Info */}
                <View style={styles.listLeftContent}>
                    <View style={[styles.listAvatar, { backgroundColor: avatarBg }]}>
                        <AppText size="m" color="#FFF" weight="medium">{item.avatar}</AppText>
                    </View>

                    <View style={styles.listInfo}>
                        <AppText size="m" weight="bold" color={theme.colors.text.primary} style={{ marginBottom: 2 }}>{item.name}</AppText>
                        <AppText size="s" color={theme.colors.text.secondary}>{item.class}</AppText>
                    </View>
                </View>

                {/* Right Side: Stats + Ribbon */}
                <View style={styles.listRightContent}>
                    <View style={styles.listStats}>
                        <AppText size="xs" color="#9CA3AF" style={{ marginBottom: 2 }}>Avg. Score</AppText>
                        <AppText size="m" weight="bold" color="#5B50D6">98%</AppText>
                    </View>

                    <View style={styles.rankBadgeList}>
                        <AppText size="s" weight="bold" color={theme.colors.text.secondary}>#{item.rank}</AppText>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <ScreenWrapper
            title="Leaderboard"
            showBack={false}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            headerAlign="left"
            headerSize="xxl"
            headerNoBorder
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Timeframe Tabs */}
                <View style={styles.tabsContainer}>
                    {TIMEFRAMES.map((tab) => {
                        const isActive = selectedTimeframe === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, isActive && styles.tabActive]}
                                onPress={() => setSelectedTimeframe(tab)}
                            >
                                <AppText
                                    size="s"
                                    weight={isActive ? 'bold' : 'medium'}
                                    color={isActive ? '#FFFFFF' : theme.colors.text.secondary}
                                >
                                    {tab}
                                </AppText>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Top 3 Section */}
                <View style={styles.topThreeContainer}>
                    {topThree.map((item) => (
                        <View key={item.id} style={styles.topCardWrapper}>
                            {renderTopCard(item)}
                        </View>
                    ))}
                </View>

                {/* Other List Header */}
                <View style={styles.sectionHeader}>
                    <AppText size="l" weight="bold" color={theme.colors.text.primary}>Other featured students</AppText>
                    <Icon name="chevron-right" size={20} color={theme.colors.text.primary} />
                </View>

                {/* List */}
                <View style={styles.listContainer}>
                    {otherStudents.map((item, index) => (
                        <View key={item.id}>
                            {renderListItem({ item, index })}
                        </View>
                    ))}
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 40,
        paddingTop: theme.spacing.m,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.l,
        marginBottom: theme.spacing.xl,
        gap: 8,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 24, // Pill shape
        backgroundColor: 'transparent',
    },
    tabActive: {
        backgroundColor: '#5A53D6',
    },
    topThreeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.l,
        marginBottom: theme.spacing.xl,
        gap: 12,
        alignItems: 'stretch',
    },
    topCardWrapper: {
        flex: 1,
    },
    topCard: {
        borderRadius: 12,
        padding: theme.spacing.m,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 160,
        width: '100%',
        position: 'relative', // For absolute positioning of rank badge
    },
    topCardShadow: {
        shadowOpacity: 0,
        elevation: 0,
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
    },
    rankBadgeTop: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)', // Subtle overlay
    },
    topAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: theme.spacing.m,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    topInfo: {
        alignItems: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.l,
        marginBottom: theme.spacing.m,
    },
    listContainer: {
        paddingHorizontal: theme.spacing.l,
        gap: 12,
        backgroundColor: '#F3F4F6',
        paddingBottom: 24,
        paddingTop: 12, // Added top padding for spacing
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        paddingRight: 16,
    },
    listLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    listAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listInfo: {
        flexDirection: 'column',
    },
    listRightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    listStats: {
        alignItems: 'flex-end',
    },
    rankBadgeList: {
        width: 32,
        height: 32,
        borderRadius: 12, // Rounded square/squircle
        backgroundColor: '#F3F4F6', // Light gray background
        alignItems: 'center',
        justifyContent: 'center',
    },
});
