## Implementation Summary

1. I created an Algolia account and used my Algolia application to create a `products` index.

2. I wrote an indexing script in JavaScript using Algolia's API client. The script reads `data/products.json`, uploads the product records to the `products` index, and uses environment variables for the Application ID, Admin API Key, and index name so sensitive credentials are not committed.

3. I configured the index settings to improve relevance by setting searchable attributes such as `name`, `brand`, `categories`, `description`, and `type`. I also configured faceting for `brand`, `categories`, `price_range`, `free_shipping`, and `rating`, and added custom ranking based on `popularity` and `rating`.

4. I created a frontend search demo using InstantSearch.js. The demo includes a search box, product results, thumbnails, product titles, prices, brand/category filters, price range filtering, a free shipping toggle, and pagination.

# Assignment

This project implements a product search experience using Algolia and InstantSearch.js.

## Features

- Product indexing using Algolia's API client
- Search box
- Product results with image, title, description and price
- Brand, category, price range filters, free shipping toggle and pagination

## Project Structure

```
.
├── data/
│   └── products.json
├── src/
│   ├── app.js
│   ├── index-products.js
│   └── styles.css
├── index.html
├── package.json
└── .env.example
```

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` and provide the Algolia credentials:

```env
ALGOLIA_APP_ID=APP_ID
ALGOLIA_ADMIN_API_KEY=ADMIN_API_KEY
ALGOLIA_INDEX_NAME=products
```

## Index Products

Upload the products and configure the index:

```bash
npm run index
```

## Run Locally

Start the development server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```
