import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { QuickActions } from '../../features/dashboard/components/QuickActions';
import { AttendanceWidget } from '../../features/dashboard/widgets/AttendanceWidget';
import { HomeworkWidget } from '../../features/dashboard/widgets/HomeworkWidget';
import { FeeWidget } from '../../features/dashboard/widgets/FeeWidget';
import { theme } from '../../theme/tokens';
import { AppText } from '../../components/ui/AppText';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <FeeWidget />
        </View>

        <View style={styles.section}>
          <AppText size="l" weight="bold" style={styles.sectionTitle}>Overview</AppText>
          <AttendanceWidget />
        </View>

        <View style={styles.section}>
          <AppText size="l" weight="bold" style={styles.sectionTitle}>Quick Actions</AppText>
          <QuickActions />
        </View>

        <View style={styles.section}>
          <AppText size="l" weight="bold" style={styles.sectionTitle}>Pending Homework</AppText>
          <HomeworkWidget />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#1F2533', // explicit color or theme
  }
});

export default HomeScreen;
