import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppCard } from '../../../components/ui/AppCard';
import { AppText } from '../../../components/ui/AppText';
import { AppButton } from '../../../components/ui/AppButton';
import { theme } from '../../../theme/tokens';

export const FeeWidget = () => {
  const navigation = useNavigation<any>();

  return (
    <AppCard style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate('FeeDetails')}>
            <View>
            <AppText weight="semibold">Next Due</AppText>
            <AppText size="xxl" weight="bold" color={theme.colors.primary[600]}>₹ 4,500</AppText>
            <AppText size="xs" color={theme.colors.status.danger}>Due by 15th Aug</AppText>
            </View>
        </TouchableOpacity>
        <AppButton 
            title="Pay Now" 
            style={styles.button} 
            onPress={() => navigation.navigate('FeeDetails')}
        />
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: 36,
    paddingHorizontal: theme.spacing.m,
  },
});
