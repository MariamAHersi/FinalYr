// Import necessary components from libraries
import { Link, Stack } from 'expo-router'; // For navigation
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Core React Native components

// 404/Not Found Screen Component
export default function NotFoundScreen() {
  return (
    // React Fragment to group multiple elements
    <>
      {/* Set screen title in the navigation header */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      
      {/* Main container view */}
      <View style={styles.container}>
        {/* Error message text */}
        <Text style={styles.text}>This screen doesn't exist!</Text>

        {/* Link to navigate back to home screen */}
        <Link href="/" style={styles.link} asChild>
          {/* Touchable button wrapper */}
          <TouchableOpacity style={styles.button}>
            {/* Button text */}
            <Text style={styles.buttonText}>Go to home screen!</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

// StyleSheet for component styling
const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1, // Take up all available space
    backgroundColor: '#ffffff', // White background
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
    padding: 20, // Padding around edges
  },
  
  // Error text styling
  text: {
    color: '#e6a3d5', // Soft pink color matching theme
    fontSize: 40, // Large text size
    fontWeight: 'bold', // Bold weight
    textAlign: 'center', // Center-aligned text
    marginTop: 40, // Spacing from top
  },
  
  // Link container styling
  link: {
    marginTop: 15, // Spacing from above element
    paddingVertical: 15, // Vertical padding
  },
  
  // Button styling
  button: {
    backgroundColor: '#e6a3d5', // Pink background
    borderRadius: 30, // Rounded corners
    width: 214, // Fixed width
    height: 50, // Fixed height
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  
  // Button text styling
  buttonText: { 
    color: '#fff7f7', // Off-white text color
    fontSize: 17, // Medium text size
    fontWeight: '400', // Normal weight
    textAlign: 'center', // Center-aligned text
  },
});