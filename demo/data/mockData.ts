import type { MusicCapsule, NearbyUser } from '@/types';

export const mockCapsules: MusicCapsule[] = [
  {
    id: '1',
    title: '告白氣球',
    artist: '周杰倫',
    youtubeId: 'bu7uwy6hUzI',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=150',
    coordinate: {
      latitude: 25.0330,
      longitude: 121.5654,
    },
    hashtags: ['流行', '抒情', '愛情'],
    location: '台北市信義區',
    description: '在這個美好的午後，想起了初戀的甜蜜',
    uploadedBy: '音樂愛好者',
    uploadedAt: '2024-01-15',
  },
  {
    id: '2',
    title: '漂向北方',
    artist: '黃明志 ft. 王力宏',
    youtubeId: 'VkDy8H2h8F8',
    thumbnail: 'https://images.pexels.com/photos/1916821/pexels-photo-1916821.jpeg?auto=compress&cs=tinysrgb&w=150',
    coordinate: {
      latitude: 25.0478,
      longitude: 121.5318,
    },
    hashtags: ['嘻哈', '勵志', '夢想'],
    location: '台北市中山區',
    description: '追夢路上的心聲',
    uploadedBy: '說唱愛好者',
    uploadedAt: '2024-01-14',
  },
  {
    id: '3',
    title: '小幸運',
    artist: '田馥甄',
    youtubeId: 'YjUGgaO3A_8',
    thumbnail: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=150',
    coordinate: {
      latitude: 25.0418,
      longitude: 121.5753,
    },
    hashtags: ['抒情', '電影', '溫暖'],
    location: '台北市松山區',
    description: '我們的小幸運',
    uploadedBy: '電影音樂迷',
    uploadedAt: '2024-01-13',
  },
  {
    id: '4',
    title: '演員',
    artist: '薛之謙',
    youtubeId: 'Nt6kKhlX8vU',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=150',
    coordinate: {
      latitude: 25.0138,
      longitude: 121.5452,
    },
    hashtags: ['抒情', '傷感', '愛情'],
    location: '台北市大安區',
    description: '簡單的劇情，內心戲太足',
    uploadedBy: '抒情王子',
    uploadedAt: '2024-01-12',
  },
  {
    id: '5',
    title: '海闊天空',
    artist: 'Beyond',
    youtubeId: 'qu_FSptjRic',
    thumbnail: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=150',
    coordinate: {
      latitude: 25.0268,
      longitude: 121.5171,
    },
    hashtags: ['搖滾', '經典', '勵志'],
    location: '台北市萬華區',
    description: '永遠的經典，永不放棄的精神',
    uploadedBy: '搖滾青年',
    uploadedAt: '2024-01-11',
  },
];

export const mockNearbyUsers: NearbyUser[] = [
  {
    id: 'u1',
    name: '小明',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    coordinate: {
      latitude: 25.0320,
      longitude: 121.5630,
    },
    currentSong: '晴天 - 周杰倫',
    location: '台北市信義區',
    isListening: true,
  },
  {
    id: 'u2',
    name: '小美',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    coordinate: {
      latitude: 25.0450,
      longitude: 121.5300,
    },
    currentSong: '後來 - 劉若英',
    location: '台北市中山區',
    isListening: true,
  },
  {
    id: 'u3',
    name: '小華',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    coordinate: {
      latitude: 25.0400,
      longitude: 121.5700,
    },
    currentSong: '稻香 - 周杰倫',
    location: '台北市松山區',
    isListening: true,
  },
];

export const mockFavorites: MusicCapsule[] = [
  mockCapsules[0],
  mockCapsules[2],
  mockCapsules[4],
];