import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PlatformPressable } from '@react-navigation/elements';
import { useScrollToTop } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Product } from '../api/product-api';
import { ErrorComponent } from '../components/ErrorComponent';
import { ProductItem } from '../components/ProductItem';
import { ScreenLoading } from '../components/ScreenLoading';
import { useDataFetching } from '../hooks';
import { ErrorService } from '../lib/error-formatter';
import { RouteNames } from '../navigation/RouteNames';
import { TabbarStackScreenProps } from '../navigation/types';
import {
  useProductActions,
  useProductsInBasket,
} from '../store/BasketStore';
import { s } from '../theme/common-styles';
import { useAppTheme } from '../theme/core';
import { makeStyles } from '../theme/make-styles';
import { useThemePreference } from '../theme/useThemePreference';

/**
 * The Props type is a generic type that takes two type parameters and includes navigation and fetchFn
 * properties.
 * @property navigation - The `navigation` property is of type
 * `TabbarStackScreenProps<T>['navigation']`. It is used to navigate between screens in a tab bar stack
 * navigator.
 * @property fetchFn - The `fetchFn` property is a function that returns a promise. It is used to fetch
 * data of type `K[]`, which is an array of objects of type `K`.
 */
type Props<T extends RouteNames, K extends Product> = {
  navigation: TabbarStackScreenProps<T>['navigation'];
  fetchFn: () => Promise<K[]>;
  headerTitle: string;
};

export default function ProductListComponent<
  T extends RouteNames,
  K extends Product
>({ navigation, fetchFn, headerTitle }: Props<T, K>) {
  const styles = useStyles();
  const { spacing, colors } = useAppTheme();
  const { addProductToBasket, removeProductFromBasket } =
    useProductActions();

  const flatListRef = React.useRef<FlatList | null>(null);

  useScrollToTop(flatListRef);

  const { toggleTheme } = useThemePreference();

  const productsInBasket = useProductsInBasket();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,

      headerRightContainerStyle: {
        paddingHorizontal: spacing.sm,
      },
      headerLeftContainerStyle: {
        paddingHorizontal: spacing.sm,
      },
      headerRight: () => (
        <PlatformPressable onPress={toggleTheme}>
          <MaterialCommunityIcons
            size={24}
            color={colors.bodyText}
            disabled
            name="theme-light-dark"
          />
        </PlatformPressable>
      ),
    });
  }, [
    colors.bodyText,
    headerTitle,
    navigation,
    spacing.sm,
    toggleTheme,
  ]);

  const onAddToBasketPress = React.useCallback(
    (product: Product) => () => {
      if (
        productsInBasket.find(
          (productInBasket) =>
            productInBasket.product.id === product.id
        )
      ) {
        Toast.show({
          type: 'info',
          text1: `${product.name} is removed from basket`,
          autoHide: true,
          onPress: Toast.hide,
        });
        removeProductFromBasket(product.id);
      } else {
        Toast.show({
          type: 'info',
          text1: `${product.name} is added to the basket`,
          autoHide: true,
          onPress: Toast.hide,
        });
        addProductToBasket(product);
      }
    },
    [addProductToBasket, productsInBasket, removeProductFromBasket]
  );

  const { data, error, loading, refetch } = useDataFetching(fetchFn);

  const renderItem = React.useCallback(
    ({ item: product }: ListRenderItemInfo<K>) => {
      return (
        <ProductItem
          {...product}
          image={
            product.image ===
            /** API image data is broken, use random images instead... */
            'https://placeimg.com/320/240/tech/grayscale'
              ? 'https://picsum.photos/150'
              : product.image
          }
          onAddToBasketPress={onAddToBasketPress(product)}
          isInBasket={
            typeof productsInBasket.find(
              (productInBasket) =>
                productInBasket.product.id === product.id
            ) !== 'undefined'
          }
        />
      );
    },
    [onAddToBasketPress, productsInBasket]
  );

  const getKeyExtractor = (item: Product) => item.id.toString();

  if (loading) {
    return <ScreenLoading />;
  }

  if (error) {
    return (
      <ErrorComponent
        errorMessage={
          ErrorService.parseError(error) ?? JSON.stringify(error)
        }
      />
    );
  }

  return (
    <FlatList<K>
      data={data}
      ref={flatListRef}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyExtractor={getKeyExtractor}
      style={s.flex()}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
    rowGap: theme.spacing.m,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
}));
