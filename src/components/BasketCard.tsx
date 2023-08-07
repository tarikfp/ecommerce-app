import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { getWindowHeight, getWindowWidth } from '../lib/layout-utils';
import { ProductInBasket } from '../store/BasketStore';
import { makeStyles } from '../theme/make-styles';
import QuantityToggler from './QuantityToggler';

export const getPriceText = (price: number) => `$ ${price}`;

type BasketCardProps = ProductInBasket &
  React.ComponentProps<typeof QuantityToggler> & {
    quantityTogglerUniqueID?: string;
  };

const BasketCard: React.FC<BasketCardProps> = ({
  product: { name, image, price },
  quantityTogglerUniqueID,
  ...quantityTogglerProps
}) => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{
            uri:
              image ===
              /** API image data is broken, use random images instead... */
              'https://placeimg.com/320/240/tech/grayscale'
                ? 'https://picsum.photos/150'
                : image,
          }}
        />
        <View style={styles.midContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.priceText} numberOfLines={1}>
            {getPriceText(Number(price))}
          </Text>
        </View>
      </View>

      <QuantityToggler
        {...quantityTogglerProps}
        style={styles.quantityToggler}
      />
    </View>
  );
};

export default BasketCard;

const useStyles = makeStyles((theme) => ({
  root: {
    height: getWindowHeight(12.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.paper,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  quantityToggler: {
    flex: 0.5,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: getWindowWidth(8),
    height: getWindowHeight(8),
    marginRight: 12,
  },
  rightContainer: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  midContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  priceText: {
    marginTop: 4,
    color: theme.colors.bodyText,
  },
  name: {
    color: theme.colors.bodyText,
  },
}));
