export interface MusicCapsule {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  hashtags: string[];
  location: string;
  description?: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface NearbyUser {
  id: string;
  name: string;
  avatar: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  currentSong: string;
  location: string;
  isListening: boolean;
}