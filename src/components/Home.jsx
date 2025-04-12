
// import { useProperties } from "../API/useProperties";
// import PropertyList from "../components/PropertyList";

// export default function Home() {
//   const { properties, error } = useProperties();

//   if (error) {
//     return <p className="text-red-500 text-center mt-4">Error fetching properties.</p>;
//   }

//   if (!properties) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Properties for Rent</h2>
//       <PropertyList properties={properties.propertiesForRent} />

//       <h2 className="text-3xl font-bold mt-12 mb-6 text-center text-gray-800">Properties for Sale</h2>
//       <PropertyList properties={properties.propertiesForSale} />
//     </div>
//   );
// }





import React from "react";
import { useProperties } from "../API/useProperties";
import HorizontalPropertyList from "../components/HorizontalPropertyList";

export default function Home() {
  const { properties, loading, error } = useProperties();

  if (loading || properties === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-4">
        Error fetching properties.
      </p>
    );
  }

  
  const allProperties = [
    ...(properties.propertiesForRent || []),
    ...(properties.propertiesForSale || []),
  ];
  console.log("Combined Properties:", allProperties);


const newestListings = [...allProperties]
  .sort((a, b) => new Date(b.approvedAt) - new Date(a.approvedAt))
  .slice(0, 4);


const rentalsWithLaundry = allProperties
  .filter(
    (property) =>
      property.amenities &&
      property.amenities.some((a) => a.toLowerCase().includes("laundry"))
  )
  .slice(0, 4);

const rentalsWithPools = allProperties
  .filter(
    (property) =>
      property.amenities &&
      property.amenities.some((a) => a.toLowerCase().includes("pool"))
  )
  .slice(0, 4);


  return (
    <div className="container text-center mx-auto p-6">
      <h2 className="text-3xl font-bold mb-5 ">Newest Listings</h2>
      <HorizontalPropertyList properties={newestListings} />

      <h2 className="text-3xl font-bold my-4">
        Rental with In-Unit Laundry
      </h2>
      <HorizontalPropertyList properties={rentalsWithLaundry} />

      <h2 className="text-3xl font-bold my-4">
        Rental with Pools
      </h2>
      <HorizontalPropertyList properties={rentalsWithPools} />
    </div>
  );
}
