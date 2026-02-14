import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';

export const PrivacyPolicyScreen = () => {
    return (
        <ScreenWrapper title="Privacy Policy" showBack headerAlign="left">
            <ScrollView contentContainerStyle={styles.container}>
                <AppText size="s" color={theme.colors.text.secondary} style={{ marginBottom: 24 }}>
                    Last Updated: Feb 14, 2026
                </AppText>

                <Section title="1. Information We Collect">
                    <Paragraph>
                        We collect information necessary to provide educational services, including student attendance, grades, fee payment records, and assignment submissions. This data is securely stored and only accessible to authorized personnel.
                    </Paragraph>
                </Section>

                <Section title="2. How We Use Your Data">
                    <Paragraph>
                        Your data is used to:
                        {'\n'}• Track academic progress
                        {'\n'}• Manage fee payments
                        {'\n'}• Communicate school announcements
                        {'\n'}• Improve our educational platform
                    </Paragraph>
                </Section>

                <Section title="3. Data Security">
                    <Paragraph>
                        We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest. We do not share your data with third parties without your explicit consent.
                    </Paragraph>
                </Section>

                <Section title="4. User Rights">
                    <Paragraph>
                        You have the right to access, correct, or request deletion of your personal data. Please contact the school administration for any data-related requests.
                    </Paragraph>
                </Section>

                <Section title="5. Contact Us">
                    <Paragraph>
                        If you have any questions about this Privacy Policy, please contact us at privacy@gurukul.com.
                    </Paragraph>
                </Section>

                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={styles.section}>
        <AppText size="m" weight="bold" style={styles.heading}>{title}</AppText>
        {children}
    </View>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <AppText size="s" color={theme.colors.text.secondary} style={styles.paragraph}>
        {children}
    </AppText>
);

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.l,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    heading: {
        marginBottom: theme.spacing.s,
        color: theme.colors.text.primary,
    },
    paragraph: {
        lineHeight: 24,
    }
});
