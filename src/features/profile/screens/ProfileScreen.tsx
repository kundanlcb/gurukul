import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { Icon } from '../../../components/ui/Icon';
import { useAuthStore } from '../../auth/store';
import { theme } from '../../../theme/tokens';

const MENU_ITEMS = [
    { id: '1', title: 'My Profile', icon: 'user' },
    { id: '2', title: 'Settings', icon: 'settings' },
    { id: '3', title: 'Fee Payment', icon: 'credit-card' },
    { id: '4', title: 'Notifications', icon: 'bell' },
    { id: '5', title: 'Help Center', icon: 'help-circle' },
    { id: '6', title: 'Privacy Policy', icon: 'shield' },
];

export const ProfileScreen = () => {
    const { logout, user } = useAuthStore();
    const navigation = useNavigation<any>();

    return (
        <ScreenWrapper
            title="Profile"
            showBack={false}
            scrollable
            contentContainerStyle={{ paddingBottom: 100 }}
            headerAlign="left"
            headerSize="xxl"
            headerNoBorder
        >
            <View style={styles.profileInfoSection}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: 'https://ui-avatars.com/api/?name=David+Warner&background=random&size=200' }}
                        style={styles.avatar}
                    />
                    <View style={styles.editBadge}>
                        <Icon name="edit-2" library="feather" size={12} color="#FFF" />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <AppText size="l" weight="bold" style={styles.name}>{user?.name || 'David Warner'}</AppText>
                    <AppText size="s" color={theme.colors.text.secondary} style={{ marginBottom: 4 }}>Class X - A</AppText>
                    <AppText size="s" color={theme.colors.text.tertiary}>Roll No. 24</AppText>
                </View>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <View style={[styles.statIconBox, { backgroundColor: theme.colors.status.warning + '20' }]}>
                        <Icon name="calendar" library="feather" size={20} color={theme.colors.status.warning} />
                    </View>
                    <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 4 }}>5</AppText>
                    <AppText size="xs" color={theme.colors.text.secondary}>Tasks Due</AppText>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <View style={[styles.statIconBox, { backgroundColor: theme.colors.primary[100] }]}>
                        <Icon name="check-circle" library="feather" size={20} color={theme.colors.primary[600]} />
                    </View>
                    <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 4 }}>95%</AppText>
                    <AppText size="xs" color={theme.colors.text.secondary}>Attendance</AppText>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <View style={[styles.statIconBox, { backgroundColor: theme.colors.status.success + '20' }]}>
                        <Icon name="trending-up" library="feather" size={20} color={theme.colors.status.success} />
                    </View>
                    <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 4 }}>Good</AppText>
                    <AppText size="xs" color={theme.colors.text.secondary}>Progress</AppText>
                </View>
            </View>

            <View style={styles.menuContainer}>
                {MENU_ITEMS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.menuItem}
                        onPress={() => {
                            switch (item.title) {
                                case 'My Profile':
                                    navigation.navigate('EditProfile');
                                    break;
                                case 'Settings':
                                    navigation.navigate('Settings');
                                    break;
                                case 'Fee Payment':
                                    navigation.navigate('FeeScreen');
                                    break;
                                case 'Notifications':
                                    navigation.navigate('NotificationScreen');
                                    break;
                                case 'Help Center':
                                    navigation.navigate('HelpCenter');
                                    break;
                                case 'Privacy Policy':
                                    navigation.navigate('PrivacyPolicy');
                                    break;
                                default:
                                    break;
                            }
                        }}
                    >
                        <View style={styles.menuIconBox}>
                            <Icon name={item.icon} library="feather" size={20} color={theme.colors.text.primary} />
                        </View>
                        <AppText size="m" style={styles.menuText}>{item.title}</AppText>
                        <Icon name="chevron-right" library="feather" size={20} color={theme.colors.text.tertiary} />
                    </TouchableOpacity>
                ))}

                {/* Logout as Menu Item */}
                <TouchableOpacity style={styles.menuItem} onPress={logout}>
                    <View style={[styles.menuIconBox, { backgroundColor: theme.colors.status.danger + '10' }]}>
                        <Icon name="log-out" library="feather" size={20} color={theme.colors.status.danger} />
                    </View>
                    <AppText size="m" style={[styles.menuText, { color: theme.colors.status.danger }]}>Logout</AppText>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <AppText size="xs" color={theme.colors.text.tertiary} align="center" style={{ marginTop: 16 }}>
                    Version 1.0.0
                </AppText>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    profileInfoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.l,
        paddingHorizontal: theme.spacing.l, // Already aligned
    },
    avatarContainer: {
        position: 'relative',
        marginRight: theme.spacing.l,
    },
    avatar: {
        width: 100, // Increased from 80
        height: 100, // Increased from 80
        borderRadius: 50,
        borderWidth: 3,
        borderColor: theme.colors.surface.default,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: -4,
        backgroundColor: theme.colors.primary[600],
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: theme.colors.surface.default,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        marginBottom: 2,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: theme.colors.surface.default,
        marginHorizontal: theme.spacing.l,
        padding: theme.spacing.l,
        borderRadius: 16,
        marginBottom: theme.spacing.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: theme.colors.border.soft,
        marginHorizontal: 4,
        alignSelf: 'center',
    },
    menuContainer: {
        paddingHorizontal: theme.spacing.l,
        marginBottom: theme.spacing.xl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.soft,
    },
    menuIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: theme.colors.surface.soft,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
    },
    menuText: {
        flex: 1,
    },
    footer: {
        paddingHorizontal: theme.spacing.l,
    },
    logoutButton: {
        borderColor: theme.colors.status.danger,
        borderWidth: 1,
    },
});
