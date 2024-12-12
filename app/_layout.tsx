import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="screens/LoginScreen">
      <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/HomeScreen" options={{ title: 'ホーム' }} />
      <Stack.Screen name="screens/SignupScreen" options={{ title: 'アカウント作成' }}/>
    </Stack>
  );
}
