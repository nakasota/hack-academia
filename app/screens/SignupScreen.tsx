import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigation = useNavigation();

  const handleSignup = async (): Promise<void> => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('エラー', 'すべてのフィールドを入力してください');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('エラー', 'パスワードが一致しません');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        email: email,
        password: password, // セキュリティのため、実際はハッシュ化するべきです
      });

      Alert.alert('成功', 'アカウントが作成されました');
      navigation.navigate('screens/LoginScreen' as never);
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('エラー', 'アカウント作成中にエラーが発生しました');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>アカウント作成</Text>
      <TextInput
        style={styles.input}
        placeholder="メールアドレス"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワード"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="パスワードを再入力"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>アカウント作成</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { width: '80%', height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 16, fontSize: 16, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  signupButton: { width: '80%', height: 50, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
  signupButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default SignupScreen;
