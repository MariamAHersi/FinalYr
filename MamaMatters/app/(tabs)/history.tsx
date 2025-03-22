import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView  } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const history = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        <View style={styles.iconContainer}>
          <Ionicons name="calendar-outline" size={70} color="#CCCCCC" />
        </View>

        <Text style={styles.header}>No History Yet</Text>
        <Text style={styles.subtitle}>Hit the button below to start now !</Text>

        <Link href="/" style={{ marginHorizontal: 'auto'}} asChild>
         <TouchableOpacity style={styles.button}>
           <Text style={styles.buttonText}>Start Tracking</Text>
         </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default history

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: '#e6a3d5', // Changed from white to match your pink theme
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80, // Add some spacing at the top
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#e6a3d5',
    borderRadius: 30,
    width: 314,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 78,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})