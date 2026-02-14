import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme/tokens';
import { AppText } from '../../components/ui/AppText';
import { Icon, AppIcons } from '../../components/ui/Icon';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Determine Icon Config
          let iconConfig = AppIcons.home; // Default
          
          if (route.name === 'Home') {
            iconConfig = isFocused ? AppIcons.homeActive : AppIcons.home;
          } else if (route.name === 'Academic') {
            iconConfig = isFocused ? AppIcons.resultsActive : AppIcons.results;
          } else if (route.name === 'Finance') {
             iconConfig = isFocused ? AppIcons.feeActive : AppIcons.fee;
          } else if (route.name === 'Profile') {
            iconConfig = isFocused ? AppIcons.profileActive : AppIcons.profile;
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const activeColor = '#FFF'; 
          const inactiveColor = theme.colors.text.tertiary;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, isFocused && styles.activeTabBg]}>
                <Icon
                  name={iconConfig.name}
                  library={iconConfig.library}
                  size={24}
                  color={isFocused ? activeColor : inactiveColor}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.soft,
    shadowColor: theme.colors.text.primary,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    height: 64, // Slightly taller
    width: '100%',
    paddingBottom: 4,
  },
  tabButton: {
    flex: 1, // distribute evenly
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12, // Rounded corners for active state
  },
  activeTabBg: {
      backgroundColor: theme.colors.primary[600], // Filled background
      padding: 10,
      borderRadius: 12,
  },
});
