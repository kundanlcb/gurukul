import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { ResultSummaryCard } from '../components/ResultSummaryCard';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';
import { useAuthStore } from '../../auth/store';

const RESULTS_DATA = [
    { id: '1', term: 'Half Yearly Exam', percentage: '88.5', grade: 'A', status: 'Pass' as const, date: 'Oct 2024' },
    { id: '2', term: 'Unit Test 1', percentage: '92.0', grade: 'A+', status: 'Pass' as const, date: 'Aug 2024' },
    { id: '3', term: 'Final Exam (Prev)', percentage: '85.2', grade: 'A', status: 'Pass' as const, date: 'Mar 2024' },
];

export const ResultsScreen = () => {
    const navigation = useNavigation<any>();
    const { user } = useAuthStore();

    const ListHeader = () => (
        <View style={styles.headerContainer}>
            {/* Student Overall Performance Card */}
            <View style={styles.studentCard}>
                <View style={styles.studentInfo}>
                    <View style={styles.avatar}>
                        <Image
                            source={{ uri: 'https://ui-avatars.com/api/?name=David+Warner&background=random' }}
                            style={styles.avatarImage}
                        />
                    </View>
                    <View>
                        <AppText size="l" weight="bold" color="#FFF">{user?.name || 'David Warner'}</AppText>
                        <AppText size="s" color="rgba(255,255,255,0.8)">Class X-A</AppText>
                    </View>
                </View>

                <View style={styles.overallStats}>
                    <AppText size="xxl" weight="bold" color="#FFF">88.5%</AppText>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: '88.5%' }]} />
                    </View>
                    <AppText size="xs" color="rgba(255,255,255,0.8)">Overall Percentage</AppText>
                </View>
            </View>

            <AppText size="l" weight="bold" style={styles.sectionTitle}>Exam Results</AppText>

            {/* Tab Filters Placeholder */}
            <View style={styles.filterTabs}>
                <View style={styles.activeFilterTab}>
                    <AppText size="s" weight="bold" color={theme.colors.primary[600]}>All Exams</AppText>
                    <View style={styles.activeIndicator} />
                </View>
                <View style={styles.filterTab}>
                    <AppText size="s" color={theme.colors.text.secondary}>Quarterly</AppText>
                </View>
                <View style={styles.filterTab}>
                    <AppText size="s" color={theme.colors.text.secondary}>Half Yearly</AppText>
                </View>
                <View style={styles.filterTab}>
                    <AppText size="s" color={theme.colors.text.secondary}>Annual</AppText>
                </View>
            </View>
        </View>
    );

    return (
        <ScreenWrapper title="My Results" showBack={false}>
            <View style={{ flex: 1 }}>
                <FlashList
                    data={RESULTS_DATA}
                    ListHeaderComponent={ListHeader}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ResultSummaryCard
                            term={item.term}
                            percentage={item.percentage}
                            grade={item.grade}
                            status={item.status}
                            date={item.date}
                            onPress={() => navigation.navigate('ResultDetail', { resultId: item.id, term: item.term })}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    // @ts-ignore
                    estimatedItemSize={100}
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: theme.spacing.m,
        paddingBottom: 100, // Space for tab bar
    },
    headerContainer: {
        marginBottom: theme.spacing.m,
    },
    studentCard: {
        backgroundColor: theme.colors.primary[600],
        borderRadius: 16,
        padding: theme.spacing.l,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        shadowColor: theme.colors.primary[600],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginRight: theme.spacing.m,
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    overallStats: {
        alignItems: 'flex-end',
        maxWidth: 100,
    },
    progressBarBg: {
        width: 80,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
        marginVertical: 4,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFF',
        borderRadius: 2,
    },
    sectionTitle: {
        marginBottom: theme.spacing.m,
    },
    filterTabs: {
        flexDirection: 'row',
        marginBottom: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.soft,
    },
    filterTab: {
        paddingVertical: theme.spacing.s,
        marginRight: theme.spacing.xl,
    },
    activeFilterTab: {
        paddingVertical: theme.spacing.s,
        marginRight: theme.spacing.xl,
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: theme.colors.primary[600],
    },
});
