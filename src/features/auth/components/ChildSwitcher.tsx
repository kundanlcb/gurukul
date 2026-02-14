import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuthStore } from '../store';
import { AppText } from '../../../components/ui/AppText';
import { theme } from '../../../theme/tokens';
import { ParentUser } from '../types';

export const ChildSwitcher = () => {
  const { user, selectedChild, selectChild } = useAuthStore();

  if (!user || user.role !== 'parent') return null;
  const parent = user as ParentUser;
  if (!parent.children || parent.children.length === 0) return null;

  return (
    <View style={styles.container}>
      <AppText size="xs" weight="bold" color={theme.colors.text.secondary} style={styles.label}>
        MANAGING ACCOUNT FOR
      </AppText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {parent.children.map((child) => {
          const isSelected = selectedChild?.id === child.id;
          return (
            <TouchableOpacity
              key={child.id}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => selectChild(child.id)}
            >
              <View style={[styles.avatar, isSelected ? styles.avatarSelected : styles.avatarInactive]}>
                <AppText size="xs" color={isSelected ? theme.colors.text.inverse : theme.colors.text.primary}>
                  {child.name.charAt(0)}
                </AppText>
              </View>
              <AppText
                size="s"
                weight={isSelected ? 'semibold' : 'regular'}
                color={isSelected ? theme.colors.primary[600] : theme.colors.text.primary}
              >
                {child.name.split(' ')[0]}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.surface.default,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.soft,
  },
  label: {
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  scroll: {
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.m,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs,
    paddingRight: theme.spacing.m,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface.background,
    borderWidth: 1,
    borderColor: theme.colors.border.soft,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary[50],
    borderColor: theme.colors.primary[200],
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.s,
  },
  avatarSelected: {
    backgroundColor: theme.colors.primary[600],
  },
  avatarInactive: {
    backgroundColor: theme.colors.surface.soft,
  },
});
