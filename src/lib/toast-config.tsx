import React from 'react';
import { InfoToast, ToastConfig } from 'react-native-toast-message';
import { AppTheme } from '../theme/core';

export const getToastConfig = (theme: AppTheme): ToastConfig => ({
  info: (props) => (
    <InfoToast
      {...props}
      contentContainerStyle={{
        backgroundColor: theme.colors.paper,
      }}
      text1Style={{
        color: theme.colors.bodyText,
      }}
    />
  ),
});
