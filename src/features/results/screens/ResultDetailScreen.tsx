import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { AppText } from '../../../components/ui/AppText';
import { AppCard } from '../../../components/ui/AppCard';
import { theme } from '../../../theme/tokens';
import { downloadFile } from '../../../utils/fileDownloader';

// Mock Data
type SubjectMark = { subject: string; marks: number; maxMarks: number; grade: string };
const MARKS_DATA: SubjectMark[] = [
    { subject: 'Mathematics', marks: 95, maxMarks: 100, grade: 'A+' },
    { subject: 'Science', marks: 88, maxMarks: 100, grade: 'A' },
    { subject: 'English', marks: 82, maxMarks: 100, grade: 'A' },
    { subject: 'Hindi', marks: 78, maxMarks: 100, grade: 'B+' },
    { subject: 'Social Studies', marks: 90, maxMarks: 100, grade: 'A+' },
    { subject: 'Computer', marks: 98, maxMarks: 100, grade: 'O' },
];

export const ResultDetailScreen = () => {
  const route = useRoute<any>();
  const { term } = route.params || { term: 'Result' };

  const handleDownload = () => {
      downloadFile('https://example.com/report_card.pdf', `Report_Card_${term}.pdf`);
  };

  const totalObtained = MARKS_DATA.reduce((acc, curr) => acc + curr.marks, 0);
  const totalMax = MARKS_DATA.reduce((acc, curr) => acc + curr.maxMarks, 0);
  const percentage = ((totalObtained / totalMax) * 100).toFixed(2);

  return (
    <ScreenWrapper title={term} showBack scrollable>
      <View style={styles.container}>
        
        {/* Header Stats */}
        <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
                <AppText size="xs" color={theme.colors.text.secondary}>Total</AppText>
                <AppText size="xl" weight="bold">{totalObtained}/{totalMax}</AppText>
            </View>
            <View style={[styles.summaryItem, { alignItems: 'flex-end' }]}>
                <AppText size="xs" color={theme.colors.text.secondary}>Percentage</AppText>
                <AppText size="xl" weight="bold" color={theme.colors.primary[600]}>
                    {percentage}%
                </AppText>
            </View>
        </View>

        {/* Marks Table */}
        <AppCard style={styles.tableCard}>
            <View style={[styles.tableRow, styles.tableHeader]}>
                <AppText weight="bold" style={styles.colSubject}>Subject</AppText>
                <AppText weight="bold" style={styles.colMarks} align="center">Marks</AppText>
                <AppText weight="bold" style={styles.colGrade} align="center">Grade</AppText>
            </View>
            
            {MARKS_DATA.map((item, index) => (
                <View key={item.subject} style={[styles.tableRow, index !== MARKS_DATA.length - 1 && styles.borderBottom]}>
                    <AppText style={styles.colSubject} color={theme.colors.text.secondary}>{item.subject}</AppText>
                    <View style={styles.colMarks}>
                        <AppText align="center" weight="medium">{item.marks}</AppText>
                        <AppText size="xs" color={theme.colors.text.secondary} align="center">/{item.maxMarks}</AppText>
                    </View>
                    <AppText style={styles.colGrade} align="center" weight="bold" color={theme.colors.primary[600]}>
                        {item.grade}
                    </AppText>
                </View>
            ))}
        </AppCard>

        {/* Download Action */}
        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
            <AppText color={theme.colors.primary[600]} weight="bold">Download Report Card (PDF)</AppText>
        </TouchableOpacity>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
      padding: theme.spacing.m,
  },
  summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.m,
      paddingHorizontal: theme.spacing.s,
  },
  summaryItem: {
      flex: 1,
  },
  tableCard: {
      padding: 0,
      overflow: 'hidden',
  },
  tableRow: {
      flexDirection: 'row',
      padding: theme.spacing.m,
  },
  tableHeader: {
      backgroundColor: theme.colors.surface.soft,
  },
  borderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border.soft,
  },
  colSubject: {
      flex: 2,
  },
  colMarks: {
      flex: 1,
  },
  colGrade: {
      flex: 1,
  },
  downloadButton: {
      marginTop: theme.spacing.xl,
      alignSelf: 'center',
      padding: theme.spacing.m,
  }
});
