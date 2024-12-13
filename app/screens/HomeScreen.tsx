import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomMenuBar from '../components/BottomMenuBar';

// ダミーデータ
const dummyData = {
  learningStreak: 6, // 学習継続日数
  correctRate: 85, // 正答率
  nextStudy: "英単語: 20個", // 次の学習予定
};

const HomeScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>ホーム画面</Text>
        
        {/* 学習継続日数 */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>学習継続日数: {dummyData.learningStreak}日</Text>
        </View>
        
        {/* 正答率 */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>正答率: {dummyData.correctRate}%</Text>
        </View>

        {/* 次回の学習予定 */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>次回の学習予定: {dummyData.nextStudy}</Text>
        </View>
      </View>
      <BottomMenuBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
});

export default HomeScreen;
