import {Dimensions, View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { Svg, Circle, Path, Line } from 'react-native-svg';
import React, { useState } from 'react';

const shape = require('@/assets/images/shape.png');
const shape1 = require('@/assets/images/shape-1.png');
const heart = require('@/assets/images/heart-group.png');


const HealthMetricsScreen = () => {
    // Track which cups are completed
    const [completedCups, setCompletedCups] = useState([
      true,  // 1st cup
      true,  // 2nd cup
      true,  // 3rd cup
      true,  // 4th cup
      true,  // 5th cup
      false, // 6th cup
      false  // 7th cup
    ]);

  
    // Toggle cup completion status
    const toggleCup = (index: number) => {
      const newCompletedCups = [...completedCups];
      newCompletedCups[index] = !newCompletedCups[index];
      setCompletedCups(newCompletedCups);
    };
    
    return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todays Metrics</Text>
      
      <Image source={shape} style={styles.shape} />
      <Image source={shape1} style={styles.shape1} />
                
      
      {/* Water Card */}
      <View style={[styles.waterCard, styles.cardInfo]}>
      <Text style={styles.cardTitle}>Water Intake</Text>

      <View style={styles.completionContainer}>
        {completedCups.map((completed, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.cupIndicator}
            onPress={() => toggleCup(index)}
          >
            <View style={[
              styles.checkCircle,
              completed ? styles.completedCircle : styles.incompleteCircle
            ]}>
              {completed && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.cupLabel}>{`${index + 1} Cup${index === 0 ? '' : 's'}`}</Text>
          </TouchableOpacity>
        ))}
        </View>
      </View>

      {/* Temperature Card */}
      <View style={[styles.card, styles.cardInfo]}>
        <Text style={styles.cardTitle}> Temperature </Text>
        <Text style={styles.bpLabel}>Fahrenheit</Text>
        <Text style={styles.bpValue}>100°</Text>
        <Text style={styles.bpLabel}>Celsius</Text>
        <Text style={styles.bpValue}>37°</Text>
      </View>

      {/* Blood Pressure Card */}
      <View style={[styles.card, styles.cardInfo]}>
        <Text style={styles.cardTitle}>Blood Pressure</Text>
        <Text style={styles.bpLabel}>Systolic</Text>
        <Text style={styles.bpValue}>140</Text>
        <Text style={styles.bpLabel}>Diastolic</Text>
        <Text style={styles.bpValue}>90</Text>
      </View>

      {/* Heart Rate Card */}
      <View style={[styles.card, styles.cardInfo]}>
        <Text style={styles.cardTitle}>Heart</Text>
        <View style={styles.heartContainer}>

        <Image source={heart} style={styles.heartRate} />
          
          <Text style={styles.bpmValue}>105</Text>
          <Text style={styles.bpmLabel}>bpm</Text>
        </View>
      </View>

      {/* Sleep Card */}
      <View style={[styles.card, styles.cardInfo]}>
        <Text style={styles.cardTitle}>Sleep</Text>
        <Text style={styles.sleepValue}>08:00</Text>
        <Text style={styles.sleepUnit}>hours</Text>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  shape: {
    height: 470,
    left: -50,
    position: 'absolute',
    top: 300,
    alignItems: 'center',
    width: 290,
    transform: [{ scale: 0.7 }],
  },
  shape1: {
    height: 320,
    width: 280,
    right: -50,
    position: 'absolute',
    top: 30,
    transform: [{ scale: 0.9}],
    alignItems: 'center',
  },
  card: {
    width: '48%',
    height: '23%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  waterCard: {
    width: '100%',
    height: '13%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  cupIndicator: {
    alignItems: 'center',
    width: 40,
  },
  checkCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  completedCircle: {
    backgroundColor: '#e79df1',
  },
  incompleteCircle: {
    backgroundColor: '#fbedfd',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cupLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: '#333',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  selectedRadio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#48b0f7', // The blue color from the button
  },
  radioText: {
    fontSize: 16,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  stepsTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  stepsValue: {
    color: '#47acdf',
    fontSize: 24,
    fontWeight: 'bold',
  },
  stepsLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  bpValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8d1dd7',
    marginTop: 10,
  },
  bpLabel: {
    fontSize: 14,
    color: '#333',
  },
  heartContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  heartRate: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    transform: [{ scale: 0.6}],
  },
  bpmValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8d1dd7',
    marginRight: 5,
  },
  bpmLabel: {
    fontSize: 14,
    color: '#333',
  },
  sleepValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8d1dd7',
    marginTop: 10,
  },
  sleepUnit: {
    fontSize: 14,
    color: '#333',
  },
});

export default HealthMetricsScreen;