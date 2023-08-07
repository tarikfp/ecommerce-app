import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PlatformPressable } from '@react-navigation/elements';
import {
  useFocusEffect,
  useIsFocused,
  useScrollToTop,
} from '@react-navigation/native';
import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import BasketCard from '../components/BasketCard';
import { Spacing } from '../components/Spacing';
import { RouteNames } from '../navigation/RouteNames';
import { TabbarStackScreenProps } from '../navigation/types';
import {
  ProductInBasket,
  useProductActions,
  useProductsInBasket,
} from '../store/BasketStore';
import { s } from '../theme/common-styles';
import { useAppTheme } from '../theme/core';
import { makeStyles } from '../theme/make-styles';

export const getBasketTotalPrice = (
  favoritedProducts: Array<ProductInBasket>
) => {
  return favoritedProducts
    .reduce(
      (acc, curr) => acc + Number(curr.product.price) * curr.quantity,
      0
    )
    .toFixed(2);
};

type Props = TabbarStackScreenProps<RouteNames.BASKET>;

export default function BasketScreen({ navigation }: Props) {
  const styles = useStyles();
  const { colors, spacing } = useAppTheme();
  const flatListRef = React.useRef<FlatList | null>(null);
  useScrollToTop(flatListRef);

  const {
    increaseProductQuantityInBasket,
    decreaseProductQuantityInBasket,
    removeProductFromBasket,
    resetAllProductsInBasket,
  } = useProductActions();

  const productsInBasket = useProductsInBasket();

  /** scroll to top on screen focus */
  useFocusEffect(
    React.useCallback(() => {
      if (productsInBasket.length > 0) {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, [productsInBasket.length])
  );

  React.useEffect(() => {
    if (productsInBasket.length > 0) {
      navigation.setOptions({
        headerTitle: 'Basket',
        headerTitleAlign: 'center',
        headerRightContainerStyle: {
          paddingHorizontal: spacing.sm,
        },
        headerLeftContainerStyle: {
          paddingHorizontal: spacing.sm,
        },
        headerRight: () => (
          <PlatformPressable onPress={resetAllProductsInBasket}>
            <MaterialCommunityIcons
              color={colors.primary}
              disabled
              name="trash-can-outline"
              size={24}
            />
          </PlatformPressable>
        ),
      });
    } else {
      // hide basket icon from header top right
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [
    colors.primary,
    navigation,
    productsInBasket.length,
    resetAllProductsInBasket,
    spacing.sm,
  ]);

  const isFocused = useIsFocused();

  const renderBasketItem = ({
    item: { product, quantity },
    index,
  }: ListRenderItemInfo<ProductInBasket>) => {
    return (
      <Animated.View
        key={isFocused.toString()}
        entering={FadeIn.delay(index * 75)}
      >
        <BasketCard
          product={product}
          quantity={quantity}
          quantityTogglerUniqueID={product.id.toString()}
          onIncreaseQuantityPress={() =>
            increaseProductQuantityInBasket(product.id)
          }
          onDecreaseQuantityPress={() => {
            if (quantity === 1) {
              removeProductFromBasket(product.id);
            } else {
              decreaseProductQuantityInBasket(product.id);
            }
          }}
        />
      </Animated.View>
    );
  };

  const renderSeparatorComponent = () => (
    <Spacing backgroundColor={colors.background} height={16} />
  );

  const getKeyExtractor = (item: ProductInBasket) =>
    item.product.id.toString();

  const renderListEmptyComponent = () => (
    <View style={s.flexCenter}>
      <Text style={styles.emptyText}>Your basket is empty</Text>
    </View>
  );

  return (
    <View style={s.flex()}>
      <FlatList
        ref={flatListRef}
        data={productsInBasket}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderListEmptyComponent}
        ItemSeparatorComponent={renderSeparatorComponent}
        renderItem={renderBasketItem}
        keyExtractor={getKeyExtractor}
        style={s.flex()}
      />

      {productsInBasket.length > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.totalPrice}>{'Total Price: '}</Text>
          <Text style={styles.priceText}>
            $ {getBasketTotalPrice(productsInBasket)}
          </Text>
        </View>
      )}
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
  },
  emptyText: {
    color: theme.colors.bodyText,
  },
  basketItemsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  summaryContainer: {
    width: '100%',
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    backgroundColor: theme.colors.paper,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
  },
  totalPrice: {
    fontSize: 18,
    textAlign: 'left',
    color: theme.colors.bodyText,
  },
  priceText: {
    textAlign: 'right',
    fontSize: 18,
    width: 150,
    color: theme.colors.bodyText,
  },
}));
