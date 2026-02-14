import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';
import { useAuthStore } from '../../auth/store';

export const EditProfileScreen = () => {
    const { user } = useAuthStore();

    // Local state for form fields - defaulting to user data or hardcoded fallbacks
    const [name, setName] = useState(user?.name || 'David Warner');
    const [email, setEmail] = useState(user?.email || 'david.warner@example.com');
    const [phone, setPhone] = useState('9876543210');
    const [address, setAddress] = useState('123, Scholar Street, Knowledge City');

    const handleSave = () => {
        // Here we would typically call an API to update the profile
        Alert.alert('Success', 'Profile updated successfully!');
    };

    return (
        <ScreenWrapper title="Edit Profile" showBack headerAlign="left">
            <ScrollView contentContainerStyle={styles.container}>

                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://ui-avatars.com/api/?name=David+Warner&background=random&size=200' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.cameraButton}>
                            <Icon name="camera" library="feather" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <AppText size="s" color={theme.colors.primary[600]} weight="medium" style={{ marginTop: 12 }}>
                        Change Profile Picture
                    </AppText>
                </View>

                {/* Form Fields */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <AppText size="s" weight="medium" style={styles.label}>Full Name</AppText>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter full name"
                            placeholderTextColor={theme.colors.text.tertiary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <AppText size="s" weight="medium" style={styles.label}>Email Address</AppText>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter email"
                            keyboardType="email-address"
                            placeholderTextColor={theme.colors.text.tertiary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <AppText size="s" weight="medium" style={styles.label}>Phone Number</AppText>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            placeholderTextColor={theme.colors.text.tertiary}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <AppText size="s" weight="medium" style={styles.label}>Address</AppText>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter address"
                            multiline
                            numberOfLines={3}
                            placeholderTextColor={theme.colors.text.tertiary}
                        />
                    </View>
                </View>

                <AppButton
                    title="Save Changes"
                    onPress={handleSave}
                    style={styles.saveButton}
                />

            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.spacing.l,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: theme.colors.surface.soft,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary[600],
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    form: {
        gap: theme.spacing.l,
        marginBottom: theme.spacing.xl,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: theme.colors.text.secondary,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
        borderRadius: 12,
        paddingHorizontal: theme.spacing.l,
        paddingVertical: 12,
        fontSize: 16,
        color: theme.colors.text.primary,
        fontFamily: theme.typography.fontFamily.primary.regular,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        width: '100%',
        borderRadius: 12,
    },
});
