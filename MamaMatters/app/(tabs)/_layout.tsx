import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8d1dd7', // Deep purple for active tab
        tabBarInactiveTintColor: '#be99d6', // Lighter purple for inactive tabs
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Metrics',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : {}}>
              <Ionicons name="heart" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : {}}>
              <Ionicons name="map" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIconContainer : {}}>
              <Ionicons name="settings" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fdf2fc', // Pastel pink background
    borderTopWidth: 0,
    elevation: 0,
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0, 
    paddingTop: 0,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
  },
  activeIconContainer: {
    backgroundColor: '#f9e0f7', // Slightly lighter pink for active icon highlight
    borderRadius: 12,
    padding: 4,
  }
});