import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Header from '../../components/Header';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>My Dashboard</Text>
          <Text style={styles.cardText}>Welcome to the new application.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Slate 50 background
  },
  content: {
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2533',
    marginBottom: 8,
  },
  cardText: {
    color: '#6E7583',
  }
});

export default HomeScreen;
