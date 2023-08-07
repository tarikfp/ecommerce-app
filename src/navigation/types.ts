import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RouteNames } from './RouteNames';

export type TabbarStackParamList = {
  [RouteNames.HOME]: undefined;
  [RouteNames.DEALS]: undefined;
  [RouteNames.BASKET]: undefined;
  [RouteNames.MENU]: undefined;
};

export type TabbarStackScreenProps<
  RouteName extends keyof TabbarStackParamList
> = BottomTabScreenProps<TabbarStackParamList, RouteName>;
