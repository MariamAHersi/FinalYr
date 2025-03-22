import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';

const ProfileScreen = () => {
  const user = {
    name: 'Marvis Ighedosa',
    email: 'Dasamarvis@gmail.com',
    phone: '+234 9010392971',
    address: '15 Palace Road PA4 5HS',
    profileImage: require('@/assets/images/profile.png'), // Replace with your image path
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Title */}
        <Text style={styles.profileTitle}>My profile</Text>
        
        {/* Personal Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Personal details</Text>
            <TouchableOpacity>
              <Text style={styles.changeButton}>change</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Image 
              source={user.profileImage} 
              style={styles.profileImage} 
            />
            <View style={styles.profileDetails}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.detailText}>{user.email}</Text>
              <Text style={styles.detailText}>{user.phone}</Text>
              <Text style={styles.detailText}>{user.address}</Text>
            </View>
          </View>
        </View>
        
        {/* Menu Options */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Hospitals Visited</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>FAQ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
        
        {/* Update Button */}
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f8',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  changeButton: {
    color: '#D26DB9',
    fontSize: 14,
  },
  profileInfo: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#FFE2DD', 
  },
  profileDetails: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    width: 350
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: '#e6a3d5',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 30,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;