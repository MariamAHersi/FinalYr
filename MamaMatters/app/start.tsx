import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity,Animated } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const images = require('@/assets/images/start_images.png');
const logo = require('@/assets/images/mama-icon-web.png');

const Start = () => {
    const handlePress = () => {
        console.log('Button Pressed');
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style = {styles.contentContainer}>

                <Image source={images} style={styles.images} />

                <Link href="/sign-in" asChild>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
                </Link>
            </View>
        </SafeAreaView>
  )
}

export default Start

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#f3c5f7',
        paddingVertical: 20,
        paddingHorizontal: 70,
        borderRadius: 25,
        marginTop: 20,
        bottom: -50,
    },
    buttonText:{
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
    },
    images:{
        alignItems: 'center',
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
})

