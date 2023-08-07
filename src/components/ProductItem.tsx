import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as React from 'react';
import { Image, Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Product } from '../api/product-api';
import { getWindowHeight, getWindowWidth } from '../lib/layout-utils';
import { useAppTheme } from '../theme/core';
import { makeStyles } from '../theme/make-styles';
import { Spacing } from './Spacing';

type Props = Product & {
  isInBasket?: boolean;
  onAddToBasketPress: () => void;
};

const HEART_INITIAL_SCALE = 1.15;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ProductItemInner: React.FC<Props> = ({
  image,
  category,
  createdAt,
  id,
  name,
  price,
  onAddToBasketPress,
  isInBasket = false,
}) => {
  const styles = useStyles();
  const { colors, spacing } = useAppTheme();
  const scaleAnim = useSharedValue(HEART_INITIAL_SCALE);

  const [isHeartPressed, setIsHeartPressed] =
    React.useState<boolean>(false);

  const heartAnimStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      borderRadius: 999,
      backgroundColor: colors.paper,
      padding: spacing.xs,
      right: spacing.m,
      top: spacing.l,
      transform: [
        {
          scale: scaleAnim.value,
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={() => {
        onAddToBasketPress();
        scaleAnim.value = withSpring(
          !isHeartPressed ? 1 : HEART_INITIAL_SCALE
        );
        setIsHeartPressed(!isHeartPressed);
      }}
      style={styles.root}
    >
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: image }}
      />

      <AnimatedPressable
        style={heartAnimStyle}
        onPress={onAddToBasketPress}
      >
        <MaterialCommunityIcons
          size={24}
          color={isInBasket ? colors.primary : colors.bodyTextLight}
          name={isInBasket ? 'heart' : 'heart-outline'}
        />
      </AnimatedPressable>

      <Spacing height={spacing.m} />

      <Text numberOfLines={1} style={styles.title}>
        {name}
      </Text>

      <Text style={styles.price}>{price}</Text>
    </Pressable>
  );
};

export const ProductItem = React.memo(ProductItemInner);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.paper,
    height: getWindowHeight(30),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: getWindowWidth(42.5),
    padding: theme.spacing.m,
    borderRadius: 8,
  },
  heartIcon: {
    position: 'absolute',
    backgroundColor: theme.colors.background,
    borderRadius: 999,
    padding: theme.spacing.xs,
    right: theme.spacing.m,
    top: theme.spacing.l,
  },
  image: {
    height: 150,
    borderRadius: 8,
    width: 150,
  },
  title: {
    fontSize: 16,
    color: theme.colors.bodyText,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    marginTop: 4,
    color: theme.colors.bodyText,
    textAlign: 'center',
  },
}));
