import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

// Define types for our components and data
interface Hospital {
  id: string;
  name: string;
  address: string;
  openHours: string;
  phone: string;
  rating: number;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

// Sample data with actual coordinates
const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'Royal Free Hospital',
    address: 'Pond St, London NW3 2QG',
    openHours: 'Open 24 hours',
    phone: '02077940500',
    rating: 5,
    coordinate: {
      latitude: 51.5529,
      longitude: -0.1679,
    },
  },
  {
    id: '2',
    name: "Queen Charlotte's and Chelsea Hospital",
    address: 'Du Cane Rd, London W12 0HS',
    openHours: 'Open 24 hours',
    phone: '02033131111',
    rating: 4,
    coordinate: {
      latitude: 51.5167,
      longitude: -0.2344,
    },
  },
  {
    id: '3',
    name: 'Whittington Hospital Labour Ward',
    address: 'Magdala Ave, London N19 5NF',
    openHours: 'Open 24 hours',
    phone: '02072885502',
    rating: 4,
    coordinate: {
      latitude: 51.5658,
      longitude: -0.1398,
    },
  },
];

// Calculate the region to show all hospitals
const initialRegion = {
  latitude: hospitals.reduce((sum, hospital) => sum + hospital.coordinate.latitude, 0) / hospitals.length,
  longitude: hospitals.reduce((sum, hospital) => sum + hospital.coordinate.longitude, 0) / hospitals.length,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

// Render stars for hospital ratings
const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FontAwesome
        key={i}
        name="star"
        size={14}
        color={i < rating ? '#FFD700' : '#E0E0E0'}
        style={{ marginRight: 2 }}
      />
    );
  }
  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

// Web-specific map component
const WebMap = () => (
  <View style={styles.mapContainer}>
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19868.687203537543!2d-0.1278!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1683034761015!5m2!1sen!2suk"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="London Map"
      />
      
      {/* Markers with more realistic positions */}
      {hospitals.map((hospital) => (
        <div
          key={hospital.id}
          style={{
            position: 'absolute',
            // Simplified positioning for demo purposes
            left: `${(hospital.coordinate.longitude + 0.2344) * 200}%`,
            top: `${(51.5658 - hospital.coordinate.latitude) * 200}%`,
            width: 20,
            height: 20,
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            cursor: 'pointer',
          }}
          title={hospital.name}
        />
      ))}
    </div>
  </View>
);

// Native-specific map component
const NativeMap = () => (
  <MapView 
    style={styles.mapContainer}
    initialRegion={initialRegion}
  >
    {hospitals.map((hospital) => (
      <Marker
        key={hospital.id}
        coordinate={hospital.coordinate}
        title={hospital.name}
        description={hospital.address}
      />
    ))}
  </MapView>
);

// Hospital list component
const HospitalList = () => (
  <ScrollView style={styles.listContainer}>
    {hospitals.map((hospital) => (
      <View key={hospital.id} style={styles.hospitalCard}>
        <View style={styles.hospitalInfo}>
          <Text style={styles.hospitalName}>{hospital.name}</Text>
          <Text style={styles.hospitalAddress}>{hospital.address}</Text>
          <Text style={styles.hospitalHours}>{hospital.openHours}</Text>
          <Text style={styles.hospitalPhone}>{hospital.phone}</Text>
          <RatingStars rating={hospital.rating} />
        </View>
      </View>
    ))}
  </ScrollView>
);

// Main component
export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Maternity Wards</Text>
        <Text style={styles.headerSubtitle}>Near You</Text>
      </View>

      {/* Map - conditionally render based on platform */}
      {Platform.OS === 'web' ? <WebMap /> : <NativeMap />}

      {/* Hospital List */}
      <HospitalList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  mapContainer: {
    height: 250,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    overflow: 'hidden',
  },
  listContainer: {
    flex: 1,
  },
  hospitalCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fafafa',
  },
  hospitalInfo: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  hospitalHours: {
    fontSize: 12,
    color: '#4CAF50',
    marginBottom: 2,
  },
  hospitalPhone: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
});