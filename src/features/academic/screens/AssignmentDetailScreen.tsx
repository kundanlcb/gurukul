import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';
import { AppStackParamList } from '../../../navigation/types';

// Define Route Prop
type AssignmentDetailRouteProp = RouteProp<AppStackParamList, 'AssignmentDetail'>;

// Mock Data Structure
interface Assignment {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: 'pending' | 'completed' | 'submitted';
    description?: string;
}

export const AssignmentDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<AssignmentDetailRouteProp>();

    // Fallback if params are missing (for dev)
    const assignment = route.params?.assignment || {
        id: '1',
        title: 'Chapter 5 Exercises',
        subject: 'Mathematics',
        dueDate: 'Tomorrow, 5:00 PM',
        status: 'pending',
        description: 'Complete all exercises from Chapter 5. Please ensure you show your working for all problems. Upload the scanned copy of your notebook pages.'
    };

    const [isSubmitted, setIsSubmitted] = useState(assignment.status === 'submitted' || assignment.status === 'completed');
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);

    const handleUpload = () => {
        // Simulate file upload
        Alert.alert('Upload', 'File uploaded successfully!');
        setUploadedFile('math_homework_ch5.pdf');
    };

    const handleSubmit = () => {
        if (!uploadedFile) {
            Alert.alert('Error', 'Please upload your homework first.');
            return;
        }
        setIsSubmitted(true);
        Alert.alert('Success', 'Assignment submitted successfully!');
        navigation.goBack();
    };

    const getStatusColor = () => {
        if (isSubmitted) return theme.colors.status.success;
        return theme.colors.status.warning;
    };

    const getStatusText = () => {
        if (isSubmitted) return 'Submitted';
        return 'Pending';
    };

    return (
        <ScreenWrapper
            title="Assignment Details"
            showBack={true}
            headerAlign="left"
            headerSize="l"
            headerNoBorder
        >
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header Card */}
                <View style={styles.headerCard}>
                    <View style={styles.headerTop}>
                        <View style={[styles.iconBox, { backgroundColor: theme.colors.primary[50] }]}>
                            <Icon name="book" size={24} color={theme.colors.primary[600]} />
                        </View>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
                            <AppText size="xs" weight="bold" color={getStatusColor()}>
                                {getStatusText().toUpperCase()}
                            </AppText>
                        </View>
                    </View>

                    <AppText size="xxl" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 16 }}>
                        {assignment.title}
                    </AppText>
                    <AppText size="m" color={theme.colors.primary[600]} weight="medium" style={{ marginTop: 4 }}>
                        {assignment.subject}
                    </AppText>

                    <View style={styles.dateRow}>
                        <Icon name="clock" size={16} color={theme.colors.text.tertiary} />
                        <AppText size="s" color={theme.colors.text.secondary} style={{ marginLeft: 8 }}>
                            Due: {assignment.dueDate}
                        </AppText>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginBottom: 12 }}>
                        Instructions
                    </AppText>
                    <AppText size="m" color={theme.colors.text.secondary} style={{ lineHeight: 24 }}>
                        {assignment.description || 'No instructions provided.'}
                    </AppText>
                </View>

                {/* Upload Section */}
                {!isSubmitted && (
                    <View style={styles.uploadSection}>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
                            <View style={[styles.uploadIconCircle, { backgroundColor: uploadedFile ? theme.colors.status.success + '20' : theme.colors.surface.app }]}>
                                <Icon
                                    name={uploadedFile ? "check" : "upload-cloud"}
                                    size={24}
                                    color={uploadedFile ? theme.colors.status.success : theme.colors.primary[600]}
                                />
                            </View>
                            <View style={{ marginLeft: 16, flex: 1 }}>
                                <AppText size="m" weight="bold" color={theme.colors.text.primary}>
                                    {uploadedFile ? 'File Uploaded' : 'Upload Homework'}
                                </AppText>
                                <AppText size="s" color={theme.colors.text.secondary} numberOfLines={1}>
                                    {uploadedFile || 'PDF, JPG, or PNG (Max 10MB)'}
                                </AppText>
                            </View>
                            {uploadedFile && (
                                <TouchableOpacity onPress={() => setUploadedFile(null)}>
                                    <Icon name="x" size={20} color={theme.colors.text.tertiary} />
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                {/* Submit Button */}
                {!isSubmitted ? (
                    <AppButton
                        title="Submit Assignment"
                        onPress={handleSubmit}
                        variant="primary"
                        size="l"
                        disabled={!uploadedFile}
                        style={{ marginTop: 24 }}
                    />
                ) : (
                    <View style={styles.submittedInfo}>
                        <Icon name="check-circle" size={48} color={theme.colors.status.success} />
                        <AppText size="l" weight="bold" color={theme.colors.text.primary} style={{ marginTop: 16 }}>
                            Great Job!
                        </AppText>
                        <AppText size="m" color={theme.colors.text.secondary} align="center" style={{ marginTop: 8 }}>
                            You have successfully submitted this assignment.
                        </AppText>
                    </View>
                )}

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
        backgroundColor: theme.colors.surface.default,
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: theme.colors.border.soft,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.soft,
    },
    section: {
        marginBottom: 24,
    },
    uploadSection: {
        marginBottom: 24,
    },
    uploadBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface.default,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: theme.colors.primary[600],
        borderRadius: 16,
        padding: 16,
    },
    uploadIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submittedInfo: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        backgroundColor: theme.colors.surface.default,
        borderRadius: 24,
        marginTop: 24,
    }
});
