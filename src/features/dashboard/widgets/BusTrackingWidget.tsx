import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon'; // Using our wrapper
import { theme } from '../../../theme/tokens';
import { AppStackParamList } from '../../../navigation/types';

type BusTrackingWidgetNavProp = NativeStackNavigationProp<AppStackParamList>;

export const BusTrackingWidget = () => {
    const navigation = useNavigation<BusTrackingWidgetNavProp>();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('BusTracking')}
            style={styles.container}
        >
            <LinearGradient
                colors={['#4F46E5', '#3730A3']} // Indigo gradient for premium look
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.leftSection}>
                        <View style={styles.liveBadge}>
                            <View style={styles.liveDot} />
                            <AppText size="xs" weight="bold" color="#FFF" style={{ marginLeft: 6 }}>
                                LIVE TRACKING
                            </AppText>
                        </View>

                        <AppText size="l" weight="bold" color="#FFF" style={styles.title}>
                            School Bus
                        </AppText>

                        <View style={styles.statusRow}>
                            <Icon name="clock" library="feather" size={14} color="rgba(255,255,255,0.8)" />
                            <AppText size="s" color="rgba(255,255,255,0.9)" style={{ marginLeft: 6 }}>
                                10 mins • 3.2 km away
                            </AppText>
                        </View>
                    </View>

                    <View style={styles.rightSection}>
                        <View style={styles.iconCircle}>
                            <Icon name="map-pin" library="feather" size={24} color={theme.colors.primary[600]} />
                        </View>
                    </View>
                </View>

                {/* Background Decoration */}
                <Icon name="map" library="feather" size={120} color="rgba(255,255,255,0.05)" style={styles.bgIcon} />
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.l,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    gradient: {
        padding: 20,
        position: 'relative',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    },
    leftSection: {
        flex: 1,
    },
    liveBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    liveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#EF4444', // Red for live
    },
    title: {
        marginBottom: 4,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightSection: {
        marginLeft: 16,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    bgIcon: {
        position: 'absolute',
        right: -20,
        bottom: -20,
        zIndex: 0,
    },
});
