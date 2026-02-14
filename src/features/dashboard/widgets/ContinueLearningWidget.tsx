// Placeholder component to match "Pickup where you left" section
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';
import { AppCard } from '../../../components/ui/AppCard';

const RECENT_LESSONS = [
  { id: 1, subject: 'Science', topic: 'Ch 2: Motion', color: '#E3F2FD', iconColor: '#2196F3', progress: 0.75, type: 'video' },
  { id: 2, subject: 'Maths', topic: 'Algebra Basics', color: '#FFF3E0', iconColor: '#FF9800', progress: 0.45, type: 'book' },
  { id: 3, subject: 'English', topic: 'Grammar', color: '#E8F5E9', iconColor: '#4CAF50', progress: 0.20, type: 'article' },
];

export const ContinueLearningWidget = () => {
    const navigation = useNavigation<any>();

    const getIconName = (type: string) => {
        switch (type) {
            case 'video': return 'play';
            case 'book': return 'book';
            case 'article': return 'file-text';
            default: return 'play';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText size="m" weight="bold">Continue Learning</AppText>
                <TouchableOpacity onPress={() => navigation.navigate('Classes')}>
                    <AppText size="s" weight="bold" color={theme.colors.primary[500]}>See All</AppText>
                </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {RECENT_LESSONS.map((lesson) => (
                    <TouchableOpacity 
                        key={lesson.id} 
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('ClassDetails', { id: lesson.id })}
                    >
                        <View style={styles.cardContainer}>
                            {/* Top Half - Color/Image */}
                            <View style={[styles.cardTop, { backgroundColor: lesson.color }]}>
                                <View style={styles.playButton}>
                                    <Icon 
                                        name={getIconName(lesson.type)} 
                                        library="feather" 
                                        size={20} 
                                        color="#FFF" 
                                        style={lesson.type === 'video' ? { marginLeft: 2 } : {}} 
                                    />
                                </View>
                            </View>
                            
                            {/* Bottom Half - White Content */}
                            <View style={styles.cardBottom}>
                                <View style={styles.textContainer}>
                                    <View style={styles.topRow}>
                                        <AppText size="s" weight="bold" numberOfLines={1}>{lesson.subject}</AppText>
                                        <AppText size="xs" color={theme.colors.text.secondary} style={{fontSize: 10}}>30m left</AppText>
                                    </View>
                                    <AppText size="xs" color={theme.colors.text.secondary} numberOfLines={1} style={{ marginBottom: 12 }}>{lesson.topic}</AppText>
                                    
                                    {/* Usage of progress bar */}
                                    <View style={styles.progressBarBg}>
                                        <View style={[styles.progressBarFill, { width: `${lesson.progress * 100}%`, backgroundColor: lesson.iconColor }]} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.xl, // Increase bottom margin
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
        paddingHorizontal: theme.spacing.xs,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xs, // Align with outer padding
        paddingBottom: theme.spacing.m, // For shadow visibility
    },
    cardContainer: {
        width: 170,
        marginRight: theme.spacing.m,
        borderRadius: 12, // Reduced radius
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Reduced shadow
        shadowOpacity: 0.05, // Reduced opacity
        shadowRadius: 4, // Reduced radius
        elevation: 2, // Reduced elevation
        overflow: 'hidden',
    },
    cardTop: {
        height: 100, // Fixed height for top area
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cardBottom: {
        padding: theme.spacing.m,
        backgroundColor: '#FFF',
    },
    playButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.3)', // Lighter overlay
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#FFF'
    },
    textContainer: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    progressBarBg: {
        height: 4,
        backgroundColor: theme.colors.surface.soft, // Light gray
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    }
});
