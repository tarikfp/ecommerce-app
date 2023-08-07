import React from 'react';
import { ProductAPI } from '../api/product-api';
import ProductListComponent from '../components/ProductListComponent';
import { RouteNames } from '../navigation/RouteNames';
import { TabbarStackScreenProps } from '../navigation/types';

type Props = TabbarStackScreenProps<RouteNames.DEALS>;

export default function DealsScreen({ navigation }: Props) {
  return (
    <ProductListComponent
      headerTitle="Hot Deals"
      navigation={navigation}
      fetchFn={ProductAPI.getHotDeals}
    />
  );
}
