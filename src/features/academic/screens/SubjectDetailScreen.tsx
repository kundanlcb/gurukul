import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';
import { AppStackParamList } from '../../../navigation/types';

// Define Route Prop
type SubjectDetailRouteProp = RouteProp<AppStackParamList, 'SubjectDetail'>;

// Mock Chapters Data
const CHAPTERS = [
    { id: '1', number: '01', title: 'Real Numbers', status: 'completed', duration: '45 mins' },
    { id: '2', number: '02', title: 'Polynomials', status: 'completed', duration: '1h 10m' },
    { id: '3', number: '03', title: 'Linear Equations in Two Variables', status: 'in-progress', duration: '50 mins' },
    { id: '4', number: '04', title: 'Quadratic Equations', status: 'locked', duration: '1h 05m' },
    { id: '5', number: '05', title: 'Arithmetic Progressions', status: 'locked', duration: '55 mins' },
    { id: '6', number: '06', title: 'Triangles', status: 'locked', duration: '1h 20m' },
];

export const SubjectDetailScreen = () => {
    const route = useRoute<SubjectDetailRouteProp>();

    // Fallback if params are missing
    const subject = route.params?.subject || {
        id: '1',
        name: 'Mathematics',
        teacher: 'Mr. John Doe',
        color: '#5A53D6',
        icon: 'divide-circle'
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return 'check-circle';
            case 'in-progress': return 'play-circle';
            case 'locked': return 'lock';
            default: return 'circle';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return theme.colors.status.success;
            case 'in-progress': return theme.colors.primary[600];
            case 'locked': return theme.colors.text.disabled;
            default: return theme.colors.text.disabled;
        }
    };

    return (
        <ScreenWrapper
            title="Details"
            showBack={true}
            headerAlign="left"
            headerNoBorder
        >
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header Section */}
                <View style={[styles.headerCard, { backgroundColor: subject.color }]}>
                    <View style={styles.headerContent}>
                        <View style={styles.iconContainer}>
                            <Icon name={subject.icon} size={40} color={subject.color} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <AppText size="xl" weight="bold" color="#FFFFFF">
                                {subject.name}
                            </AppText>
                            <AppText size="s" color="rgba(255,255,255,0.8)" style={{ marginTop: 4 }}>
                                {subject.teacher}
                            </AppText>
                        </View>
                    </View>
                    <View style={styles.progressContainer}>
                        <AppText size="s" weight="bold" color="#FFFFFF">Course Progress</AppText>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: '40%' }]} />
                        </View>
                        <AppText size="xs" color="rgba(255,255,255,0.8)" align="right" style={{ marginTop: 4 }}>
                            40% Completed
                        </AppText>
                    </View>
                </View>

                {/* Chapters List */}
                <View style={styles.chaptersSection}>
                    <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginBottom: 16, marginLeft: 4 }}>
                        Chapters
                    </AppText>

                    {CHAPTERS.map((chapter, index) => {
                        const isLocked = chapter.status === 'locked';
                        return (
                            <TouchableOpacity
                                key={chapter.id}
                                style={[styles.chapterCard, isLocked && styles.chapterCardLocked]}
                                disabled={isLocked}
                            >
                                <View style={styles.chapterNumberBox}>
                                    <AppText size="s" weight="bold" color={theme.colors.text.tertiary}>
                                        {chapter.number}
                                    </AppText>
                                </View>

                                <View style={styles.chapterInfo}>
                                    <AppText
                                        size="m"
                                        weight="bold"
                                        color={isLocked ? theme.colors.text.disabled : theme.colors.text.primary}
                                    >
                                        {chapter.title}
                                    </AppText>
                                    <View style={styles.metaRow}>
                                        <Icon name="clock" size={12} color={theme.colors.text.tertiary} />
                                        <AppText size="xs" color={theme.colors.text.tertiary} style={{ marginLeft: 4 }}>
                                            {chapter.duration}
                                        </AppText>
                                    </View>
                                </View>

                                <Icon
                                    name={getStatusIcon(chapter.status)}
                                    size={24}
                                    color={getStatusColor(chapter.status)}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.l,
        paddingBottom: 100,
    },
    headerCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    progressContainer: {
        marginTop: 8,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 3,
        marginTop: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
    },
    chaptersSection: {
        gap: 12,
    },
    chapterCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.colors.surface.default,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
        marginBottom: 12,
    },
    chapterCardLocked: {
        backgroundColor: theme.colors.surface.background,
        opacity: 0.8,
    },
    chapterNumberBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: theme.colors.surface.soft,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    chapterInfo: {
        flex: 1,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    }
});
