require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { algoliasearch } = require("algoliasearch");

const appId = process.env.ALGOLIA_APP_ID;
const adminApiKey = process.env.ALGOLIA_ADMIN_API_KEY;
const indexName = process.env.ALGOLIA_INDEX_NAME || "products";

if (!appId || !adminApiKey) {
  console.error("Missing ALGOLIA_APP_ID or ALGOLIA_ADMIN_API_KEY in .env");
  process.exit(1);
}

const client = algoliasearch(appId, adminApiKey);

const productsPath = path.join(__dirname, "..", "data", "products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

async function run() {
  console.log(`Uploading ${products.length} products to "${indexName}"...`);

  await client.setSettings({
    indexName,
    indexSettings: {
      searchableAttributes: [
        "unordered(name)",
        "unordered(brand)",
        "unordered(categories)",
        "description",
        "type",
      ],
      attributesForFaceting: [
        "searchable(brand)",
        "searchable(categories)",
        "price_range",
        "free_shipping",
        "rating",
      ],
      customRanking: ["desc(popularity)", "desc(rating)"],
      attributesToSnippet: ["description:20"],
      snippetEllipsisText: "...",
    },
  });

  await client.saveObjects({
    indexName,
    objects: products,
  });

  console.log("Done. Settings and records uploaded.");
}

run().catch((error) => {
  console.error("Indexing failed:", error);
  process.exit(1);
});