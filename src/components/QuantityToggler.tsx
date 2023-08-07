import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PlatformPressable } from '@react-navigation/elements';
import * as React from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { makeStyles } from '../theme/make-styles';

type Props = {
  quantity: number;
  onIncreaseQuantityPress: () => void;
  onDecreaseQuantityPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const QuantityToggler: React.FC<Props> = ({
  quantity,
  onDecreaseQuantityPress,
  onIncreaseQuantityPress,
  style,
}) => {
  const styles = useStyles();

  return (
    <View style={[styles.root, style]}>
      <PlatformPressable
        disabled={quantity === 0}
        onPress={onDecreaseQuantityPress}
        style={
          quantity === 0 ? styles.disabledActionBtn : styles.actionBtn
        }
      >
        <MaterialCommunityIcons name="minus" size={24} color="#fff" />
      </PlatformPressable>

      <Text style={styles.quantityText}>{quantity.toString()}</Text>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onIncreaseQuantityPress}
        style={styles.actionBtn}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#ffff" />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityToggler;

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 2,
  },
  disabledActionBtn: {
    backgroundColor: '#e1e1e1',
    borderRadius: 8,
    padding: 2,
  },
  quantityText: {
    width: 50,
    textAlign: 'center',
    color: theme.colors.bodyText,
  },
}));
