
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useProperties } from "../API/useProperties";
// import PropertyList from "../components/PropertyList";
// import { BsFilter } from "react-icons/bs";
// import SearchFilters from "./SearchFilters";
// import noresult from "../assets/noresult.svg";

// export default function Search() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [searchFilters, setSearchFilters] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [hasLoaded, setHasLoaded] = useState(false);

//   const getFiltersFromUrl = () => {
//     const params = new URLSearchParams(location.search);
//     return {
//       purpose: params.get("purpose") || "for-rent",
//       rentFrequency: params.get("rentFrequency") || "yearly",
//       minPrice: params.get("minPrice") || "0",
//       maxPrice: params.get("maxPrice") || "1000000",
//       roomsMin: params.get("roomsMin") || "0",
//       bathsMin: params.get("bathsMin") || "0",
//       sort: params.get("sort") || "price-desc",
//       areaMax: params.get("areaMax") || "35000",
//       locationExternalIDs: params.get("locationExternalIDs") || "5002",
//       categoryExternalID: params.get("categoryExternalID") || "4",
//     };
//   };

//   const [filters, setFilters] = useState(getFiltersFromUrl());
//   const { properties = { propertiesForRent: null, propertiesForSale: null }, loading, error } = useProperties(filters);

//   useEffect(() => {
//     setFilters(getFiltersFromUrl());
//   }, [location.search]);

//   useEffect(() => {
//     setIsLoading(true);
//     const query = new URLSearchParams(filters).toString();
//     navigate(`?${query}`, { replace: true });
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, [filters, navigate]);

//   useEffect(() => {
//     if (!loading && properties) {
//       const hasValidResponse =
//         Array.isArray(properties.propertiesForRent) ||
//         Array.isArray(properties.propertiesForSale);
//       if (hasValidResponse) {
//         setHasLoaded(true);
//       }
//     }
//   }, [loading, properties]);

//   if (error) return <p className="text-red-500">Error fetching properties.</p>;

//   return (
//     <div className="container mx-auto p-6">
//       <div
//         className="flex items-center justify-center gap-2 bg-gray-100 p-3 font-black cursor-pointer"
//         onClick={() => setSearchFilters((prev) => !prev)}
//       >
//         <h2>Search Property By Filters</h2>
//         <BsFilter />
//       </div>

//       {searchFilters && <SearchFilters filters={filters} setFilters={setFilters} />}

//       {isLoading ? (
//         <div className="flex justify-center my-6">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           {(filters.purpose === "for-rent" || !filters.purpose) && (
//             <>
//               <h2 className="text-2xl font-bold mb-4 text-center">Properties for Rent</h2>
//               {Array.isArray(properties.propertiesForRent) && properties.propertiesForRent.length > 0 ? (
//                 <PropertyList properties={properties.propertiesForRent} />
//               ) : (
//                 !loading && hasLoaded && (
//                   <img src={noresult} alt="No result" className="mx-auto my-6" />
//                 )
//               )}
//             </>
//           )}

//           {(filters.purpose === "for-sale" || !filters.purpose) && (
//             <>
//               <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Properties for Sale</h2>
//               {Array.isArray(properties.propertiesForSale) && properties.propertiesForSale.length > 0 ? (
//                 <PropertyList properties={properties.propertiesForSale} />
//               ) : (
//                 !loading && hasLoaded && (
//                   <img src={noresult} alt="No result" className="mx-auto my-6" />
//                 )
//               )}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProperties } from "../API/useProperties";
import PropertyList from "../components/PropertyList";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "./SearchFilters";
import Pagination from "../components/Pagination"; // import the Pagination component
import noresult from "../assets/noresult.svg";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract filters from the URL; note we call getFiltersFromUrl() immediately.
  const getFiltersFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return {
      purpose: params.get("purpose") || "for-rent",
      rentFrequency: params.get("rentFrequency") || "yearly",
      minPrice: params.get("minPrice") || "0",
      maxPrice: params.get("maxPrice") || "1000000",
      roomsMin: params.get("roomsMin") || "0",
      bathsMin: params.get("bathsMin") || "0",
      sort: params.get("sort") || "price-desc",
      areaMax: params.get("areaMax") || "35000",
      locationExternalIDs: params.get("locationExternalIDs") || "5002",
      categoryExternalID: params.get("categoryExternalID") || "4",
      page: params.get("page") || "0", // add page, default to "0"
    };
  };

  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [searchFilters, setSearchFilters] = useState(false);
  
  // Artificial delay states.
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Update filters from URL when location.search changes.
  useEffect(() => {
    setFilters(getFiltersFromUrl());
  }, [location.search]);

  // Fetch properties using the hook.
  const { properties, loading, error } = useProperties(filters);

  // Use a timeout to simulate loading delay.
  useEffect(() => {
    setIsLoading(true);
    // Update URL query string
    const query = new URLSearchParams(filters).toString();
    navigate(`?${query}`, { replace: true });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [filters, navigate]);

  // Set hasLoaded flag once properties have been fetched.
  useEffect(() => {
    if (!loading && properties) {
      setHasLoaded(true);
    }
  }, [loading, properties]);

  if (error)
    return (
      <p className="text-red-500 text-center mt-4">
        Error fetching properties.
      </p>
    );

  // Show spinner until both hook-loading and artificial delay are resolved.
  if (isLoading || loading || properties === null) {
    return (
      <div className="flex justify-center my-6">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // Pagination: Handler to update the page in filters.
  const updatePage = (newPage) => {
    const updatedFilters = { ...filters, page: String(newPage) };
    setFilters(updatedFilters);
    const params = new URLSearchParams(updatedFilters).toString();
    navigate(`?${params}`, { replace: true });
  };

  // Assume totalPages is a constant (e.g., 10) for demonstration.
  const totalPages = 10;
  const currentPage = Number(filters.page);

  return (
    <div className="container mx-auto p-6">
      <div
        className="flex items-center justify-center gap-2 bg-gray-100 p-3 font-black cursor-pointer"
        onClick={() => setSearchFilters((prev) => !prev)}
      >
        <h2>Search Property By Filters</h2>
        <BsFilter />
      </div>

      {searchFilters && (
        <SearchFilters filters={filters} setFilters={setFilters} />
      )}

      <>
        {(filters.purpose === "for-rent" || !filters.purpose) && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Properties for Rent
            </h2>
            {Array.isArray(properties.propertiesForRent) &&
            properties.propertiesForRent.length > 0 ? (
              <PropertyList properties={properties.propertiesForRent} />
            ) : (
              !loading &&
              hasLoaded && (
                <img src={noresult} alt="No result" className="mx-auto my-6" />
              )
            )}
          </>
        )}

        {(filters.purpose === "for-sale" || !filters.purpose) && (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-center">
              Properties for Sale
            </h2>
            {Array.isArray(properties.propertiesForSale) &&
            properties.propertiesForSale.length > 0 ? (
              <PropertyList properties={properties.propertiesForSale} />
            ) : (
              !loading &&
              hasLoaded && (
                <img src={noresult} alt="No result" className="mx-auto my-6" />
              )
            )}
          </>
        )}
      </>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={updatePage}
      />
    </div>
  );
}











//PAGINATION



// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useProperties } from "../API/useProperties";
// import PropertyList from "../components/PropertyList";
// import { BsFilter } from "react-icons/bs";
// import SearchFilters from "./SearchFilters";
// import noresult from "../assets/noresult.svg";

// export default function Search() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // This function extracts filters including the page.
//   const getFiltersFromUrl = () => {
//     const params = new URLSearchParams(location.search);
//     return {
//       purpose: params.get("purpose") || "for-rent",
//       rentFrequency: params.get("rentFrequency") || "yearly",
//       minPrice: params.get("minPrice") || "0",
//       maxPrice: params.get("maxPrice") || "1000000",
//       roomsMin: params.get("roomsMin") || "0",
//       bathsMin: params.get("bathsMin") || "0",
//       sort: params.get("sort") || "price-desc",
//       areaMax: params.get("areaMax") || "35000",
//       locationExternalIDs: params.get("locationExternalIDs") || "5002",
//       categoryExternalID: params.get("categoryExternalID") || "4",
//       page: params.get("page") || "0",
//     };
//   };

//   // Initialize filters; note we call the function.
//   const [filters, setFilters] = useState(getFiltersFromUrl());
//   const [searchFilters, setSearchFilters] = useState(false);
  
//   // The hook uses the filters to fetch data.
//   const { properties, loading, error } = useProperties(filters);

//   // Update filters from URL when location.search changes.
//   useEffect(() => {
//     setFilters(getFiltersFromUrl());
//   }, [location.search]);

//   if (error)
//     return <p className="text-red-500 text-center mt-4">Error fetching properties.</p>;

//   // Show spinner until data is loaded.
//   if (loading || !properties) {
//     return (
//       <div className="flex justify-center my-6">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Handler to update the page number.
//   const updatePage = (newPage) => {
//     // Update filters with new page value.
//     const updatedFilters = { ...filters, page: String(newPage) };
//     setFilters(updatedFilters);
//     // Update the URL's query string.
//     const params = new URLSearchParams(updatedFilters);
//     navigate(`?${params.toString()}`, { replace: true });
//   };

//   // Convert current page to a number for calculations.
//   const currentPage = Number(filters.page);

//   return (
//     <div className="container mx-auto p-6">
//       <div
//         className="flex items-center justify-center gap-2 bg-gray-100 p-3 font-black cursor-pointer"
//         onClick={() => setSearchFilters((prev) => !prev)}
//       >
//         <h2>Search Property By Filters</h2>
//         <BsFilter />
//       </div>

//       {searchFilters && <SearchFilters filters={filters} setFilters={setFilters} />}

//       <>
//         {(filters.purpose === "for-rent" || !filters.purpose) && (
//           <>
//             <h2 className="text-2xl font-bold mb-4 text-center">Properties for Rent</h2>
//             {properties.propertiesForRent.length > 0 ? (
//               <PropertyList properties={properties.propertiesForRent} />
//             ) : (
//               <img src={noresult} alt="No result" className="mx-auto my-6" />
//             )}
//           </>
//         )}

//         {(filters.purpose === "for-sale" || !filters.purpose) && (
//           <>
//             <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Properties for Sale</h2>
//             {properties.propertiesForSale.length > 0 ? (
//               <PropertyList properties={properties.propertiesForSale} />
//             ) : (
//               <img src={noresult} alt="No result" className="mx-auto my-6" />
//             )}
//           </>
//         )}

//         {/* Pagination Controls */}
//         <div className="flex justify-center mt-6 gap-4">
//           {currentPage > 0 && (
//             <button
//               onClick={() => updatePage(currentPage - 1)}
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
//             >
//               Previous
//             </button>
//           )}
//           <button
//             onClick={() => updatePage(currentPage + 1)}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
//           >
//             Next
//           </button>
//         </div>
//       </>
//     </div>
//   );
// }
