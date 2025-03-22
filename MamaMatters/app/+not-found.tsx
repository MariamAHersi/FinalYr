import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>

        <Text style={styles.text}>This screen doesnt exist!</Text>

        <Link href="/" style={styles.link}>
        <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Go to home screen!</Text>
                </TouchableOpacity>
        </Link>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: '#e6a3d5', // Changed from white to match your pink theme
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40, // Add some spacing at the top
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  button: {
    backgroundColor: '#e6a3d5',
    borderRadius: 30,
    width: 214,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  buttonText: { 
    color: '#fff7f7',
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
  },
});
