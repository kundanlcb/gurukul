import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuthStore } from '../features/auth/store';
import { Student, ParentUser } from '../features/auth/types';

const Header = () => {
  const { user, selectedChild, selectChild } = useAuthStore();
  const [modalVisible, setModalVisible] = useState(false);

  // Safely cast/check if user has children
  const studentList = (user as ParentUser)?.children || [];
  const currentStudent = selectedChild;

  if (!user || !currentStudent) return null;

  const handleSwitch = (studentId: string) => {
    selectChild(studentId);
    setModalVisible(false);
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <TouchableOpacity 
      style={[
        styles.studentItem, 
        currentStudent.id === item.id && styles.activeStudentItem
      ]}
      onPress={() => handleSwitch(item.id)}
    >
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentClass}>Class {item.classId} • Roll {item.rollNumber}</Text>
      </View>
      {currentStudent.id === item.id && (
        <Icon name="check" size={20} color="#5A53D6" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>Hello,</Text>
        <TouchableOpacity 
          style={styles.profileSelector} 
          onPress={() => studentList.length > 1 && setModalVisible(true)}
          disabled={studentList.length <= 1}
        >
          <Text style={styles.currentName}>{currentStudent.name}</Text>
          {studentList.length > 1 && (
            <Icon name="chevron-down" size={20} color="#1F2533" style={{ marginLeft: 4 }} />
          )}
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.notificationButton}>
        <Icon name="bell" size={24} color="#1F2533" />
        <View style={styles.badge} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Switch Child Profile</Text>
            <FlatList
              data={studentList}
              renderItem={renderStudentItem}
              keyExtractor={item => item.id}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    paddingTop: 50, // Top padding for Status Bar approximate (if translucent)
  },
  left: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 14,
    color: '#6E7583',
    marginBottom: 2,
  },
  profileSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2533',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    borderRadius: 20,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2533',
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activeStudentItem: {
    backgroundColor: '#F0F9FF', // Light Blue Highlight
    marginHorizontal: -12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderBottomWidth: 0,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E7FF', // Light Indigo
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A53D6',
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2533',
  },
  studentClass: {
    fontSize: 14,
    color: '#6E7583',
  }
});

export default Header;
