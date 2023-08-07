import React from 'react';
import { AppTheme } from './core';

type InitialContextType = AppTheme | undefined;

export const ThemeContext =
  React.createContext<InitialContextType>(undefined);

export const useTheme = <T extends InitialContextType>() => {
  const themeContext = React.useContext(ThemeContext) as T;

  if (!themeContext) {
    throw new Error('Make sure Theme Context is in the tree');
  }

  return themeContext;
};
