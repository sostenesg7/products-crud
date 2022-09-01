import {
  PRODUCT_ALREADY_REGISTERED,
  PRODUCT_NAME_MIN_LENGTH,
} from '../constants/messages';
import { IProduct } from '../types/product';
import { checkIfProductIsRegistered, searchProduct } from '../util/helpers';

export class ProductsRepository {
  products: IProduct[] = [];

  constructor() {}

  /**
   * Add a new Product
   *
   * @param {IProduct} product
   * @return {*}  {IProduct}
   * @memberof ProductsRepository
   */
  add(product: IProduct): IProduct {
    if (typeof product.name !== 'string' || product.name.length < 3) {
      throw new Error(PRODUCT_NAME_MIN_LENGTH);
    }

    const exists = checkIfProductIsRegistered(this.products, product.name);

    if (exists) {
      throw new Error(PRODUCT_ALREADY_REGISTERED);
    }

    this.products.push(product);

    return product;
  }

  /**
   * List all products with search
   *
   * @param {string} [search]
   * @return {*}  {IProduct[]}
   * @memberof ProductsRepository
   */
  listAll(search?: string): IProduct[] {
    if (typeof search === 'string' && search.length >= 3) {
      return this.products.filter((product) => searchProduct(product, search));
    }

    return this.products;
  }
}
