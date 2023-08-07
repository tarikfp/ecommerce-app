import axios from 'axios';

const BASE_URL = 'http://5e394071aad22200149625f8.mockapi.io/';
export const api = axios.create({
  baseURL: BASE_URL,
});

export type Product = {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  price: string;
  category: string;
};

export type ProductTimings = {
  productId: string;
  startDate: string;
  endDate: string;
};

export type HotDeals = {
  productId: string;
};

/* The ProductAPI class provides methods to fetch all products,
product timings, and hot deals from an
API. */
export class ProductAPI {
  static getAllProducts = async () => {
    return (await api.get<Array<Product>>('/products')).data;
  };
  static getProductTimings = async () => {
    return (await api.get<Array<ProductTimings>>('/productTimings'))
      .data;
  };

  private static getHotDealsProductsFromIds(
    allProducts: Array<Product>,
    hotDealsProducts: Array<HotDeals>
  ) {
    const hotDealsProductIds = hotDealsProducts.map(
      (hotDeal) => hotDeal.productId
    );

    const hotDeals = allProducts.filter((product) =>
      hotDealsProductIds.includes(product.id)
    );

    return hotDeals;
  }

  static getHotDeals = async () => {
    const [allProducts, hotDealsProducts] = await Promise.all([
      ProductAPI.getAllProducts(),
      api.get<Array<HotDeals>>('/hotdeals'),
    ]);

    return ProductAPI.getHotDealsProductsFromIds(
      allProducts,
      hotDealsProducts.data
    );
  };
}
