import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Bell, MapPin, Volume2, Shield, CircleHelp as HelpCircle, Star, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [locationSharing, setLocationSharing] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(false);

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showSwitch = false, 
    switchValue, 
    onSwitchChange 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E0E0E0', true: '#FF6B35' }}
          thumbColor={switchValue ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : (
        <ChevronRight size={20} color="#CCCCCC" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Settings size={32} color="#FF6B35" />
        <Text style={styles.headerTitle}>設定</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>偏好設定</Text>
          
          <SettingItem
            icon={<Bell size={20} color="#FF6B35" />}
            title="推播通知"
            subtitle="接收附近新音樂膠囊的通知"
            showSwitch
            switchValue={notifications}
            onSwitchChange={setNotifications}
          />
          
          <SettingItem
            icon={<MapPin size={20} color="#00CED1" />}
            title="位置分享"
            subtitle="允許其他用戶看到您正在聆聽的音樂"
            showSwitch
            switchValue={locationSharing}
            onSwitchChange={setLocationSharing}
          />
          
          <SettingItem
            icon={<Volume2 size={20} color="#32CD32" />}
            title="自動播放"
            subtitle="自動播放點擊的音樂膠囊"
            showSwitch
            switchValue={autoPlay}
            onSwitchChange={setAutoPlay}
          />
        </View>

        {/* Privacy & Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>隱私與安全</Text>
          
          <SettingItem
            icon={<Shield size={20} color="#666666" />}
            title="隱私政策"
            onPress={() => {}}
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>支援</Text>
          
          <SettingItem
            icon={<HelpCircle size={20} color="#666666" />}
            title="幫助中心"
            subtitle="常見問題與使用教學"
            onPress={() => {}}
          />
          
          <SettingItem
            icon={<Star size={20} color="#666666" />}
            title="評價應用程式"
            subtitle="在 App Store 給我們評分"
            onPress={() => {}}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>音樂探索地圖</Text>
          <Text style={styles.appVersion}>版本 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 12,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    paddingHorizontal: 16,
    paddingVertical: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 12,
    color: '#666666',
  },
});