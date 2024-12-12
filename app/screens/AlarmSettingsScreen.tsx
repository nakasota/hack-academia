import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomMenuBar from '../components/BottomMenuBar';

interface Alarm {
  id: string;
  time: string;
  question: string;
}

const AlarmSettingsScreen: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [time, setTime] = useState<Date>(new Date());
  const [question, setQuestion] = useState<string>('');
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const addAlarm = (): void => {
    if (!question) {
      Alert.alert('エラー', '問題を入力してください');
      return;
    }

    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;

    const newAlarm: Alarm = {
      id: Date.now().toString(),
      time: formattedTime,
      question: question,
    };

    setAlarms([...alarms, newAlarm]);
    setQuestion('');
    Alert.alert('成功', 'アラームが追加されました');
  };

  const deleteAlarm = (id: string): void => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>アラーム設定</Text>

      <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.timePickerButtonText}>アラームの時間を設定する</Text>
      </TouchableOpacity>

      {showTimePicker && (
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
      )}

      <TextInput
        style={styles.input}
        placeholder="出題する問題を入力してください"
        value={question}
        onChangeText={setQuestion}
      />

      <TouchableOpacity style={styles.addButton} onPress={addAlarm}>
        <Text style={styles.addButtonText}>アラームを追加する</Text>
      </TouchableOpacity>

      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <Text style={styles.alarmText}>{item.time} - {item.question}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAlarm(item.id)}>
              <Text style={styles.deleteButtonText}>削除</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <BottomMenuBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 16, fontSize: 16, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  addButton: { width: '100%', height: 50, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  timePickerButton: { width: '100%', height: 50, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginBottom: 10 },
  timePickerButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  alarmItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 10 },
  alarmText: { fontSize: 16 },
  deleteButton: { backgroundColor: '#F44336', padding: 10, borderRadius: 8 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default AlarmSettingsScreen;
