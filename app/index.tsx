import { Redirect } from 'expo-router';
import LoginScreen from './screens/LoginScreen';

export default function Index() {
  return <Redirect href='./screens/LoginScreen' />;
}
    