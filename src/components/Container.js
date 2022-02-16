import React from 'react';
import { NativeBaseProvider } from 'native-base';
import MainScreen from '../screens/MainScreen';

export default function AppContainer() {
  return (
    <NativeBaseProvider>
      <MainScreen />
    </NativeBaseProvider>
  );
}
