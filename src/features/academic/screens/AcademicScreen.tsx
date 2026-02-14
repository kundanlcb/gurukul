import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../components/ui/AppText';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';

export const AcademicScreen = () => {
  return (
    <ScreenWrapper title="Academics">
      <View style={styles.container}>
        <AppText>Academic Module Coming Soon</AppText>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
