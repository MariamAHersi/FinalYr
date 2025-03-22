import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";

const SignIn = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        
    <Image source={require('@/assets/images/mama_logo.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#F48FB1"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#F48FB1"
        secureTextEntry
      />

      <Link href="/" asChild>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      </Link>

      <Link href="/sign-up" asChild>
      <TouchableOpacity>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
      </Link>
      
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C2185B', // Dark pink title color
    marginBottom: 30,
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
    height:50,
    backgroundColor: '#e6a3d5', // Vibrant pink button
    borderRadius: 25,
    paddingHorizontal: 15,
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
  signUpText: {
    marginTop: 20,
    fontSize: 16,
    color: '#D26DB9', // Darker pink text
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#e6a3d5', // Brighter pink for link
  },
});

export default SignIn;
