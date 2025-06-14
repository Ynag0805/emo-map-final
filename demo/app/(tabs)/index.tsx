import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Music, Users, MapPin } from 'lucide-react-native';
import { MusicPlayer } from '@/components/MusicPlayer';
import { WebMap } from '@/components/WebMap';
import { mockCapsules, mockNearbyUsers } from '@/data/mockData';
import type { MusicCapsule, NearbyUser } from '@/types';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [searchText, setSearchText] = useState('');
  const [mode, setMode] = useState<'capsules' | 'nearby'>('capsules');
  const [selectedItem, setSelectedItem] = useState<MusicCapsule | NearbyUser | null>(null);
  const [filteredCapsules, setFilteredCapsules] = useState(mockCapsules);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') {
        // For web, use a default location (Taipei)
        setLocation({
          coords: {
            latitude: 25.0330,
            longitude: 121.5654,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        });
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('權限被拒絕', '需要位置權限才能顯示您的位置');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredCapsules(mockCapsules);
    } else {
      const filtered = mockCapsules.filter(
        (capsule) =>
          capsule.title.toLowerCase().includes(searchText.toLowerCase()) ||
          capsule.artist.toLowerCase().includes(searchText.toLowerCase()) ||
          capsule.hashtags.some(tag => 
            tag.toLowerCase().includes(searchText.toLowerCase())
          )
      );
      setFilteredCapsules(filtered);
    }
  }, [searchText]);

  const handleMarkerPress = (item: MusicCapsule | NearbyUser) => {
    setSelectedItem(item);
  };

  const handleLocationButtonPress = () => {
    if (location) {
      // This will be handled by the WebMap component
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search and Controls Section */}
      <View style={styles.topSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜尋歌曲或 #標籤"
            placeholderTextColor="#999999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Mode Toggle */}
        <View style={styles.modeToggle}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === 'capsules' && styles.modeButtonActive,
            ]}
            onPress={() => setMode('capsules')}
          >
            <Text style={[
              styles.modeButtonText,
              mode === 'capsules' && styles.modeButtonTextActive,
            ]}>
              音樂膠囊
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === 'nearby' && styles.modeButtonActive,
            ]}
            onPress={() => setMode('nearby')}
          >
            <Text style={[
              styles.modeButtonText,
              mode === 'nearby' && styles.modeButtonTextActive,
            ]}>
              附近聆聽
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <WebMap
          center={location ? [location.coords.latitude, location.coords.longitude] : [25.0330, 121.5654]}
          capsules={mode === 'capsules' ? filteredCapsules : []}
          nearbyUsers={mode === 'nearby' ? mockNearbyUsers : []}
          onMarkerPress={handleMarkerPress}
          userLocation={location}
        />

        {/* User Location Button */}
        {location && (
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleLocationButtonPress}
          >
            <MapPin size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Music Player Bottom Sheet */}
      <MusicPlayer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#FF6B35',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  modeButtonTextActive: {
    color: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 1000,
  },
});