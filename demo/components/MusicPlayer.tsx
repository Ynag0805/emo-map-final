import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { WebView } from 'react-native-webview';
import { Play, Pause, Heart, MapPin, Hash, X } from 'lucide-react-native';
import type { MusicCapsule, NearbyUser } from '@/types';

const { width } = Dimensions.get('window');

interface MusicPlayerProps {
  item: MusicCapsule | NearbyUser | null;
  onClose: () => void;
}

export function MusicPlayer({ item, onClose }: MusicPlayerProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFavorited, setIsFavorited] = React.useState(false);

  useEffect(() => {
    if (item) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [item]);

  if (!item) return null;

  const isCapsule = 'youtubeId' in item;
  const musicData = isCapsule ? item as MusicCapsule : null;

  const getYouTubeEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=0&controls=1&rel=0&modestbranding=1`;
  };

  const renderContent = () => {
    if (!isCapsule) {
      // Nearby user content
      const user = item as NearbyUser;
      return (
        <View style={styles.userContent}>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userActivity}>正在聆聽: {user.currentSong}</Text>
          <Text style={styles.userLocation}>
            <MapPin size={12} color="#666666" /> {user.location}
          </Text>
        </View>
      );
    }

    // Music capsule content
    return (
      <View style={styles.capsuleContent}>
        {/* Header */}
        <View style={styles.playerHeader}>
          <View style={styles.songInfo}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {musicData!.title}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {musicData!.artist}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorited(!isFavorited)}
          >
            <Heart
              size={24}
              color={isFavorited ? '#FF6B35' : '#CCCCCC'}
              fill={isFavorited ? '#FF6B35' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* YouTube Player */}
        {Platform.OS === 'web' ? (
          <View style={styles.webPlayerContainer}>
            <iframe
              width="100%"
              height="200"
              src={getYouTubeEmbedUrl(musicData!.youtubeId)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: 12 }}
            />
          </View>
        ) : (
          <View style={styles.playerContainer}>
            <WebView
              source={{ uri: getYouTubeEmbedUrl(musicData!.youtubeId) }}
              style={styles.webView}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />
          </View>
        )}

        {/* Song Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.hashtagContainer}>
            {musicData!.hashtags.map((tag, index) => (
              <View key={index} style={styles.hashtag}>
                <Hash size={12} color="#FF6B35" />
                <Text style={styles.hashtagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.locationContainer}>
            <MapPin size={16} color="#666666" />
            <Text style={styles.locationText}>{musicData!.location}</Text>
          </View>

          {musicData!.description && (
            <Text style={styles.description}>{musicData!.description}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['50%', '80%']}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color="#666666" />
        </TouchableOpacity>
        {renderContent()}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  handleIndicator: {
    backgroundColor: '#CCCCCC',
    width: 40,
    height: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  capsuleContent: {
    flex: 1,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  songInfo: {
    flex: 1,
    marginRight: 16,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  artistName: {
    fontSize: 16,
    color: '#666666',
  },
  favoriteButton: {
    padding: 8,
  },
  webPlayerContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  playerContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    borderRadius: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  hashtag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  hashtagText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  userContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  userActivity: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  userLocation: {
    fontSize: 12,
    color: '#666666',
  },
});