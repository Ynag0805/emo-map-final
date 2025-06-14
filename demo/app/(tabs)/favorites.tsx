import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Play, MapPin } from 'lucide-react-native';
import { mockFavorites } from '@/data/mockData';
import type { MusicCapsule } from '@/types';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState(mockFavorites);

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const renderFavoriteItem = ({ item }: { item: MusicCapsule }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.itemContent}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{item.artist}</Text>
        <View style={styles.hashtagContainer}>
          {item.hashtags.slice(0, 2).map((tag, index) => (
            <Text key={index} style={styles.hashtag}>#{tag}</Text>
          ))}
        </View>
        <View style={styles.locationRow}>
          <MapPin size={12} color="#666666" />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.playButton}>
          <Play size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.heartButton}
          onPress={() => removeFavorite(item.id)}
        >
          <Heart size={20} color="#FF6B35" fill="#FF6B35" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>我的收藏</Text>
        <Text style={styles.headerSubtitle}>{favorites.length} 首歌曲</Text>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Heart size={64} color="#CCCCCC" />
          <Text style={styles.emptyTitle}>還沒有收藏的歌曲</Text>
          <Text style={styles.emptySubtitle}>在地圖上發現喜歡的音樂，點擊愛心收藏吧！</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  listContainer: {
    padding: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  artist: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  hashtagContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  hashtag: {
    fontSize: 12,
    color: '#FF6B35',
    marginRight: 8,
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  actionButtons: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  heartButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});