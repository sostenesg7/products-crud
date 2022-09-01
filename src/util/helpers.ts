import { IProduct } from '../types/product';

/**
 * Search product by name
 *
 * @param {IProduct} product
 * @param {string} search
 * @return {*}  {number}
 */
export const searchProduct = (product: IProduct, search: string): boolean => {
  return removeDiacritics(product.name).search(removeDiacritics(search)) >= 0;
};

/**
 * Check if some product is registered with same name
 *
 * @param {IProduct[]} products
 * @param {string} name
 * @return {*}  {boolean}
 */
export const checkIfProductIsRegistered = (
  products: IProduct[],
  name: string
): boolean => {
  return products.some((prod) => prod.name === name);
};

/**
 * Remove diacritics from input text
 *
 * @param {string} text
 * @return {*}  {string}
 */
export const removeDiacritics = (text: string): string => {
  if (typeof text !== 'string') {
    return '';
  }

  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
};
