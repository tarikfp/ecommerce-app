/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BasketScreen, DealsScreen, HomeScreen } from '../screens';
import { useProductsInBasketCount } from '../store/BasketStore';
import { useAppTheme } from '../theme/core';
import { RouteNames } from './RouteNames';
import { getTabBarIcon, getTabbarLabel } from './getTabbarIcon';
import { TabbarStackParamList } from './types';

const Tab = createBottomTabNavigator<TabbarStackParamList>();

export default function AppTabBar() {
  const productsInBasket = useProductsInBasketCount();
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.paper,
          borderColor: colors.border,
        },
        tabBarActiveTintColor: colors.tabbarIconActive,
        tabBarInactiveTintColor: colors.tabbarIconDisabled,
        tabBarLabel: getTabbarLabel(route.name),
        tabBarIcon: (tabBarIconParams) =>
          getTabBarIcon({
            params: tabBarIconParams,
            routeName: route.name,
          }),
      })}
    >
      <Tab.Screen name={RouteNames.HOME} component={HomeScreen} />
      <Tab.Screen name={RouteNames.DEALS} component={DealsScreen} />
      <Tab.Screen
        name={RouteNames.BASKET}
        component={BasketScreen}
        options={{
          tabBarBadge: Boolean(productsInBasket)
            ? productsInBasket
            : undefined,
          tabBarBadgeStyle: {
            color: colors.bodyText,
          },
        }}
      />
    </Tab.Navigator>
  );
}
