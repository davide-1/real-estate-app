
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL, fetchPropertiesByUrl } from "./api"; // adjust the path if needed

export function useProperties(filters) {
  // Start with null so we know the API hasn't returned data yet.
  const [properties, setProperties] = useState({
    propertiesForRent: null,
    propertiesForSale: null,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function loadProperties() {
      try {
        const searchParams = new URLSearchParams(location.search);
        const queryString = searchParams.toString();
        const rentUrl = queryString
          ? `${BASE_URL}/properties/list?${queryString}&hitsPerPage=6`
          : `${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`;
        const saleUrl = queryString
          ? `${BASE_URL}/properties/list?${queryString}&hitsPerPage=6`
          : `${BASE_URL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`;

        const [dataForRent, dataForSale] = await Promise.all([
          fetchPropertiesByUrl(rentUrl),
          fetchPropertiesByUrl(saleUrl),
        ]);

        setProperties({
          propertiesForRent: dataForRent.hits || [],
          propertiesForSale: dataForSale.hits || [],
        });
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, [location.search]);

  return { properties, loading, error };
}

