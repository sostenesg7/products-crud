# products-crud

## How to run locally

```bash
yarn dev
```

## How to run with docker

```bash
yarn build-image && yarn run-image
```

## How to test locally with jest

```bash
yarn test
```

---

## Routes

### POST /products - Create a new Product

Request body

```json
{ "name": "Mouse gamer Logitech" }
```

Example response

```json
{ "name": "Mouse gamer Logitech" }
```

### GET /products - List all Products

Example response

```js
[{ name: 'Mouse gamer Logitech' }];
```

### GET /products?search=mouse - Search Products by name

Example response

```js
[{ name: 'Mouse gamer Logitech' }];
```

### Postman collection
- URL: https://www.getpostman.com/collections/06da0eec6a694b02f19f

- File: Or just import ```Products.postman_collection.json``` in postman