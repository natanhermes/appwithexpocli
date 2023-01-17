import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { ThemeProvider } from "styled-components";
import { StatusBar } from 'expo-status-bar';

import {
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import theme from './global/styles/theme';
import { ContainerLoading } from './App.styles';
import { AuthContextProvider } from './contexts/AuthContext';
import { Routes } from './routes';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins_500Medium,
          Poppins_700Bold,
        });
      } catch (e) {
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <ContainerLoading><ActivityIndicator /></ContainerLoading>
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#3D2F49" }} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}
