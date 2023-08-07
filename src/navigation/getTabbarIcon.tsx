// We will want to use only Material Design Icons
// https://github.com/oblador/react-native-vector-icons#bundled-icon-sets
import MaterialDesignIcon from '@expo/vector-icons/MaterialCommunityIcons';

import { RouteNames } from './RouteNames';

export const TABBAR_ICON_SIZE = 28;

export const getTabBarIconCommonParams = (
  color: string
): {
  disabled: boolean;
  size: number;
  color: string;
} => ({
  disabled: true,
  size: TABBAR_ICON_SIZE,
  color,
});

export const getTabBarIcon = ({
  params,
  routeName,
}: {
  params: {
    focused: boolean;
    color: string;
    size?: number;
  };
  routeName: string;
}) => {
  const commonParams = getTabBarIconCommonParams(params.color);

  switch (routeName) {
    case RouteNames.HOME:
      return (
        <MaterialDesignIcon
          {...commonParams}
          name={params.focused ? 'home' : 'home-outline'}
        />
      );

    case RouteNames.BASKET:
      return (
        <MaterialDesignIcon
          {...commonParams}
          name={params.focused ? 'basket' : 'basket-outline'}
        />
      );

    case RouteNames.DEALS:
      return <MaterialDesignIcon {...commonParams} name={'fire'} />;

    default:
      throw new Error(`Invalid route name: ${routeName}`);
  }
};
