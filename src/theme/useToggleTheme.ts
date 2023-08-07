import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AsyncStorageKeys } from '../lib/async-storage-keys';
import { darkTheme, theme as lightTheme } from './core';

export default function useToggleTheme() {
  const [isDarkTheme, setIsDarkTheme] =
    React.useState<boolean>(false);
  const userDeviceColorSchema = useColorScheme();

  React.useEffect(() => {
    const getStoredThemePreference = async () => {
      const storedIsDarkTheme = await AsyncStorage.getItem(
        AsyncStorageKeys.IS_DARK_THEME
      );

      // if user has not set any color schema in the app (for ex: user has just installed the app)
      // then set the color schema as user's device color schema
      if (storedIsDarkTheme === null) {
        setIsDarkTheme(false);
      } else {
        setIsDarkTheme(!!storedIsDarkTheme);
      }
    };

    getStoredThemePreference();
  }, [userDeviceColorSchema]);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  const toggleTheme = React.useCallback(async () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      await AsyncStorage.setItem(
        AsyncStorageKeys.IS_DARK_THEME,
        'true'
      );
    } else {
      AsyncStorage.removeItem(AsyncStorageKeys.IS_DARK_THEME);
    }
  }, [isDarkTheme]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isDarkTheme,
    }),
    [isDarkTheme, toggleTheme]
  );

  return {
    theme,
    toggleTheme: preferences.toggleTheme,
    isDarkTheme: preferences.isDarkTheme,
  };
}
