import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AppProvider from './src/hooks';
import Routes from './src/routes';

export default function App() {

  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
        <Routes />
      </SafeAreaView>
      <StatusBar style="auto" />
    </AppProvider>
  );
}
