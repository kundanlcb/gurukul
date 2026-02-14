import React, { useState } from 'react';
import { View, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';

export const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [biometricEnabled, setBiometricEnabled] = useState(true);

    const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
        setter(!value);
        // Here we would persist the setting
    };

    const handleClearCache = () => {
        Alert.alert(
            'Clear Cache',
            'Are you sure you want to clear app cache? This will not delete your data.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: () => console.log('Cache cleared') }
            ]
        );
    };

    const renderSettingItem = (
        icon: string,
        title: string,
        type: 'toggle' | 'link' | 'info',
        value?: boolean,
        onPress?: () => void,
        subtitle?: string,
        isLast?: boolean
    ) => (
        <TouchableOpacity
            style={[styles.item, isLast && { borderBottomWidth: 0 }]}
            onPress={type !== 'toggle' ? onPress : undefined}
            disabled={type === 'toggle'}
            activeOpacity={0.7}
        >
            <View style={[styles.iconBox, { backgroundColor: theme.colors.surface.soft }]}>
                <Icon name={icon} library="feather" size={20} color={theme.colors.text.primary} />
            </View>
            <View style={styles.content}>
                <AppText size="m" weight="medium">{title}</AppText>
                {subtitle && <AppText size="xs" color={theme.colors.text.secondary}>{subtitle}</AppText>}
            </View>

            {type === 'toggle' && (
                <Switch
                    trackColor={{ false: theme.colors.border.soft, true: theme.colors.primary[600] }}
                    thumbColor={'#FFF'}
                    ios_backgroundColor={theme.colors.border.soft}
                    onValueChange={() => onPress && onPress()}
                    value={value}
                />
            )}

            {type === 'link' && (
                <Icon name="chevron-right" library="feather" size={20} color={theme.colors.text.tertiary} />
            )}
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper title="Settings" showBack headerAlign="left">
            <ScrollView contentContainerStyle={styles.container}>

                <AppText size="s" weight="bold" color={theme.colors.text.secondary} style={styles.sectionTitle}>
                    PREFERENCES
                </AppText>
                <View style={styles.section}>
                    {renderSettingItem('bell', 'Push Notifications', 'toggle', notificationsEnabled, () => toggleSwitch(setNotificationsEnabled, notificationsEnabled))}
                    {renderSettingItem('moon', 'Dark Mode', 'toggle', darkModeEnabled, () => toggleSwitch(setDarkModeEnabled, darkModeEnabled), undefined, true)}
                </View>

                <AppText size="s" weight="bold" color={theme.colors.text.secondary} style={styles.sectionTitle}>
                    SECURITY
                </AppText>
                <View style={styles.section}>
                    {renderSettingItem('lock', 'Change Password', 'link', undefined, () => { })}
                    {renderSettingItem('fingerprint', 'Biometric Login', 'toggle', biometricEnabled, () => toggleSwitch(setBiometricEnabled, biometricEnabled), undefined, true)}
                </View>

                <AppText size="s" weight="bold" color={theme.colors.text.secondary} style={styles.sectionTitle}>
                    DATA & STORAGE
                </AppText>
                <View style={styles.section}>
                    {renderSettingItem('trash-2', 'Clear Cache', 'link', undefined, handleClearCache, 'Free up space', true)}
                </View>

                <AppText size="s" weight="bold" color={theme.colors.text.secondary} style={styles.sectionTitle}>
                    ABOUT
                </AppText>
                <View style={styles.section}>
                    {renderSettingItem('info', 'App Version', 'info', undefined, undefined, 'v1.0.0 (Build 101)')}
                    {renderSettingItem('file-text', 'Terms of Service', 'link', undefined, () => { }, undefined, true)}
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.l,
    },
    sectionTitle: {
        marginBottom: theme.spacing.s,
        marginLeft: theme.spacing.xs,
        marginTop: theme.spacing.m,
    },
    section: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.xs, // small padding top/bottom so items aren't flush
        marginBottom: theme.spacing.l,
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.soft,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
    },
    content: {
        flex: 1,
    }
});
