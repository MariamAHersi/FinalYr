import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Logo */}
      <Image source={require('@/assets/images/mama_logo.png')} style={styles.logo} />

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#F48FB1"
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#F48FB1"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#F48FB1"
        secureTextEntry
      />

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#F48FB1"
        secureTextEntry
      />

      {/* Sign Up Button */}
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>

      {/* Already have an account? Navigate to Sign-In */}
      <Link href="/sign-in" style={{ marginHorizontal: 'auto'}} asChild>
      <TouchableOpacity>
        <Text style={styles.signInText}>
          Already have an account? <Text style={styles.signInLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>
      </Link>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    width: 380,
    height: 380,
    marginBottom: 20,
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: '#FFFFFF', // White input fields
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#e6a3d5', // Text color inside input
    marginBottom: 15,
    shadowColor: '#e6a3d5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  button: {
    width: 350,
    height: 50,
    backgroundColor: '#e6a3d5', // Vibrant pink button
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#e6a3d5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signInText: {
    marginTop: 20,
    fontSize: 16,
    color: '#D26DB9', // Darker pink text
  },
  signInLink: {
    fontWeight: 'bold',
    color: '#e6a3d5', // Brighter pink for link
  },
});

export default SignUp;
