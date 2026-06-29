## Implementation Summary

1. I created an Algolia account and used my Algolia application to create a `products` index.

2. I wrote an indexing script in JavaScript using Algolia's API client. The script reads `data/products.json`, uploads the product records to the `products` index, and uses environment variables for the Application ID, Admin API Key, and index name so sensitive credentials are not committed.

3. I configured the index settings to improve relevance by setting searchable attributes such as `name`, `brand`, `categories`, `description`, and `type`. I also configured faceting for `brand`, `categories`, `price_range`, `free_shipping`, and `rating`, and added custom ranking based on `popularity` and `rating`.

4. I created a frontend search demo using InstantSearch.js. The demo includes a search box, product results, thumbnails, product titles, prices, brand/category filters, price range filtering, a free shipping toggle, and pagination.
