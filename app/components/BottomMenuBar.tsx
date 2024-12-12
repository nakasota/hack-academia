import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface MenuItem {
  label: string;
  screen: string;
}

const BottomMenuBar: React.FC = () => {
  const navigation = useNavigation();

  // ボタンの情報を配列として管理
  const menuItems: MenuItem[] = [
    { label: 'ホーム', screen: 'screens/HomeScreen' },
    { label: 'アラーム', screen: 'screens/AlarmSettingsScreen' },
    { label: '問題', screen: 'screens/QuestionScreen' },
    { label: '設定', screen: 'screens/SettingsScreen' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.menuButton} 
          onPress={() => navigation.navigate(item.screen as never)}
        >
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  menuButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomMenuBar;
