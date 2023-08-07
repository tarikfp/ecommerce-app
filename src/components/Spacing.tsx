import * as React from 'react';
import { View, ViewProps } from 'react-native';

type Props = ViewProps['style'];

export const Spacing: React.FC<Props> = (props) => {
  return <View style={props} />;
};
