// src/features/dashboard/screens/KitchenSinkScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../../theme/tokens';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { AppCard } from '../../../components/ui/AppCard';
import { StatusChip } from '../../../components/ui/StatusChip';
import { AppInput } from '../../../components/ui/AppInput';

export const KitchenSinkScreen = () => {
    return (
        <ScreenWrapper title="Visual Parity Audit" showBack>
            <ScrollView contentContainerStyle={styles.container}>
                <Section title="Typography">
                    <AppText size="xxl" weight="bold">Header 1</AppText>
                    <AppText size="xl" weight="bold">Header 2</AppText>
                    <AppText size="l" weight="bold">Header 3</AppText>
                    <AppText size="m">Body (Base)</AppText>
                    <AppText size="s" color={theme.colors.text.secondary}>Caption</AppText>
                    <AppText size="xs" weight="medium" color={theme.colors.primary[600]}>Label (Primary)</AppText>
                </Section>

                <Section title="Buttons">
                    <AppButton title="Primary Button" onPress={() => {}} />
                    <View style={{ height: 10 }} />
                    <AppButton title="Secondary Button" variant="secondary" onPress={() => {}} />
                    <View style={{ height: 10 }} />
                    <AppButton title="Ghost Button" variant="ghost" onPress={() => {}} />
                    <View style={{ height: 10 }} />
                    <AppButton title="Loading..." isLoading onPress={() => {}} />
                    <View style={{ height: 10 }} />
                    <AppButton title="Disabled" disabled onPress={() => {}} />
                </Section>

                <Section title="Inputs">
                    <AppInput label="Standard Input" placeholder="Type something..." />
                    <AppInput label="Error State" error="This field is required" />
                    <AppInput label="Secured" secureTextEntry />
                </Section>

                <Section title="Cards">
                    <AppCard>
                        <AppText size="m" weight="bold">Standard Card</AppText>
                        <AppText size="m">With some content inside.</AppText>
                    </AppCard>
                    <View style={{ height: 10 }} />
                    <AppCard variant="elevated">
                        <AppText size="m" weight="bold">Elevated Card</AppText>
                    </AppCard>
                    <View style={{ height: 10 }} />
                    <AppCard variant="outlined">
                        <AppText size="m" weight="bold">Outlined Card</AppText>
                    </AppCard>
                </Section>

                <Section title="Chips">
                    <View style={styles.row}>
                        <StatusChip label="Success" status="success" />
                        <StatusChip label="Warning" status="warning" />
                        <StatusChip label="Danger" status="danger" />
                        <StatusChip label="Info" status="info" />
                    </View>
                </Section>
            </ScrollView>
        </ScreenWrapper>
    );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View style={styles.section}>
        <AppText size="l" weight="bold" style={styles.sectionTitle}>{title}</AppText>
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.m,
        paddingBottom: theme.spacing.xl,
    },
    section: {
        marginBottom: theme.spacing.l,
    },
    sectionTitle: {
        marginBottom: theme.spacing.s,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.soft,
        paddingBottom: theme.spacing.xs,
    },
    sectionContent: {
        paddingVertical: theme.spacing.xs,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.s,
    },
});
