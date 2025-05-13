import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter} from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const router = useRouter();

  // Button animation
  const buttonTextTranslate = React.useRef(new Animated.Value(0)).current;
  const buttonIconOpacity = React.useRef(new Animated.Value(0)).current;
  const buttonIconTranslate = React.useRef(new Animated.Value(10)).current;

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.0.132:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          confirmPassword,
        }),
      });
  
      const data = await response.json();
      console.log('Registration response:', data);
  
      if (response.ok) {
        Alert.alert('Success', data.message || 'User registered successfully');
        router.push('/sign-in'); 
      } else {
        Alert.alert('Registration Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Network error. Please try again later.');
    }
  };  


  const handleButtonHoverIn = () => {
    Animated.parallel([
      Animated.timing(buttonTextTranslate, {
        toValue: -10,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonIconOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonIconTranslate, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleButtonHoverOut = () => {
    Animated.parallel([
      Animated.timing(buttonTextTranslate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonIconOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonIconTranslate, {
        toValue: 10,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.loginWrapper}
      >
        <View style={styles.login}>
          <Image
            source={require('@/assets/images/mama-icon-web.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome !</Text>

          <View style={styles.form}>
            {/* Email input */}
            <View style={styles.textbox}>
              <TextInput
                style={[
                  styles.input,
                  (emailFocused || email !== '') && styles.inputActive,
                ]}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              <Text
                style={[
                  styles.label,
                  (emailFocused || email !== '') && styles.labelActive,
                ]}
              >
                Email
              </Text>
            </View>

            {/* Password input */}
            <View style={styles.textbox}>
              <TextInput
                style={[
                  styles.input,
                  (passwordFocused || password !== '') && styles.inputActive,
                ]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <Text
                style={[
                  styles.label,
                  (passwordFocused || password !== '') && styles.labelActive,
                ]}
              >
                Password
              </Text>
            </View>

            {/* Confirm Password input */}
            <View style={styles.textbox}>
              <TextInput
                style={[
                  styles.input,
                  (confirmPasswordFocused || confirmPassword !== '') && styles.inputActive,
                ]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
              />
              <Text
                style={[
                  styles.label,
                  (confirmPasswordFocused || confirmPassword !== '') && styles.labelActive,
                ]}
              >
                Confirm Password
              </Text>
            </View>

            {/* Register button */}
              <TouchableOpacity
                style={styles.button}
                onPressIn={handleButtonHoverIn}
                onPressOut={handleButtonHoverOut}
                onPress={handleRegister}
                activeOpacity={0.9}
              >
                <Animated.Text
                  style={[
                    styles.buttonText,
                    { transform: [{ translateX: buttonTextTranslate }] },
                  ]}
                >
                  Register
                </Animated.Text>
                <Animated.View
                  style={[
                    styles.buttonIconContainer,
                    {
                      opacity: buttonIconOpacity,
                      transform: [{ translateX: buttonIconTranslate }],
                    },
                  ]}
                >
                  <MaterialIcons name="arrow-forward" size={22} color="#f9f9f9" />
                </Animated.View>
              </TouchableOpacity>
          </View>

          {/* Forgot Password link */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Footer with Login Link */}
          <View style={styles.footerContainer}>
            <Text style={styles.footer}>
              Already a member?{' '}
              <Link href="/sign-in" asChild>
                <TouchableOpacity>
                  <Text style={styles.LogInLink}>Log in!</Text>
                </TouchableOpacity>
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    width: 380,
    backgroundColor: '#f9d5f6',
    borderRadius: 40,
    padding: 32,
    paddingTop: 72,
    paddingBottom: 58,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
  },
  logo: {
    width: 74,
    height: 74,
    marginBottom: 32,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 36,
  },
  form: {
    width: '100%',
    marginBottom: 32,
  },
  textbox: {
    position: 'relative',
    height: 56,
    marginBottom: 12,
  },
  input: {
    height: 56,
    backgroundColor: '#fffdff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 0,
    color: '#be99d6',
    fontSize: 16,
    borderWidth: 0,
    width: '100%',
  },
  inputActive: {
    borderWidth: 2,
    borderColor: '#ea8ad9',
  },
  label: {
    position: 'absolute',
    left: 16,
    top: '50%',
    fontSize: 16,
    color: '#be99d6',
    transform: [{ translateY: -8 }],
  },
  labelActive: {
    top: 14,
    fontSize: 12,
    transform: [{ translateY: 0 }, { scale: 0.725 }],
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffdff',
    height: 56,
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
  },
  buttonText: {
    color: '#be99d6',
    fontSize: 17,
  },
  buttonIconContainer: {
    position: 'absolute',
    right: '40%',
  },
  forgotPasswordContainer: {
    marginBottom: 56,
  },
  forgotPassword: {
    color: '#8d1dd7',
    fontSize: 15,
  },
  footerContainer: {
    marginTop: 0,
  },
  footer: {
    fontSize: 15,
    color: '#f9f8fa',
  },
  LogInLink: {
    color: '#8d1dd7',
  },
});

export default SignUp;
