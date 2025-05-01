import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface Ward {
  place_id: string;
  name: string;
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  opening_hours?: {
    open_now: boolean;
  };
}

const MaternalWardsScreen = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

  // Replace with your actual API key
  const GOOGLE_API_KEY = 'AIzaSyA9OR_EHH_5fdzB_eBVPY7pvLdurA1K8K8';

  const fetchNearbyWards = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${lat},${lng}` +
        `&radius=5000` +
        `&keyword=maternity+ward+OR+obstetrics+OR+prenatal+clinic` +
        `&type=health` +
        `&key=${GOOGLE_API_KEY}`
      );

      const data = await response.json();
      
      if (data.status === 'REQUEST_DENIED') {
        Alert.alert(
          'API Configuration Error',
          'Please check your Google API key and ensure Places API is enabled',
          [{ text: 'OK' }]
        );
        return [];
      }

      return data.results || [];
    } catch (err) {
      console.error('API Error:', err);
      return [];
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // 1. Get location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied. Please enable in settings.');
          setLoading(false);
          return;
        }

        // 2. Get current location
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude
        });

        // 3. Fetch nearby wards
        const results = await fetchNearbyWards(coords.latitude, coords.longitude);
        
        if (results.length === 0) {
          // Fallback to mock data
          const mockWards: Ward[] = [
            {
              place_id: 'mock1',
              name: 'City Maternity Hospital',
              vicinity: '123 Healthcare Avenue',
              geometry: {
                location: {
                  lat: coords.latitude + 0.01,
                  lng: coords.longitude + 0.01
                }
              },
              rating: 4.5,
              opening_hours: { open_now: true }
            },
            {
              place_id: 'mock2',
              name: 'Women & Children Center',
              vicinity: '456 Wellness Street',
              geometry: {
                location: {
                  lat: coords.latitude - 0.01,
                  lng: coords.longitude - 0.01
                }
              },
              rating: 4.2,
              opening_hours: { open_now: false }
            }
          ];
          setWards(mockWards);
          setError('No maternity wards found - showing sample locations');
        } else {
          setWards(results);
        }
      } catch (err) {
        setError('Failed to load maternity ward data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const openDirections = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    Linking.openURL(url).catch(err => console.error("Couldn't open directions:", err));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e79df1" />
        <Text style={styles.loadingText}>Finding nearby maternity wards...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map View (Top 40%) */}
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {/* User Location Marker */}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
              pinColor="#4285F4"
            />

            {/* Maternity Ward Markers */}
            {wards.map((ward) => (
              <Marker
                key={ward.place_id}
                coordinate={{
                  latitude: ward.geometry.location.lat,
                  longitude: ward.geometry.location.lng,
                }}
                title={ward.name}
                description={ward.vicinity}
                pinColor="#e79df1"
                onPress={() => setSelectedWard(ward)}
              />
            ))}
          </MapView>
        )}
      </View>

      {/* List View (Bottom 60%) */}
      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Nearby Maternity Wards</Text>
        
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          {wards.map((ward) => (
            <TouchableOpacity
              key={ward.place_id}
              style={[
                styles.wardItem,
                selectedWard?.place_id === ward.place_id && styles.selectedWardItem
              ]}
              onPress={() => setSelectedWard(ward)}
            >
              <View style={styles.wardInfo}>
                <Text style={styles.wardName}>{ward.name}</Text>
                <Text style={styles.wardAddress}>{ward.vicinity}</Text>
                <View style={styles.wardMeta}>
                  {ward.rating && (
                    <Text style={styles.wardRating}>⭐ {ward.rating.toFixed(1)}</Text>
                  )}
                  <Text style={[
                    styles.wardStatus,
                    ward.opening_hours?.open_now ? styles.open : styles.closed
                  ]}>
                    {ward.opening_hours?.open_now ? 'Open Now' : 'Closed'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={() => openDirections(
                  ward.geometry.location.lat,
                  ward.geometry.location.lng
                )}
              >
                <Text style={styles.directionsText}>Directions</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mapContainer: {
    height: height * 0.4,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#202124',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  wardItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedWardItem: {
    borderColor: '#e79df1',
    backgroundColor: '#faf5fc',
  },
  wardInfo: {
    flex: 1,
  },
  wardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 4,
  },
  wardAddress: {
    fontSize: 14,
    color: '#5f6368',
    marginBottom: 8,
  },
  wardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wardRating: {
    fontSize: 14,
    color: '#FFA000',
    marginRight: 12,
  },
  wardStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  open: {
    color: '#0D904F',
  },
  closed: {
    color: '#D93025',
  },
  directionsButton: {
    backgroundColor: '#e79df1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  directionsText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    color: '#5f6368',
  },
  errorBanner: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
});

export default MaternalWardsScreen;