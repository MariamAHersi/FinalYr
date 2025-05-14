import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

const shape = require('@/assets/images/shape.png');
const shape1 = require('@/assets/images/shape-1.png');
const heart = require('@/assets/images/heart-group.png');

const HealthMetricsScreen = () => {
    // Water intake state
    const [completedCups, setCompletedCups] = useState([false, false, false, false, false, false, false]);
    
    // Metrics state
    const [metrics, setMetrics] = useState({
        fahrenheit: '100',
        celsius: '37',
        systolic: '140',
        diastolic: '90',
        heartRate: '105',
        sleep: '08:00',
        bloodSugar: '5.5' // New blood sugar state in mmol/L
    });
    
    // Editing states
    const [editing, setEditing] = useState({
        fahrenheit: false,
        celsius: false,
        systolic: false,
        diastolic: false,
        heartRate: false,
        sleep: false,
        bloodSugar: false 
    });

    // Blood sugar range indicator
    const [bloodSugarRange, setBloodSugarRange] = useState({
        low: false,
        normal: true,
        high: false
    });

    const toggleCup = (index: number) => {
        const newCompletedCups = [...completedCups];
        newCompletedCups[index] = !newCompletedCups[index];
        setCompletedCups(newCompletedCups);
    };

    const handleMetricChange = (field: string, value: string) => {
        setMetrics(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Update blood sugar range indicators when blood sugar value changes
        if (field === 'bloodSugar') {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
                setBloodSugarRange({
                    low: numValue < 4.0,
                    normal: numValue >= 4.0 && numValue <= 7.8,
                    high: numValue > 7.8
                });
            }
        }
    };

    const toggleEdit = (field: string) => {
        setEditing(prev => ({
            ...prev,
            [field]: !prev[field as keyof typeof prev]
        }));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header with extra top padding */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Today's Metrics</Text>
                    </View>

                    {/* Background shapes positioned absolutely */}
                    <Image source={shape} style={styles.shape} />
                    <Image source={shape1} style={styles.shape1} />
                    
                    {/* Water Card with proper spacing */}
                    <View style={styles.waterCard}>
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
                                        {completed && <Text style={styles.checkmark}>✓</Text>}
                                    </View>
                                    <Text style={styles.cupLabel}>{`${index + 1} Cup${index === 0 ? '' : 's'}`}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Metrics Grid with proper bottom padding */}
                    <View style={styles.gridContainer}>
                        {/* Temperature Card */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Temperature</Text>
                            <TouchableOpacity 
                                onPress={() => toggleEdit('fahrenheit')}
                                style={styles.metricValueContainer}
                            >
                                {editing.fahrenheit ? (
                                    <TextInput
                                        style={styles.input}
                                        value={metrics.fahrenheit}
                                        onChangeText={(text) => handleMetricChange('fahrenheit', text)}
                                        keyboardType="numeric"
                                        autoFocus
                                        onBlur={() => toggleEdit('fahrenheit')}
                                    />
                                ) : (
                                    <Text style={styles.metricValue}>{metrics.fahrenheit}°</Text>
                                )}
                                <Text style={styles.metricLabel}>Fahrenheit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => toggleEdit('celsius')}
                                style={styles.metricValueContainer}
                            >
                                {editing.celsius ? (
                                    <TextInput
                                        style={styles.input}
                                        value={metrics.celsius}
                                        onChangeText={(text) => handleMetricChange('celsius', text)}
                                        keyboardType="numeric"
                                        autoFocus
                                        onBlur={() => toggleEdit('celsius')}
                                    />
                                ) : (
                                    <Text style={styles.metricValue}>{metrics.celsius}°</Text>
                                )}
                                <Text style={styles.metricLabel}>Celsius</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Blood Pressure Card */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Blood Pressure</Text>
                            <TouchableOpacity 
                                onPress={() => toggleEdit('systolic')}
                                style={styles.metricValueContainer}
                            >
                                {editing.systolic ? (
                                    <TextInput
                                        style={styles.input}
                                        value={metrics.systolic}
                                        onChangeText={(text) => handleMetricChange('systolic', text)}
                                        keyboardType="numeric"
                                        autoFocus
                                        onBlur={() => toggleEdit('systolic')}
                                    />
                                ) : (
                                    <Text style={styles.metricValue}>{metrics.systolic}</Text>
                                )}
                                <Text style={styles.metricLabel}>Systolic</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => toggleEdit('diastolic')}
                                style={styles.metricValueContainer}
                            >
                                {editing.diastolic ? (
                                    <TextInput
                                        style={styles.input}
                                        value={metrics.diastolic}
                                        onChangeText={(text) => handleMetricChange('diastolic', text)}
                                        keyboardType="numeric"
                                        autoFocus
                                        onBlur={() => toggleEdit('diastolic')}
                                    />
                                ) : (
                                    <Text style={styles.metricValue}>{metrics.diastolic}</Text>
                                )}
                                <Text style={styles.metricLabel}>Diastolic</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Heart Rate Card */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Heart Rate</Text>
                            <View style={styles.heartContainer}>
                                <Image source={heart} style={styles.heartRate} />
                                <TouchableOpacity 
                                    onPress={() => toggleEdit('heartRate')}
                                    style={styles.bpmContainer}
                                >
                                    {editing.heartRate ? (
                                        <TextInput
                                            style={[styles.input, styles.bpmInput]}
                                            value={metrics.heartRate}
                                            onChangeText={(text) => handleMetricChange('heartRate', text)}
                                            keyboardType="numeric"
                                            autoFocus
                                            onBlur={() => toggleEdit('heartRate')}
                                        />
                                    ) : (
                                        <Text style={styles.bpmValue}>{metrics.heartRate}</Text>
                                    )}
                                    <Text style={styles.bpmLabel}>bpm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sleep Card */}
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Sleep</Text>
                            <TouchableOpacity 
                                onPress={() => toggleEdit('sleep')}
                                style={styles.metricValueContainer}
                            >
                                {editing.sleep ? (
                                    <TextInput
                                        style={styles.input}
                                        value={metrics.sleep}
                                        onChangeText={(text) => handleMetricChange('sleep', text)}
                                        autoFocus
                                        onBlur={() => toggleEdit('sleep')}
                                    />
                                ) : (
                                    <Text style={styles.metricValue}>{metrics.sleep}</Text>
                                )}
                                <Text style={styles.metricLabel}>hours</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    {/* Blood Sugar Card - */}
                    <View style={styles.waterCard}>
                        <Text style={styles.cardTitle}>Blood Sugar</Text>
                        <View style={styles.bloodSugarContainer}>
                            <TouchableOpacity 
                                onPress={() => toggleEdit('bloodSugar')}
                                style={styles.bloodSugarValueContainer}
                            >
                                {editing.bloodSugar ? (
                                    <TextInput
                                        style={styles.bloodSugarInput}
                                        value={metrics.bloodSugar}
                                        onChangeText={(text) => handleMetricChange('bloodSugar', text)}
                                        keyboardType="numeric"
                                        autoFocus
                                        onBlur={() => toggleEdit('bloodSugar')}
                                    />
                                ) : (
                                    <Text style={styles.bloodSugarValue}>{metrics.bloodSugar}</Text>
                                )}
                                <Text style={styles.bloodSugarLabel}>mmol/L</Text>
                            </TouchableOpacity>
                            
                            <View style={styles.bloodSugarRanges}>
                                <TouchableOpacity 
                                    style={[
                                        styles.rangeIndicator, 
                                        bloodSugarRange.low ? styles.activeRangeLow : styles.inactiveRange
                                    ]}
                                >
                                    <Text style={styles.rangeText}>Low</Text>
                                    <Text style={styles.rangeValue}>{"<4.0"}</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.rangeIndicator, 
                                        bloodSugarRange.normal ? styles.activeRangeNormal : styles.inactiveRange
                                    ]}
                                >
                                    <Text style={styles.rangeText}>Normal</Text>
                                    <Text style={styles.rangeValue}>4.0-7.8</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={[
                                        styles.rangeIndicator, 
                                        bloodSugarRange.high ? styles.activeRangeHigh : styles.inactiveRange
                                    ]}
                                >
                                    <Text style={styles.rangeText}>High</Text>
                                    <Text style={styles.rangeValue}>{">7.8"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    {/* Extra padding at the bottom */}
                    <View style={{ height: 30 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    shape: {
        position: 'absolute',
        top: height * 0.3,
        left: -width * 0.3,
        width: width * 0.8,
        height: width * 0.8,
        opacity: 0.6,
        zIndex: -1,
    },
    shape1: {
        position: 'absolute',
        top: height * 0.05,
        right: -width * 0.2,
        width: width * 0.6,
        height: width * 0.6,
        opacity: 0.6,
        zIndex: -1,
    },
    waterCard: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        minHeight: 160,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 12,
    },
    completionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    cupIndicator: {
        alignItems: 'center',
        width: 40,
    },
    checkCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    completedCircle: {
        backgroundColor: '#e79df1',
    },
    incompleteCircle: {
        backgroundColor: '#fbedfd',
        borderWidth: 1,
        borderColor: '#e79df1',
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cupLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    heartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    heartRate: {
        width: 80,
        height: 60,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    bpmContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    bpmValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#cc2ae1',
        marginRight: 4,
    },
    bpmLabel: {
        fontSize: 14,
        color: '#666',
    },
    metricValueContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    metricValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#cc2ae1',
    },
    metricLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    input: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8d1dd7',
        textAlign: 'center',
        padding: 0,
        margin: 0,
        minWidth: 60,
    },
    bpmInput: {
        marginRight: 4,
    },
    
    // Blood Sugar specific styles
    bloodSugarContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    bloodSugarValueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginBottom: 16,
    },
    bloodSugarValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#cc2ae1',
        marginRight: 4,
    },
    bloodSugarLabel: {
        fontSize: 16,
        color: '#666',
    },
    bloodSugarInput: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#8d1dd7',
        textAlign: 'center',
        padding: 0,
        margin: 0,
        marginRight: 4,
        minWidth: 80,
    },
    bloodSugarRanges: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 5,
    },
    rangeIndicator: {
        width: '30%',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    activeRangeLow: {
        backgroundColor: '#ffeeee',
        borderWidth: 1,
        borderColor: '#ff9999',
    },
    activeRangeNormal: {
        backgroundColor: '#e7f7e7',
        borderWidth: 1,
        borderColor: '#8cd28c',
    },
    activeRangeHigh: {
        backgroundColor: '#fff0e0',
        borderWidth: 1,
        borderColor: '#ffaa66',
    },
    inactiveRange: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    rangeText: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    rangeValue: {
        fontSize: 10,
        color: '#666',
    },
});

export default HealthMetricsScreen;