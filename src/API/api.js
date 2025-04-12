

import Bottleneck from "bottleneck";

export const BASE_URL = "https://bayut.p.rapidapi.com";

// Increase minTime to 200ms to slow down requests further
const limiter = new Bottleneck({
  minTime: 200,
});

// Simple retry function for handling 429 errors
async function fetchWithRateLimit(url, retries = 3) {
  return limiter.schedule(async () => {
    try {
      const response = await fetch(url, {
        headers: {
          "x-rapidapi-key": "dcdbb9d057mshb77de8c1fc6f025p165576jsndd1398b18672",
          "x-rapidapi-host": "bayut.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        // If rate limited, wait and retry
        if (response.status === 429 && retries > 0) {
          // Optionally read the Retry-After header if provided:
          const retryAfter = response.headers.get("Retry-After");
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : 1000;
          console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchWithRateLimit(url, retries - 1);
        }
        throw new Error(`HTTP error ${response.status}`);
      }

      // Safely attempt to parse JSON
      const text = await response.text();
      if (!text) {
        // If no text, return an empty result
        return { hits: [] };
      }
      try {
        return JSON.parse(text);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return { hits: [] };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return { hits: [] };
    }
  });
}

// Fetch both rent and sale properties with rate limiting
export async function fetchProperties() {
  try {
    const rentUrl = `${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`;
    const saleUrl = `${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`;

    const [dataForRent, dataForSale] = await Promise.all([
      fetchWithRateLimit(rentUrl),
      fetchWithRateLimit(saleUrl),
    ]);
    console.log("Rent Data:", dataForRent, "Sale Data:", dataForSale);

    return {
      propertiesForRent: dataForRent.hits || [],
      propertiesForSale: dataForSale.hits || [],
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { propertiesForRent: [], propertiesForSale: [] };
  }
}

// Fetch by URL with rate limiting
export async function fetchPropertiesByUrl(url) {
  return fetchWithRateLimit(url);
}
