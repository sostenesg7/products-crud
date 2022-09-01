import express, { Request } from 'express';
import { PORT } from './constants';
import { PRODUCT_NAME_MIN_LENGTH } from './constants/messages';
import { ProductsRepository } from './repository/products';
import { IProduct } from './types/product';

const app = express();

app.use(express.json());

const productsRepositoryImpl = new ProductsRepository();

app.post('/products', (req: Request<any, any, IProduct>, res) => {
  try {
    const { name } = req.body;

    if (typeof name !== 'string' || name.length < 3) {
      throw new Error(PRODUCT_NAME_MIN_LENGTH);
    }

    const product = productsRepositoryImpl.add({ name });

    res.status(201).json(product);
  } catch (reason) {
    const { message } = reason as Error;

    res.status(400).json({ message });
  }
});

app.get('/products', (req: Request<any, any, any, { search: string }>, res) => {
  const { search } = req.query;

  const products = productsRepositoryImpl.listAll(search);

  res.status(200).json(products);
});

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`);
});
