import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';

const DAYS = [
    { day: 'Mon', date: '18' },
    { day: 'Tue', date: '19' },
    { day: 'Wed', date: '20' },
    { day: 'Thu', date: '21' },
    { day: 'Fri', date: '22' },
    { day: 'Sat', date: '23' },
];

export const CATEGORY_COLORS = {
    science: { bg: '#E0F2FE', text: '#0C4A6E', primary: '#5A53D6', iconBg: '#5A53D6' }, // Blue/Purple (Brand)
    math: { bg: '#FFEDD5', text: '#7C2D12', primary: '#5A53D6', iconBg: '#5A53D6' },
    arts: { bg: '#F3E8FF', text: '#581C87', primary: '#5A53D6', iconBg: '#5A53D6' },
    lang: { bg: '#E0E7FF', text: '#312E81', primary: '#5A53D6', iconBg: '#5A53D6' },
    bio: { bg: '#86EFAC', text: '#064E3B', primary: '#16A34A', iconBg: '#15803D' },
    break: { bg: '#F5F5F5', text: '#525252', primary: '#737373', iconBg: '#737373' },
};

export const TIMETABLE_DATA: Record<string, Array<{ startTime: string; endTime: string; subject: string; teacher: string; category: string; isActive?: boolean }>> = {
    '18': [
        { startTime: '09:00', endTime: '09:45', subject: 'Biology', teacher: 'Mzia Mumladze', category: 'bio', isActive: true },
        { startTime: '10:00', endTime: '10:45', subject: 'Geography', teacher: 'Tea Mirashvili', category: 'arts' },
        { startTime: '12:00', endTime: '12:45', subject: 'Math', teacher: 'Marry Dalakishvilil', category: 'math' },
        { startTime: '13:00', endTime: '13:45', subject: 'Chemistry', teacher: 'Dako Mas', category: 'science' },
        { startTime: '14:00', endTime: '14:45', subject: 'English', teacher: 'Nano Gvar', category: 'lang' },
    ],
    '19': [
        { startTime: '09:00', endTime: '09:45', subject: 'Math', teacher: 'Marry Dalakishvilil', category: 'math' },
        { startTime: '10:00', endTime: '10:45', subject: 'Physics', teacher: 'Tea Mirashvili', category: 'science' },
    ]
};

export const TimetableScreen = () => {
    const [selectedDate, setSelectedDate] = useState('18');

    const getSubjectIcon = (subject: string): string => {
        const lowerSubject = subject.toLowerCase();
        if (lowerSubject.includes('math')) return 'divide-circle';
        if (lowerSubject.includes('science') || lowerSubject.includes('physics') || lowerSubject.includes('chemistry')) return 'hexagon';
        if (lowerSubject.includes('bio')) return 'activity';
        if (lowerSubject.includes('geography') || lowerSubject.includes('history')) return 'globe';
        if (lowerSubject.includes('english') || lowerSubject.includes('lang')) return 'book-open';
        if (lowerSubject.includes('computer') || lowerSubject.includes('tech')) return 'monitor';
        if (lowerSubject.includes('sport') || lowerSubject.includes('gym')) return 'dribbble';
        if (lowerSubject.includes('art') || lowerSubject.includes('music')) return 'music';
        return 'book';
    };

    return (
        <ScreenWrapper
            title="Agenda"
            showBack={false}
            headerAlign="left"
            headerSize="xxl"
            headerNoBorder
        >
            <View style={styles.container}>
                {/* Date Strip */}
                <View style={styles.dateStripContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateScroll}>
                        {DAYS.map((item) => {
                            const isSelected = selectedDate === item.date;
                            return (
                                <TouchableOpacity
                                    key={item.date}
                                    style={[styles.dateItem, isSelected && styles.dateItemActive]}
                                    onPress={() => setSelectedDate(item.date)}
                                >
                                    <AppText
                                        size="xs"
                                        weight={isSelected ? 'bold' : 'regular'}
                                        color={isSelected ? '#FFF' : theme.colors.text.secondary}
                                        style={{ marginBottom: 4 }}
                                    >
                                        {item.day}
                                    </AppText>
                                    <AppText
                                        size="m"
                                        weight="bold"
                                        color={isSelected ? '#FFF' : theme.colors.text.primary}
                                    >
                                        {item.date}
                                    </AppText>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Timeline */}
                <ScrollView contentContainerStyle={styles.timelineContent}>
                    {TIMETABLE_DATA[selectedDate]?.map((item, index, arr) => {
                        const colors = CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.break;
                        const isActive = item.isActive;
                        const isLast = index === arr.length - 1;

                        const cardBg = isActive ? colors.bg : '#FFFFFF';
                        const subjectColor = isActive ? colors.text : colors.primary;
                        const teacherColor = isActive ? colors.text : theme.colors.text.secondary;

                        return (
                            <View key={index} style={styles.timelineRow}>
                                {/* Time Column */}
                                <View style={styles.timeColumn}>
                                    <AppText
                                        size="m"
                                        weight="bold"
                                        color={isActive ? theme.colors.primary[600] : theme.colors.text.primary}
                                        style={{ marginBottom: 4 }}
                                    >
                                        {item.startTime}
                                    </AppText>
                                    <AppText size="s" color={theme.colors.text.tertiary}>
                                        {item.endTime}
                                    </AppText>
                                </View>

                                {/* Timeline Decoration */}
                                <View style={styles.timelineDecoration}>
                                    {index !== 0 && <View style={styles.timelineLineTop} />}
                                    {!isLast && <View style={styles.timelineLineBottom} />}
                                    <View style={[styles.timelineDot, {
                                        backgroundColor: isActive ? theme.colors.primary[600] : theme.colors.text.disabled,
                                        borderColor: isActive ? theme.colors.primary[100] : theme.colors.surface.background,
                                    }]} />
                                </View>

                                {/* Card Column */}
                                <View style={styles.cardContainer}>
                                    <View style={[
                                        styles.cardContent,
                                        { backgroundColor: cardBg }
                                    ]}>
                                        <View style={styles.cardHeader}>
                                            <AppText
                                                size="l"
                                                weight="bold"
                                                color={subjectColor}
                                                style={{ flex: 1 }}
                                            >
                                                {item.subject}
                                            </AppText>

                                            <View style={styles.headerRight}>
                                                {isActive && <View style={styles.activeDot} />}

                                                <View style={[styles.subjectIconBox]}>
                                                    <Icon
                                                        name={getSubjectIcon(item.subject)}
                                                        library="feather"
                                                        size={18}
                                                        color={subjectColor}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.teacherRow}>
                                            <View style={[styles.avatarPlaceholder, { backgroundColor: isActive ? colors.iconBg : theme.colors.primary[100] }]}>
                                                <AppText size="xs" color={isActive ? '#FFF' : theme.colors.primary[600]} weight="bold">
                                                    {item.teacher.charAt(0)}
                                                </AppText>
                                            </View>
                                            <AppText
                                                size="s"
                                                color={teacherColor}
                                                style={{ opacity: isActive ? 0.9 : 1 }}
                                            >
                                                {item.teacher}
                                            </AppText>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                    {(!TIMETABLE_DATA[selectedDate] || TIMETABLE_DATA[selectedDate].length === 0) && (
                        <View style={styles.emptyState}>
                            <AppText color={theme.colors.text.secondary}>No schedule for this day</AppText>
                        </View>
                    )}
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dateStripContainer: {
        paddingVertical: theme.spacing.m,
    },
    dateScroll: {
        paddingHorizontal: theme.spacing.l,
        gap: theme.spacing.m,
    },
    dateItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 72,
        borderRadius: 14,
        backgroundColor: 'transparent',
    },
    dateItemActive: {
        backgroundColor: theme.colors.primary[600],
        shadowColor: theme.colors.primary[600],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    timelineContent: {
        paddingHorizontal: theme.spacing.l,
        paddingBottom: 100,
        paddingTop: theme.spacing.m,
    },
    timelineRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.l,
    },
    timeColumn: {
        width: 60,
        justifyContent: 'center', // Center vertically
    },
    timelineDecoration: {
        width: 24,
        alignItems: 'center',
        justifyContent: 'center', // Center vertically
        marginRight: theme.spacing.s,
        position: 'relative',
    },
    timelineLineTop: {
        position: 'absolute',
        top: 0,
        bottom: '50%',
        width: 2,
        backgroundColor: theme.colors.border.soft,
        left: 11,
    },
    timelineLineBottom: {
        position: 'absolute',
        top: '50%',
        bottom: -theme.spacing.l, // Extend to cover margin
        width: 2,
        backgroundColor: theme.colors.border.soft,
        left: 11,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        zIndex: 1, // Center by flexbox, no margin needed
    },
    cardContainer: {
        flex: 1,
        minHeight: 110,
        backgroundColor: 'transparent',
    },
    cardContent: {
        flex: 1,
        borderRadius: 16, // Reduced corner radius
        padding: theme.spacing.l,
        justifyContent: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
        height: 28, // Increased height to accommodate icon
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subjectIconBox: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    teacherRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#000',
        opacity: 0.2,
    },
    avatarPlaceholder: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    dotsMenu: {
        flexDirection: 'column',
        gap: 3,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
    },
    emptyState: {
        padding: theme.spacing.xl,
        alignItems: 'center',
    }
});
