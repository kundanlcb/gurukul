import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { ResultSummaryCard } from '../components/ResultSummaryCard';
import { theme } from '../../../theme/tokens';

const RESULTS_DATA = [
    { id: '1', term: 'Half Yearly Exam', percentage: '88.5', grade: 'A', status: 'Pass' as const, date: 'Oct 2024' },
    { id: '2', term: 'Unit Test 1', percentage: '92.0', grade: 'A+', status: 'Pass' as const, date: 'Aug 2024' },
    { id: '3', term: 'Final Exam (Prev)', percentage: '85.2', grade: 'A', status: 'Pass' as const, date: 'Mar 2024' },
];

export const ResultsScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScreenWrapper title="Examination Results" showBack>
      <View style={{ flex: 1 }}>
        <FlashList
          data={RESULTS_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <ResultSummaryCard
                  term={item.term}
                  percentage={item.percentage}
                  grade={item.grade}
                  status={item.status}
                  date={item.date}
                  onPress={() => navigation.navigate('ResultDetail', { resultId: item.id, term: item.term })}
              />
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: theme.spacing.m,
  }
});
