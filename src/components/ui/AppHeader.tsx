import React from 'react';
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from './AppText';
import { Icon, IconLibrary, AppIcons } from './Icon';
import { theme } from '../../theme/tokens';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  
  rightIcon?: string;
  rightIconLibrary?: IconLibrary;
  onRightPress?: () => void;
  rightBadge?: number;
  rightElement?: React.ReactNode; // For custom right content
  
  leftIcon?: string;
  leftIconLibrary?: IconLibrary;
  onLeftPress?: () => void;
  
  style?: StyleProp<ViewStyle>;
  transparent?: boolean;
  premium?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack,
  onBackPress,
  rightIcon,
  rightIconLibrary = 'feather',
  onRightPress,
  rightBadge,
  rightElement,
  leftIcon,
  leftIconLibrary = 'feather',
  onLeftPress,
  style,
  transparent = false,
  premium = false,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // Determine effective left icon
  const effectiveLeftIcon = leftIcon || (showBack ? AppIcons.back.name : undefined);
  const effectiveLeftLibrary = leftIcon ? leftIconLibrary : (showBack ? AppIcons.back.library : 'feather');
  const handleLeftPress = onLeftPress || (showBack ? handleBack : undefined);

  const containerStyle = [
    styles.container,
    { paddingTop: insets.top + theme.spacing.s },
    transparent ? styles.transparent : (premium ? styles.premium : styles.default),
    style,
  ];

  const contentColor = premium ? theme.colors.premium.textTitle : theme.colors.text.primary;
  // If premium, we might want a different icon color? Keep it simple for now.

  return (
    <View style={containerStyle}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {effectiveLeftIcon && (
          <TouchableOpacity 
            onPress={handleLeftPress} 
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon 
              name={effectiveLeftIcon} 
              library={effectiveLeftLibrary} 
              size={24} 
              color={contentColor} 
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        {title && (
          <AppText 
            size="l" 
            weight="bold" 
            style={{ color: contentColor }} 
            numberOfLines={1}
            align="center"
          >
            {title}
          </AppText>
        )}
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {rightElement ? (
          rightElement
        ) : rightIcon && (
          <TouchableOpacity 
            onPress={onRightPress} 
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View>
              <Icon 
                name={rightIcon} 
                library={rightIconLibrary} 
                size={24} 
                color={contentColor} 
              />
              {rightBadge && rightBadge > 0 ? (
                <View style={[styles.badge, premium && styles.premiumBadge]}>
                  <Text style={[
                      styles.badgeText, 
                      premium && { color: theme.colors.premium.badgeText }
                    ]}>
                    {rightBadge > 99 ? '99+' : rightBadge}
                  </Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    minHeight: 56, // Standard header height + padding
  },
  default: {
    backgroundColor: theme.colors.surface.app,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.soft,
  },
  premium: {
    backgroundColor: theme.colors.premium.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.premium.border,
  },
  transparent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  leftSection: {
    width: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    width: 48,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.status.danger,
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    borderWidth: 1.5,
    borderColor: theme.colors.surface.card,
  },
  premiumBadge: {
    backgroundColor: theme.colors.premium.badge,
    borderColor: theme.colors.premium.card,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
});
