import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { getToastConfig } from '../lib/toast-config';
import { s } from '../theme/common-styles';
import { ThemeContext } from '../theme/useTheme';
import { ThemePreferenceContext } from '../theme/useThemePreference';
import useToggleTheme from '../theme/useToggleTheme';
import AppTabBar from './Tabbar';

export default function RootStackNavigator() {
  const { theme, ...preferences } = useToggleTheme();

  return (
    <GestureHandlerRootView style={s.flex()}>
      <ThemePreferenceContext.Provider value={preferences}>
        <ThemeContext.Provider value={theme}>
          <StatusBar
            style={preferences.isDarkTheme ? 'light' : 'dark'}
          />
          <NavigationContainer
            theme={{
              colors: {
                notification: theme.colors.primary,
                card: theme.colors.paper,
                background: theme.colors.background,
                border: theme.colors.border,
                primary: theme.colors.primary,
                text: theme.colors.bodyText,
              },
              dark: preferences.isDarkTheme,
            }}
          >
            <SafeAreaProvider>
              <AppTabBar />
            </SafeAreaProvider>
          </NavigationContainer>
          <Toast config={getToastConfig(theme)} />
        </ThemeContext.Provider>
      </ThemePreferenceContext.Provider>
    </GestureHandlerRootView>
  );
}
