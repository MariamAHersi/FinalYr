import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const API_BASE_URL =
          Platform.OS === 'web'
            ? 'http://localhost:5000'
            : 'http://192.168.0.132:5000'; // adjust for your network

        console.log(`Fetching user data from: ${API_BASE_URL}/users/profile`);
        const response = await fetch(`${API_BASE_URL}/users/profile`);
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        if (data) {
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setEmail(data.email || '');
          setAge(data.age ? data.age.toString() : '');
        }
      } catch (error) {
        console.error('Error while fetching user data:', error);
        Alert.alert('Error', 'An error occurred while fetching user data. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const API_BASE_URL =
        Platform.OS === 'web'
          ? 'http://localhost:5000'
          : 'http://192.168.0.132:5000'; // adjust IP for device

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          age,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile saved!');
      } else {
        alert('Failed to save profile: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.profileTitle}>Edit profile</Text>

        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/profile.png')}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          {loading ? (
            <ActivityIndicator size="large" color="#e6a3d5" />
          ) : (
            <Link href="/settings" asChild>
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#8bc34a',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    backgroundColor: '#fbedfd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#e6a3d5',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;
