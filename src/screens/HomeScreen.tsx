import React from 'react';
import { ProductAPI } from '../api/product-api';
import ProductListComponent from '../components/ProductListComponent';
import { RouteNames } from '../navigation/RouteNames';
import { TabbarStackScreenProps } from '../navigation/types';

type Props = TabbarStackScreenProps<RouteNames.HOME>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ProductListComponent
      headerTitle="Deals"
      navigation={navigation}
      fetchFn={ProductAPI.getAllProducts}
    />
  );
}
