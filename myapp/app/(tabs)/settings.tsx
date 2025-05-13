import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform} from 'react-native';
import {Link, useRouter} from 'expo-router';



const ProfileScreen = () => {
  const router = useRouter(); // Hook to navigate

  const handleLogout = async () => {
    try {
       const API_BASE_URL =
            Platform.OS === 'web'
              ? 'http://localhost:5000' // for web version
              : 'http://192.168.0.132:5000'; // mobile Ip

      const response = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include', // important for session cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmLogout: true }), // Important!
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        router.replace('/sign-in'); // Navigate to sign-in page
      } else {
        alert('Logout failed: ' + data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Something went wrong during logout');
    }
  };

  const user = {
    name: 'Marvis Ighedosa',
    profileImage: require('@/assets/images/profile.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Title */}
        <Text style={styles.profileTitle}>My profile</Text>
        
        {/* Personal Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Profile</Text>
          </View>
          
          <View style={styles.profileInfo}>
            <Image 
              source={user.profileImage} 
              style={styles.profileImage} 
            />
            <View style={styles.profileDetails}>
              <Text style={styles.name}>{user.name}</Text>
            </View>
          </View>

          <Link href="/profile-update" asChild>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.ButtonText}>Edit</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
        {/* Menu Options */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications</Text>
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

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.signOutButton}>Sign Out →</Text>
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
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  editButton: {
    backgroundColor: '#e6a3d5',
    borderRadius: 20,
    padding: 13,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signOutButton:{
    color: '#D26DB9',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginTop: 70,
    marginBottom: 10,
  }
});

export default ProfileScreen;