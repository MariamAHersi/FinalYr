import {Dimensions, View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import React from 'react'

const App = () => {
  const { height, width } = Dimensions.get('window');
  const shape = require('@/assets/images/shape.png');
  const shape1 = require('@/assets/images/shape-1.png');
  const percentageCircle = require('@/assets/images/shape-2.png');
  const modal = require('@/assets/images/modal.png');
  const rectangle = require('@/assets/images/rectangle.png');
  const rectangle1 = require('@/assets/images/rectangle.png');
  const heart = require('@/assets/images/heart_group.png');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>RISK ALERT</Text>

        <Image source={shape} style={styles.shape} />
        <Image source={shape1} style={styles.shape1} />
        <Image source={percentageCircle} style={styles.percentageCircle} />
        <Image source={modal} style={styles.modal} />

        <View style={styles.percentageCircle}>
          <Text style={styles.percentageText}>67%</Text>
        </View>
        
        <View style={styles.modal}></View>
            <Image source={rectangle} style={styles.rectangle} />
            <Image source={rectangle1} style={styles.rectangle1} />
            <Image source={heart} style={styles.rectangle2} />


            <Text style={styles.headerText}>Body Temp</Text>
            <Text style={styles.headerText1}>Blood Pressure</Text>

            <View style={styles.rectangle}>
              <Text style={styles.detailValue}>100°</Text>
              <Text style={styles.detailLabel}>Fahrenheit</Text>
              <Text style={styles.detailValue}>37°</Text>
              <Text style={styles.detailLabel}>Celsius</Text>
            </View>

            <View style={styles.rectangle1}>
              <Text style={styles.detailLabel}>Systolic</Text>
              <Text style={styles.detailValue}>140</Text>
              <Text style={styles.detailLabel}>Diastolic</Text>
              <Text style={styles.detailValue}>90</Text>
            </View>

            <View style={styles.rectangle2}>
              <Text style={styles.headerText2}>Heart</Text>

              <View style={styles.heartContainer}>
              <Text style={styles.heartValue}>105</Text>
              <Text style={styles.heartLabel}>bpm</Text>
              </View>

            </View>

        </View>
    </SafeAreaView>
  );
}

export default App


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff4fe',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  text:{
    color: '#000000',
    fontSize: 32,
    fontWeight: '600',
    alignSelf: 'center',
    position: 'absolute',
    top: 100,
  },
  shape: {
    height: 470,
    left: -50,
    position: 'absolute',
    top: 80,
    alignItems: 'center',
    width: 290,
    transform: [{ scale: 0.7 }],
  },
  shape1: {
    height: 320,
    width: 280,
    right: -50,
    position: 'absolute',
    top: -10,
    transform: [{ scale: 0.9}],
    alignItems: 'center',
  },
  percentageCircle: {
    height: 130,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center',
    position: 'absolute',
    top: 200,
    width: 135,
    transform: [{ scale: 1.3}],
    elevation: 3,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    elevation: 5,
  },
  modal:{
    height: '55%',
    width: '100%',
    resizeMode: 'cover',
    bottom: 0,
    left: 0,
    position: 'absolute',
    justifyContent:'center', 
    alignItems: 'center', 
  },
  rectangle: {
    height: 120,
    position: 'absolute',
    top: 615,
    left: 34,
    width: 131,
    alignItems: 'center',
    justifyContent:'center',
    transform: [{ scale: 1.0}],
  },
  rectangle1: {
    height: 120,
    position: 'absolute',
    top: 450,
    left: 34,
    width: 131,
    alignItems: 'center',
    justifyContent:'center',
    transform: [{ scale: 1.0}],
  },
  rectangle2: {
    height: 350,
    width: 160,
    position: 'absolute',
    top: 400,
    left: 205,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    transform: [{ scale: 0.9}],
  },
  detailLabel: {
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#CD3DB9',
  },
  heartLabel: {
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heartValue: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#CD3DB9',
  },
  headerText: {
    position: 'absolute',
    top: 590,
    left: 58,
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  headerText1: {
    position: 'absolute',
    top: 425,
    left: 45,
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  headerText2: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    marginLeft: 10, 
    marginTop: 10,  
  },
  heartContainer: {
  alignItems: 'flex-start', 
  justifyContent: 'flex-end', 
  position: 'absolute', 
  bottom: 10, 
  left: 10,
  },
})