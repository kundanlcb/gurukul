import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';

const ACTIONS = [
  { id: 'Timetable', label: 'Timetable', icon: '📅' },
  { id: 'Results', label: 'Results', icon: '📊' },
  { id: 'Notices', label: 'Notices', icon: '📢' },
  { id: 'SchoolCalendar', label: 'Calendar', icon: '🗓️' },
  { id: 'KitchenSink', label: 'Dev Kit', icon: '🎨' },
];

export const QuickActions = () => {
  const navigation = useNavigation<any>();

  const handlePress = (id: string) => {
      // Navigate if route exists
      if (id === 'Timetable') {
          navigation.navigate('Timetable');
      } else if (id === 'Results') {
          navigation.navigate('Results');
      } else if (id === 'Notices') {
          navigation.navigate('Notices');
      } else if (id === 'SchoolCalendar') {
          navigation.navigate('SchoolCalendar');
      } else if (id === 'KitchenSink') {
          navigation.navigate('KitchenSink');
      } else {
          // Placeholder
          console.log('Navigating to', id);
      }
  };

  return (
    <View style={styles.container}>
      {ACTIONS.map((action) => (
        <TouchableOpacity 
            key={action.id} 
            style={styles.item}
            onPress={() => handlePress(action.id)}
        >
          <View style={styles.iconContainer}>
            <AppText style={styles.icon}>{action.icon}</AppText>
          </View>
          <AppText size="s" weight="medium" align="center">
            {action.label}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.surface.default,
    padding: theme.spacing.m,
    borderRadius: theme.radius.m,
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  icon: {
    fontSize: 24,
  },
});
