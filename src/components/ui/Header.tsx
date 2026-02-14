import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from './AppText';
import { theme } from '../../theme/tokens';

// Simple text fallback for Back icon to avoid font linking dependency issues in MVP dev
// Later we can replace this with a proper Icon component
const BackIcon = () => (
  <AppText size="l" weight="bold" color={theme.colors.primary[600]}>
    {'<'}
  </AppText>
);

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  rightAction,
  onBackPress,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <BackIcon />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <AppText size="l" weight="bold" align="center" style={styles.title}>
          {title}
        </AppText>
      </View>

      <View style={styles.rightContainer}>
        {rightAction}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.soft,
    backgroundColor: theme.colors.surface.default,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: theme.spacing.xs,
  },
  title: {
    color: theme.colors.text.primary,
  },
});
