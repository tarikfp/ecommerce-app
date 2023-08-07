/* eslint-disable react/display-name */
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from '../theme/common-styles';
import { AppTheme, useAppTheme } from '../theme/core';

type Props = {
  withSafeArea?: boolean;
  withScrollView?: boolean;
  backgroundColor?: keyof AppTheme['colors'];
  rootViewProps?: React.ComponentProps<typeof View>;
  safeAreaProps?: React.ComponentProps<typeof SafeAreaView>;
  scrollViewProps?: React.ComponentProps<typeof ScrollView>;
  disableHorizontalPadding?: boolean;
  disableVerticalPadding?: boolean;
  padding?: keyof AppTheme['spacing'];
};

interface WithComponentPropsBase<P> {
  shouldRender: boolean;
  extraProps?: P;
}

type WithScrollViewProps = WithComponentPropsBase<
  React.ComponentProps<typeof ScrollView>
>;

type WithSafeAreaProps = WithComponentPropsBase<
  React.ComponentProps<typeof SafeAreaView>
>;

const WithScrollView = React.forwardRef<
  ScrollView,
  React.PropsWithChildren<WithScrollViewProps>
>(({ extraProps, shouldRender, children }, scrollViewRef) => {
  if (!shouldRender) {
    return children as React.ReactElement;
  }

  return (
    <ScrollView ref={scrollViewRef} {...extraProps}>
      {children}
    </ScrollView>
  );
});

const WithSafeArea: React.FC<
  React.PropsWithChildren<WithSafeAreaProps>
> = ({ children, extraProps, shouldRender }) => {
  const { colors } = useAppTheme();
  if (!shouldRender) {
    return children as React.ReactElement;
  }

  return (
    <SafeAreaView
      style={[
        s.flex(),
        { backgroundColor: colors.background },
        extraProps?.style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

const WithRootView: React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof View>>
> = ({ children, ...props }) => {
  return (
    <View {...props} style={[s.flex(), props.style]}>
      {children}
    </View>
  );
};

export const ScreenView: React.ForwardRefRenderFunction<
  React.ComponentPropsWithRef<typeof ScrollView>['ref'],
  React.PropsWithChildren<Props>
> = (
  {
    backgroundColor,
    children,
    scrollViewProps,
    rootViewProps,
    safeAreaProps,
    disableHorizontalPadding = false,
    disableVerticalPadding = false,
    withSafeArea = false,
    withScrollView = false,
    padding,
  },
  scrollViewRef
) => {
  const { spacing } = useAppTheme();
  const computedBgColor = backgroundColor ?? 'background';

  const computedPadding: keyof AppTheme['spacing'] = padding ?? 'm';

  return (
    <WithSafeArea
      shouldRender={withSafeArea}
      extraProps={safeAreaProps}
    >
      <WithScrollView
        shouldRender={withScrollView}
        extraProps={scrollViewProps}
        // @ts-ignore
        ref={scrollViewRef}
      >
        <WithRootView
          style={{
            backgroundColor: computedBgColor,
            paddingHorizontal: disableHorizontalPadding
              ? undefined
              : spacing[computedPadding],
            paddingVertical: disableVerticalPadding
              ? undefined
              : spacing[computedPadding],
          }}
          {...rootViewProps}
        >
          {children}
        </WithRootView>
      </WithScrollView>
    </WithSafeArea>
  );
};
