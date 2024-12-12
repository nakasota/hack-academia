import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomMenuBar from '../components/BottomMenuBar'

const HomeScreen = () => {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>ホーム画面!</Text>
      
    </View>
    <BottomMenuBar/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
