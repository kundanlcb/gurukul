import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppCard } from '../../../components/ui/AppCard';
import { AppText } from '../../../components/ui/AppText';
import { Icon } from '../../../components/ui/Icon';
import { theme } from '../../../theme/tokens';
import { StatusChip } from '../../../components/ui/StatusChip';

export const HomeworkWidget = () => {
  const navigation = useNavigation<any>();

  // Mock data to match the "Assignment Status" grid
  const ASSIGNMENTS = [
      { id: 1, subject: 'English', status: 'Pending', date: '10/12/2021', color: '#FF9966', icon: 'message-square' }, // Soft Salmon/Orange
      { id: 2, subject: 'Maths', status: 'Overdue', date: '10/12/2021', color: '#5C84FF', icon: 'plus-square' },    // Soft Royal Blue
      { id: 3, subject: 'Science', status: 'Pending', date: '10/12/2021', color: '#FFCC5C', icon: 'activity' },     // Soft Yellow
      { id: 4, subject: 'Hindi', status: 'Pending', date: '10/12/2021', color: '#66CDAA', icon: 'book' },           // Soft Teal/Green
  ];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
             <AppText size="m" weight="bold">Assignment Status</AppText>
        </View>
        <View style={styles.grid}>
            {ASSIGNMENTS.map((item) => (
                <TouchableOpacity 
                    key={item.id} 
                    style={[styles.card, { backgroundColor: item.color }]}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('HomeworkList')}
                >
                    <View style={styles.cardHeader}>
                         {item.status === 'Overdue' && (
                             <View style={styles.overdueTag}>
                                 <AppText size="xs" color="#FFF" weight="bold" style={{ fontSize: 10 }}>Overdue</AppText>
                             </View>
                         )}
                         <Icon name={item.icon || 'book'} library="feather" size={20} color="rgba(255,255,255,0.7)" style={styles.cardIcon} />
                    </View>
                    <View style={styles.cardContent}>
                        <AppText size="m" weight="bold" color="#FFF">{item.subject}</AppText>
                        <AppText size="xs" color="rgba(255,255,255,0.8)" style={{ fontSize: 10 }}>Submission Date:</AppText>
                        <AppText size="xs" color="rgba(255,255,255,0.8)" style={{ fontSize: 10 }}>{item.date}</AppText>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl, // Increase separation
  },
  header: {
      marginBottom: theme.spacing.m,
      paddingHorizontal: theme.spacing.xs,
  },
  grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 0, // Remove inner padding to align with edge
  },
  card: {
      width: '47%', // Just under half
      borderRadius: theme.radius.xl, // More rounded 
      padding: theme.spacing.m,
      marginBottom: theme.spacing.l, // More space below
      height: 120, // Taller cards
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05, // Softer shadow
      shadowRadius: 4,
      elevation: 2, // Lower elevation for flatter look
      borderWidth: 0,
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      height: 24,
      borderRadius: theme.radius.xl,
  },
  overdueTag: {
      backgroundColor: '#FF6B6B', // Softer red
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12, // Pill shape
      position: 'absolute',
      left: 0,
      top: 0,
      flexDirection: 'row',
      alignItems: 'center',
  },
  cardIcon: {
      alignSelf: 'flex-end',
  },
  cardContent: {
      marginTop: theme.spacing.s,
  },
});

