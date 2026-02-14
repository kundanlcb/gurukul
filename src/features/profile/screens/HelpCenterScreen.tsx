import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, LayoutAnimation, TouchableOpacity, UIManager, Platform, Linking } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQS = [
    {
        id: '1',
        question: 'How do I pay my fees?',
        answer: 'You can pay your fees by navigating to the "Fee Payment" section in the profile or finance tab. We accept UPI, Credit/Debit cards, and Net Banking.'
    },
    {
        id: '2',
        question: 'Where can I check my attendance?',
        answer: 'You can check your attendance in the "Academic" tab. It shows your daily attendance and overall percentage.'
    },
    {
        id: '3',
        question: 'How to contact a teacher?',
        answer: 'Currently, direct messaging is disabled for students. Please contact the school administration for appointments.'
    },
    {
        id: '4',
        question: 'What if I forget my password?',
        answer: 'You can reset your password from the Login screen by clicking on "Forgot Password" or contact the admin office.'
    },
];

export const HelpCenterScreen = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    const handleContactSupport = () => {
        Linking.openURL('mailto:support@gurukul.com?subject=Support Request');
    };

    return (
        <ScreenWrapper title="Help Center" showBack headerAlign="left">
            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.header}>
                    <AppText size="xl" weight="bold" align="center" style={{ marginBottom: 8 }}>
                        How can we help you?
                    </AppText>
                    <AppText size="s" color={theme.colors.text.secondary} align="center">
                        Find answers to frequently asked questions below or contact our support team.
                    </AppText>
                </View>

                <View style={styles.faqList}>
                    {FAQS.map((faq) => {
                        const isExpanded = expandedId === faq.id;
                        return (
                            <TouchableOpacity
                                key={faq.id}
                                style={[styles.faqItem, isExpanded && styles.faqItemExpanded]}
                                onPress={() => toggleExpand(faq.id)}
                                activeOpacity={0.9}
                            >
                                <View style={styles.questionRow}>
                                    <AppText weight="medium" style={styles.question}>{faq.question}</AppText>
                                    <Icon
                                        name={isExpanded ? "minus" : "plus"}
                                        library="feather"
                                        size={18}
                                        color={theme.colors.primary[600]}
                                    />
                                </View>
                                {isExpanded && (
                                    <View style={styles.answerContainer}>
                                        <AppText size="s" color={theme.colors.text.secondary} style={{ lineHeight: 22 }}>
                                            {faq.answer}
                                        </AppText>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.contactSection}>
                    <AppText weight="bold" size="m" style={{ marginBottom: 16 }}>Still need help?</AppText>
                    <AppButton
                        title="Contact Support"
                        onPress={handleContactSupport}
                        style={{ width: '100%' }}
                        icon="mail" // Assuming AppButton supports icon, if not it will ignore
                    />
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.l,
    },
    header: {
        marginBottom: theme.spacing.xl,
        paddingHorizontal: theme.spacing.l,
    },
    faqList: {
        marginBottom: theme.spacing.xl,
    },
    faqItem: {
        backgroundColor: '#FFF',
        marginBottom: theme.spacing.m,
        borderRadius: 12,
        padding: theme.spacing.l,
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
    },
    faqItemExpanded: {
        borderColor: theme.colors.primary[200],
        backgroundColor: theme.colors.surface.soft,
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    question: {
        flex: 1,
        marginRight: 12,
    },
    answerContainer: {
        marginTop: theme.spacing.m,
        paddingTop: theme.spacing.m,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    contactSection: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: theme.spacing.l,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
    },
});
