import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Upload, Youtube, Hash, MapPin, Send } from 'lucide-react-native';
import * as Location from 'expo-location';

export default function UploadScreen() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationName, setLocationName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    if (Platform.OS === 'web') {
      setLocationName('台北市信義區');
      return;
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('權限被拒絕', '需要位置權限才能設定音樂膠囊位置');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Get address from coordinates
      const address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address.length > 0) {
        const addr = address[0];
        setLocationName(`${addr.city || ''} ${addr.district || ''} ${addr.street || ''}`);
      }
    } catch (error) {
      Alert.alert('錯誤', '無法取得位置資訊');
    }
  };

  const validateYouTubeUrl = (url: string) => {
    const regex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return regex.test(url);
  };

  const handleSubmit = async () => {
    if (!youtubeUrl.trim()) {
      Alert.alert('錯誤', '請輸入 YouTube 連結');
      return;
    }

    if (!validateYouTubeUrl(youtubeUrl)) {
      Alert.alert('錯誤', '請輸入有效的 YouTube 連結');
      return;
    }

    if (!hashtags.trim()) {
      Alert.alert('錯誤', '請至少輸入一個標籤');
      return;
    }

    if (!locationName) {
      Alert.alert('錯誤', '請選擇音樂膠囊的位置');
      return;
    }

    setIsLoading(true);

    // Simulate upload process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        '上傳成功！',
        '您的音樂膠囊已成功上傳到地圖上',
        [
          {
            text: '確定',
            onPress: () => {
              setYoutubeUrl('');
              setHashtags('');
              setDescription('');
              setLocationName('');
              setLocation(null);
            },
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Upload size={32} color="#FF6B35" />
          <Text style={styles.headerTitle}>上傳音樂膠囊</Text>
          <Text style={styles.headerSubtitle}>分享您喜愛的音樂給附近的人</Text>
        </View>

        <View style={styles.form}>
          {/* YouTube URL Input */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Youtube size={20} color="#FF6B35" />
              <Text style={styles.labelText}>YouTube 連結</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="https://www.youtube.com/watch?v=..."
              placeholderTextColor="#999999"
              value={youtubeUrl}
              onChangeText={setYoutubeUrl}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          {/* Hashtags Input */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Hash size={20} color="#32CD32" />
              <Text style={styles.labelText}>標籤</Text>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="例如：流行音樂 抒情 週末"
              placeholderTextColor="#999999"
              value={hashtags}
              onChangeText={setHashtags}
            />
            <Text style={styles.helperText}>用空格分隔多個標籤</Text>
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.labelText}>描述（選填）</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="分享這首歌的故事或心情..."
              placeholderTextColor="#999999"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Location Input */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <MapPin size={20} color="#00CED1" />
              <Text style={styles.labelText}>位置</Text>
            </View>
            <View style={styles.locationContainer}>
              <TextInput
                style={[styles.textInput, styles.locationInput]}
                placeholder="選擇音樂膠囊的位置"
                placeholderTextColor="#999999"
                value={locationName}
                onChangeText={setLocationName}
                editable={false}
              />
              <TouchableOpacity
                style={styles.locationButton}
                onPress={getCurrentLocation}
              >
                <Text style={styles.locationButtonText}>使用目前位置</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>
            {isLoading ? '上傳中...' : '上傳音樂膠囊'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  helperText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  locationContainer: {
    gap: 8,
  },
  locationInput: {
    color: '#666666',
  },
  locationButton: {
    backgroundColor: '#00CED1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});