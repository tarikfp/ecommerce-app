import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { s } from '../theme/common-styles';
import { useAppTheme } from '../theme/core';

export const ScreenLoading: React.FC = () => {
  const { colors } = useAppTheme();
  return (
    <View style={s.flexCenter}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};
