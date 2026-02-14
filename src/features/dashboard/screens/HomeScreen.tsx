import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { AttendanceWidget } from '../widgets/AttendanceWidget';
import { HomeworkWidget } from '../widgets/HomeworkWidget';
import { FeeWidget } from '../widgets/FeeWidget';
import { ContinueLearningWidget } from '../widgets/ContinueLearningWidget';
import { PromoBanner } from '../components/PromoBanner';
import { OfflineBanner } from '../../../components/ui/OfflineBanner';
import { useAuthStore } from '../../auth/store';
import { ChildSwitcher } from '../../auth/components/ChildSwitcher';
import { theme } from '../../../theme/tokens';
import { AppHeader } from '../../../components/ui/AppHeader';

export const HomeScreen = () => {
  const { user } = useAuthStore();

  return (
    <ScreenWrapper 
      scrollable 
      title="" // Custom header used instead
      contentContainerStyle={{ paddingBottom: 80 }} // Space for tab bar
    >
      {/* AppHeader removed for custom layout */}
      
      <OfflineBanner />
      {/* <ChildSwitcher />  Hiding temporarily to match design cleanliness */}
      
      <View style={styles.content}>
        <View style={styles.greetingHeader}>
            <View>
                <AppText size="s" color={theme.colors.text.secondary} style={{ marginBottom: 4 }}>
                    Good Morning!
                </AppText>
                <AppText size="xxl" weight="bold" style={{ fontSize: 26, lineHeight: 32 }}>
                    {user?.name || 'David Warner'}
                </AppText>
            </View>
            
            <View style={styles.headerActions}>
                 <TouchableOpacity style={styles.iconButton}>
                    <Icon name="bell" library="feather" size={24} color={theme.colors.text.primary} />
                    <View style={styles.badge} />
                 </TouchableOpacity>
            </View>
        </View>

        <PromoBanner />
        
        <ContinueLearningWidget />
        
        {/* Hiding old quick actions to match reference */}
        {/* <QuickActions /> */}
        
        {/* Keeping Overview title but moving functional widgets to be less prominent if needed, 
            or we can just render the Grid directly */}
        {/* <AppText size="m" weight="bold" style={styles.sectionTitle}>Overview</AppText> */}
        
        <HomeworkWidget />
        
        {/* Keeping functionality accessible but pushed down */}
        {/* <View style={styles.functionalSection}>
             <AppText size="m" weight="bold" style={styles.sectionTitle}>Quick Access</AppText>
             <AttendanceWidget />
             <FeeWidget />
        </View> */}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.l,
    paddingTop: theme.spacing.m,
  },
  greetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl, 
    marginTop: theme.spacing.xs,
  },
  headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  iconButton: {
      position: 'relative',
      padding: 4, // Add touch target padding
  },
  badge: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.status.danger,
      borderWidth: 1.5,
      borderColor: theme.colors.surface.app,
  },
  avatarContainer: {
      // 
  },
  avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.text.primary, // Placeholder color
      alignItems: 'center',
      justifyContent: 'center',
  },
  sectionTitle: {
    marginBottom: theme.spacing.m,
    marginTop: theme.spacing.s,
  },
  functionalSection: {
      marginTop: theme.spacing.l,
  }
});
