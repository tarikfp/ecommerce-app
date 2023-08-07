import { useMemo } from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { AppTheme, darkTheme, theme as lightTheme } from "./core";
import { useThemePreference } from "./useThemePreference";

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export function makeStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  styleArgs:
    | T
    | NamedStyles<T>
    | ((theme: AppTheme, props: any) => T | NamedStyles<T>),
) {
  return function useStyles(props?: any): T {
    const { isDarkTheme } = useThemePreference();
    let styles: any = null;

    if (typeof styleArgs === "function") {
      styles = styleArgs(isDarkTheme ? darkTheme : lightTheme, props);
    } else {
      styles = styleArgs as T | NamedStyles<T>;
    }

    return useMemo(() => StyleSheet.create(styles), [styles]);
  };
}
