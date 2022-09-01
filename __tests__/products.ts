import {
  PRODUCT_ALREADY_REGISTERED,
  PRODUCT_NAME_MIN_LENGTH,
} from '../src/constants/messages';
import { ProductsRepository } from '../src/repository/products';
import { IProduct } from '../src/types/product';

describe('Products', () => {
  let productsRepositoryImpl = new ProductsRepository();
  const product1: IProduct = { name: 'Mouse gamer logitech' };
  const product2: IProduct = { name: 'Notebook Acer Nitro5' };
  const product3: IProduct = { name: 'Memória RAM DDR4 32GB' };
  const product4: IProduct = { name: 'Te' };

  beforeEach(() => {
    productsRepositoryImpl = new ProductsRepository();
  });

  it('Should create a new Product with sucess', () => {
    productsRepositoryImpl.add(product1);

    const products = productsRepositoryImpl.listAll();

    expect(products).toHaveLength(1);
    expect(products[0]).toHaveProperty('name');
    expect(products[0]).toMatchObject(product1);
  });

  it('Should not allow to create a new Product with name length less than 3', () => {
    const product: IProduct = { name: 'AB' };

    expect(() => {
      productsRepositoryImpl.add(product);
    }).toThrowError(PRODUCT_NAME_MIN_LENGTH);
  });

  it('Should not allow to create a new Product with same name', () => {
    productsRepositoryImpl.add(product1);

    expect(() => {
      productsRepositoryImpl.add(product1);
    }).toThrowError(PRODUCT_ALREADY_REGISTERED);
  });

  it('Should have 3 products registered', () => {
    productsRepositoryImpl.add(product1);
    productsRepositoryImpl.add(product2);
    productsRepositoryImpl.add(product3);

    const products = productsRepositoryImpl.listAll();

    expect(products).toHaveLength(3);
  });

  it('Should filter products by name ignoring case and accents', () => {
    productsRepositoryImpl.add(product1);
    productsRepositoryImpl.add(product2);
    productsRepositoryImpl.add(product3);

    const products = productsRepositoryImpl.listAll();

    expect(products).toHaveLength(3);
    expect(productsRepositoryImpl.listAll('Memor')).toHaveLength(1);
  });
});
