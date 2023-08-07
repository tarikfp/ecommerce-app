import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { s } from '../theme/common-styles';

type Props = {
  errorMessage: string;
};

export const ErrorComponent: React.FC<Props> = ({ errorMessage }) => {
  return (
    <View style={s.flexCenter}>
      <Text style={styles.errorText}>
        {`An error occurred: ${errorMessage}`}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    marginBottom: 10,
    color: 'red',
  },
});
