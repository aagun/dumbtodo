import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import MainScreen from "../screens/MainScreen";
import theme from "../Theme";

export default function AppContainer() {
  return (
    <NativeBaseProvider theme={theme}>
      <MainScreen />
    </NativeBaseProvider>
  );
}
