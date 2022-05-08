import "react-native-gesture-handler";

import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";

import Widget from "./src/components/Widget";
import { theme } from "./src/theme";
import { useCallback, useEffect } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      onLayout={onLayoutRootView}
    >
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Widget />
    </View>
  );
}
