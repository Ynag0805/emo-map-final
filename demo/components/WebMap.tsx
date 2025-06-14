import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import type { MusicCapsule, NearbyUser } from '@/types';
import * as Location from 'expo-location';

interface WebMapProps {
  center: [number, number];
  capsules: MusicCapsule[];
  nearbyUsers: NearbyUser[];
  onMarkerPress: (item: MusicCapsule | NearbyUser) => void;
  userLocation: Location.LocationObject | null;
}

export function WebMap({ center, capsules, nearbyUsers, onMarkerPress, userLocation }: WebMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Dynamically import Leaflet only on web
    const initMap = async () => {
      const L = await import('leaflet');
      
      // Import Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      if (mapRef.current && !leafletMapRef.current) {
        // Initialize map
        leafletMapRef.current = L.map(mapRef.current).setView(center, 13);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(leafletMapRef.current);

        // Add user location marker if available
        if (userLocation) {
          const userIcon = L.divIcon({
            html: `<div style="
              width: 20px; 
              height: 20px; 
              background: #007AFF; 
              border: 3px solid white; 
              border-radius: 50%; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>`,
            className: 'user-location-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

          L.marker([userLocation.coords.latitude, userLocation.coords.longitude], { icon: userIcon })
            .addTo(leafletMapRef.current);
        }
      }
    };

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web' || !leafletMapRef.current) return;

    const updateMarkers = async () => {
      const L = await import('leaflet');

      // Clear existing markers
      markersRef.current.forEach(marker => {
        leafletMapRef.current.removeLayer(marker);
      });
      markersRef.current = [];

      // Add capsule markers
      capsules.forEach(capsule => {
        const capsuleIcon = L.divIcon({
          html: `<div style="
            width: 40px; 
            height: 40px; 
            background: #FF6B35; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>`,
          className: 'capsule-marker',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        const marker = L.marker([capsule.coordinate.latitude, capsule.coordinate.longitude], { icon: capsuleIcon })
          .addTo(leafletMapRef.current)
          .on('click', () => onMarkerPress(capsule));

        markersRef.current.push(marker);
      });

      // Add nearby user markers
      nearbyUsers.forEach(user => {
        const userIcon = L.divIcon({
          html: `<div style="
            width: 32px; 
            height: 32px; 
            background: #00CED1; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>`,
          className: 'user-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([user.coordinate.latitude, user.coordinate.longitude], { icon: userIcon })
          .addTo(leafletMapRef.current)
          .on('click', () => onMarkerPress(user));

        markersRef.current.push(marker);
      });
    };

    updateMarkers();
  }, [capsules, nearbyUsers, onMarkerPress]);

  useEffect(() => {
    if (Platform.OS !== 'web' || !leafletMapRef.current) return;

    leafletMapRef.current.setView(center, 13);
  }, [center]);

  if (Platform.OS !== 'web') {
    return (
      <View style={styles.fallback}>
        <View style={styles.fallbackContent}>
          <View style={styles.fallbackText}>地圖功能需要在網頁版使用</View>
        </View>
      </View>
    );
  }

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackContent: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  fallbackText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});