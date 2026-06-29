import { liteClient as algoliasearch } from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import {
  searchBox,
  hits,
  refinementList,
  pagination,
  configure,
  toggleRefinement,
} from "instantsearch.js/es/widgets/index.js";

const searchClient = algoliasearch(
  "GNEIPBYORZ",
  "278cec2fbe1e1dde4dbc274c4953398b"
);

const search = instantsearch({
  indexName: "products",
  searchClient,
});

search.addWidgets([
  searchBox({
    container: "#searchbox",
    placeholder: "Search for products...",
  }),

  refinementList({
    container: "#brand",
    attribute: "brand",
    searchable: true,
  }),

  refinementList({
    container: "#categories",
    attribute: "categories",
    searchable: true,
  }),

  refinementList({
    container: "#price-range",
    attribute: "price_range",
  }),

  toggleRefinement({
    container: "#free-shipping",
    attribute: "free_shipping",
    templates: {
      labelText: "Free shipping only",
    },
  }),

  hits({
    container: "#hits",
    templates: {
      item(hit, { html, components }) {
        return html`
          <article class="product-card">
            <img src="${hit.image}" alt="${hit.name}" class="product-image" />

            <div class="product-info">
              <h2>${components.Highlight({ hit, attribute: "name" })}</h2>

              <p class="brand">${hit.brand || ""}</p>

              <p class="description">
                ${components.Snippet({ hit, attribute: "description" })}
              </p>

              <p class="price">£${Number(hit.price).toFixed(2)}</p>

              <p class="meta">
                Rating: ${hit.rating || "N/A"} ·
                ${hit.free_shipping ? "Free shipping" : "Paid shipping"}
              </p>
            </div>
          </article>
        `;
      },
    },
  }),

  configure({
    hitsPerPage: 12,
  }),

  pagination({
    container: "#pagination",
  }),
]);

search.start();