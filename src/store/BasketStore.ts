import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { Product } from '../api/product-api';

export type ProductInBasket = {
  product: Product;
  quantity: number;
};

export const updateProductQuantity = (
  productsInBasket: Array<ProductInBasket>,
  productId: string,
  updateType: 'increase' | 'decrease'
) => {
  return productsInBasket.map((productInBasket) => {
    if (productInBasket.product.id === productId) {
      return {
        ...productInBasket,
        quantity:
          updateType === 'increase'
            ? productInBasket.quantity + 1
            : productInBasket.quantity - 1,
      };
    }
    return productInBasket;
  });
};

export const increaseProductQuantityInBasket = (
  productsInBasket: Array<ProductInBasket>,
  productId: string
) => {
  return updateProductQuantity(
    productsInBasket,
    productId,
    'increase'
  );
};

export const decreaseProductQuantityInBasket = (
  productsInBasket: Array<ProductInBasket>,
  productId: string
) => {
  return updateProductQuantity(
    productsInBasket,
    productId,
    'decrease'
  );
};

export interface ProductStore {
  productsInBasket: Array<ProductInBasket>;
  actions: {
    addProductToBasket: (val: Product) => void;
    removeProductFromBasket: (productId: string) => void;
    increaseProductQuantityInBasket: (productId: string) => void;
    decreaseProductQuantityInBasket: (productId: string) => void;
    resetAllProductsInBasket: () => void;
  };
}

export const useProductStore = create<ProductStore>((set, get) => ({
  productsInBasket: [],
  actions: {
    addProductToBasket: (product) =>
      set({
        productsInBasket: [
          ...get().productsInBasket,
          { product: product, quantity: 1 },
        ],
      }),
    removeProductFromBasket: (productId) =>
      set({
        productsInBasket: [
          ...get().productsInBasket.filter(
            (productInBasket) =>
              productInBasket.product.id !== productId
          ),
        ],
      }),
    increaseProductQuantityInBasket: (productId) => {
      set({
        productsInBasket: increaseProductQuantityInBasket(
          get().productsInBasket,
          productId
        ),
      });
    },
    resetAllProductsInBasket: () => set({ productsInBasket: [] }),
    decreaseProductQuantityInBasket: (productId) => {
      set({
        productsInBasket: decreaseProductQuantityInBasket(
          get().productsInBasket,
          productId
        ),
      });
    },
  },
}));

export const useProductActions = () =>
  useProductStore((state) => state.actions);

export const useProductsInBasket = () =>
  useProductStore((state) => state.productsInBasket, shallow);
export const useProductsInBasketCount = () =>
  useProductStore((state) => state.productsInBasket.length);
export const useProductInBasketQuantityById = (
  productId: string | undefined
) =>
  useProductStore(
    (state) =>
      state.productsInBasket.find(
        (productInBasket) => productInBasket.product.id === productId
      )?.quantity
  );
