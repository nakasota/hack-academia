import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Date and time picker
import BottomMenuBar from '../components/BottomMenuBar';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';  // 追加: expo-avをインポート
// import { SchedulableTriggerInputTypes } from 'expo-notifications';

interface Alarm {
  id: string;
  date: string;
  time: string;
  question: string;
}

const AlarmSettingsScreen: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [date, setDate] = useState<Date>(new Date()); // Date
  const [time, setTime] = useState<Date>(new Date()); // Time
  const [question, setQuestion] = useState<string>(''); // Question
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false); // Date picker visibility
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false); // Time picker visibility
  const [sound, setSound] = useState<any>(null);  // 音声状態を管理

  // 通知の許可をリクエスト
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('通知の許可が必要です。');
      }
    };

    requestPermissions();
  }, []);

  // アラーム音の読み込み
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/alarm/alarm-sound.mp3')  // アラーム音ファイルのパスを指定
      );
      setSound(sound);
    };

    loadSound();  // コンポーネントがマウントされた時に音声を読み込む
    return () => {
      if (sound) {
        sound.unloadAsync();  // アンマウント時に音声を解放
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();  // 音を再生
    }
  };

  const scheduleNotificationAsync = async (date: Date, time: Date) => {
    // 日付と時刻を組み合わせて新しい日時を作成
    const triggerDate = new Date(date);
    triggerDate.setHours(time.getHours(), time.getMinutes(), 0); // 時刻を設定
  
    // 現在の時刻との比較
    const now = new Date();
    const secondsUntilTrigger = Math.floor((triggerDate.getTime() - now.getTime()) / 1000); // 小数を切り捨てて整数化
  
    if (secondsUntilTrigger <= 0) {
      Alert.alert('エラー', '指定した日程と時刻は過去の時間です。');
      return;
    }
  
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          body: 'アラームが鳴っています！',
          title: '学習時間の開始',
          data: { playSound: true }, // 通知が受信された際にアラームを再生
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: secondsUntilTrigger, // 通知が鳴るまでの秒数
          repeats: false, // 繰り返さない
        },
      });
  
      Alert.alert('通知設定完了', `アラームは ${triggerDate.toLocaleString()} に設定されました`);
    } catch (error) {
      Alert.alert('通知エラー', '通知のスケジュール設定に失敗しました');
    }
  };

  const addAlarm = (): void => {
    if (!question || !date) {
      Alert.alert('エラー', '問題と日付を入力してください');
      return;
    }

    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;

    const newAlarm: Alarm = {
      id: Date.now().toString(),
      date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      time: formattedTime,
      question: question,
    };

    // 状態更新に関して、前の状態を利用して更新
    setAlarms((prevAlarms) => {
      const updatedAlarms = [...prevAlarms, newAlarm];
      return updatedAlarms;
    });
    
    setQuestion('');
    setDate(new Date());
    setTime(new Date());
    scheduleNotificationAsync(date, time); // アラームを追加した後に通知をスケジュール

  };

  const deleteAlarm = (id: string): void => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
    Alert.alert('成功', 'アラームが消去されました');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>アラーム設定</Text>

      {/* 日程 */}
      <Text style={styles.label}>日程:</Text>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => {
          setShowDatePicker(false);
          if (selectedDate) setDate(selectedDate);
        }}
      />

      {/* Spacing between Date and Time pickers */}
      <View style={styles.spacing} />

      {/* 時間 */}
      <Text style={styles.label}>時間:</Text>
      <DateTimePicker
        value={time}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={(event, selectedTime) => {
          setShowTimePicker(false);
          if (selectedTime) setTime(selectedTime);
        }}
      />

      {/* Spacing between Time picker and Question Input */}
      <View style={styles.spacing} />

      {/* 問題入力フィールド */}
      <TextInput
        style={styles.input}
        placeholder="出題する問題を入力してください"
        value={question}
        onChangeText={setQuestion}
      />

      {/* アラーム追加ボタン */}
      <TouchableOpacity style={styles.addButton} onPress={addAlarm}>
        <Text style={styles.addButtonText}>アラームを追加する</Text>
      </TouchableOpacity>

      {/* アラーム一覧 */}
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <Text style={styles.alarmText}>{item.date} {item.time} - {item.question}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAlarm(item.id)}>
              <Text style={styles.deleteButtonText}>削除</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <BottomMenuBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 18, color: '#333', marginBottom: 8, fontWeight: 'bold' },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 16, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: '#ccc' },
  addButton: { 
    width: '100%', 
    height: 50, 
    backgroundColor: '#4CAF50', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 8, 
    marginTop: 20,  
    marginBottom: 20, 
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  alarmItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 10 },
  alarmText: { fontSize: 16 },
  deleteButton: { backgroundColor: '#F44336', padding: 10, borderRadius: 8 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
  spacing: { height: 20 }, // Added spacing
});

export default AlarmSettingsScreen;
