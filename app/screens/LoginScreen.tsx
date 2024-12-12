import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();

  const handleLogin = (): void => {
    // ログインロジック（仮実装）
    if (email === 'test@example.com' && password === 'password123') {
      Alert.alert('成功', 'ログインに成功しました');
      navigation.navigate('HomeScreen' as never);
    } else {
      Alert.alert('エラー', 'メールアドレスまたはパスワードが間違っています');
    }
  };

  const handleAppleLogin = async (): Promise<void> => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      Alert.alert(
        '成功',
        `ようこそ、${credential.fullName?.givenName || 'ユーザー'}さん`
      );
      navigation.navigate('HomeScreen' as never);
    } catch (error) {
      console.error('Apple sign-in error:', error);
      Alert.alert('エラー', 'Appleログインに失敗しました');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ログイン</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>ログイン</Text>
      </TouchableOpacity>

      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        style={styles.appleButton}
        onPress={handleAppleLogin}
      />

      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen' as never)}>
        <Text style={styles.signupText}>アカウントを作成する</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { width: '80%', height: 50, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 16, fontSize: 16, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  loginButton: { width: '80%', height: 50, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  appleButton: { width: '80%', height: 50, marginVertical: 10 },
  signupText: { color: '#4CAF50', fontSize: 16, marginTop: 20 },
});

export default LoginScreen;
