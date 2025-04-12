// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ImageGallery from "./ImageGallery";
// import { BASE_URL, fetchPropertiesByUrl } from "../API/api";
// import { GoVerified } from "react-icons/go";
// import { FaBed, FaBath } from "react-icons/fa";
// import { BsGridFill } from "react-icons/bs";
// import { IoIosArrowDown } from "react-icons/io";
// import millify from "millify";
// import PropertyAttributes from "./PropertyAttributes";
// import PropertyAmenities from "./PropertyAmenities";

// export default function PropertyDetails() {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   useEffect(() => {
//     async function fetchPropertyDetails() {
//       try {
//         const url = `${BASE_URL}/properties/detail?externalID=${id}&lang=en`;
//         const data = await fetchPropertiesByUrl(url);
//         setProperty(data);
//       } catch (error) {
//         console.error("Error fetching property details:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchPropertyDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!property) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-red-500 text-xl">Property not found</p>
//       </div>
//     );
//   }

//   // Prepare images array from property.photos (fallback to coverPhoto if missing)
//   const images =
//     property.photos && property.photos.length > 0
//       ? property.photos.map((photo, index) => ({
//           id: photo.id || index,
//           url: photo.url,
//         }))
//       : [{ id: 1, url: property.coverPhoto?.url }];

//   // Construct address from property.location if available.
//   const address =
//     property.location && property.location.length
//       ? property.location.map((loc) => loc.name).join(", ")
//       : "";

//   // Truncate description to 150 characters (adjust as needed)
//   const truncatedDescription =
//     property.description && property.description.length > 150
//       ? property.description.slice(0, 150) + "..."
//       : property.description;

//   return (
//     <div className="container mx-auto p-6 flex flex-col items-center">
//       {/* Limit content width */}
//       <div className="w-full md:w-3/4 mx-auto">
//         {/* Agency information on top */}
//         {property.agency && property.agency.name && (
//           <div className="mb-4 text-gray-700 text-lg">
//             Listed by <span className="font-bold">{property.agency.name}</span>
//           </div>
//         )}

//         {/* Image Gallery */}
//         <div className="mb-6">
//           <ImageGallery data={images} />
//         </div>

//         {/* Property Information */}
//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             {property.isVerified && (
//               <GoVerified className="text-green-500 text-2xl" />
//             )}
//             <p className="text-gray-700 font-semibold text-xl">
//               AED {millify(property.price)}
//               {property.rentFrequency ? ` / ${property.rentFrequency}` : ""}
//             </p>
//           </div>
//           <div className="flex items-center space-x-6 text-gray-500 text-lg mb-3">
//             <span className="flex items-center">
//               <FaBed className="mr-1" /> {property.rooms} Rooms
//             </span>
//             <span className="flex items-center">
//               <FaBath className="mr-1" /> {property.baths} Baths
//             </span>
//             <span className="flex items-center">
//               <BsGridFill className="mr-1" /> {millify(property.area)} sqft
//             </span>
//           </div>
//           {/* Title and Address */}
//           <h1 className="text-2xl font-bold mb-1">{property.title}</h1>
//           {address && <p className="text-gray-500 mb-4">{address}</p>}
//           {/* Description */}
//           <p className="text-gray-700">
//             {showFullDescription ? property.description : truncatedDescription}
//           </p>
//           {/* Read more / Read less toggle on its own line */}
//           {property.description && property.description.length > 150 && (
//             <div className="mt-2">
//               <button
//                 onClick={() => setShowFullDescription(!showFullDescription)}
//                 className="flex items-center underline cursor-pointer text-gray-900 hover:text-gray-700 transition"
//               >
//                 {showFullDescription ? "Read less" : "Read more"}
//                 <IoIosArrowDown
//                   className={`ml-1 transform transition ${
//                     showFullDescription ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>
//             </div>
//           )}
//         </div>

//         <PropertyAttributes property={property} />

//         <PropertyAmenities amenities={property.amenities} />
        
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ImageGallery from "./ImageGallery";
import { BASE_URL, fetchPropertiesByUrl } from "../API/api";
import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import millify from "millify";
import PropertyAttributes from "./PropertyAttributes";
import PropertyAmenities from "./PropertyAmenities";

// Helper function that fetches property details
async function getPropertyDetails(id) {
  const url = `${BASE_URL}/properties/detail?externalID=${id}&lang=en`;
  const data = await fetchPropertiesByUrl(url);
  return data;
}

export default function PropertyDetails() {
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Updated useQuery using object syntax
  const { data: property, isLoading, error } = useQuery({
    queryKey: ["propertyDetails", id],
    queryFn: () => getPropertyDetails(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl">Property not found</p>
      </div>
    );
  }

  // Prepare images array from property.photos (fallback to coverPhoto if missing)
  const images =
    property.photos && property.photos.length > 0
      ? property.photos.map((photo, index) => ({
          id: photo.id || index,
          url: photo.url,
        }))
      : [{ id: 1, url: property.coverPhoto?.url }];

  // Construct address from property.location if available.
  const address =
    property.location && property.location.length
      ? property.location.map((loc) => loc.name).join(", ")
      : "";

  // Truncate description to 150 characters (adjust as needed)
  const truncatedDescription =
    property.description && property.description.length > 150
      ? property.description.slice(0, 150) + "..."
      : property.description;

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      {/* Common container for consistent width */}
      <div className="w-full md:w-3/4 mx-auto">
        {/* Agency information on top */}
        {property.agency && property.agency.name && (
          <div className="mb-4 text-gray-700 text-lg">
            Listed by <span className="font-bold">{property.agency.name}</span>
          </div>
        )}

        {/* Image Gallery */}
        <div className="mb-6">
          <ImageGallery data={images} />
        </div>

        {/* Property Information */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {property.isVerified && (
              <GoVerified className="text-green-500 text-2xl" />
            )}
            <p className="text-gray-700 font-semibold text-xl">
              AED {millify(property.price)}
              {property.rentFrequency ? ` / ${property.rentFrequency}` : ""}
            </p>
          </div>
          {/* Title and Address */}
          <h1 className="text-2xl font-bold mb-1">{property.title}</h1>
          {address && <p className="text-gray-500 mb-4">{address}</p>}
          {/* Stats: Rooms, Baths, Area */}
          <div className="flex items-center space-x-6 text-gray-500 text-lg mb-3">
            <span className="flex items-center">
              <FaBed className="mr-1" /> {property.rooms} Rooms
            </span>
            <span className="flex items-center">
              <FaBath className="mr-1" /> {property.baths} Baths
            </span>
            <span className="flex items-center">
              <BsGridFill className="mr-1" /> {millify(property.area)} sqft
            </span>
          </div>
          {/* Description */}
          <p className="text-gray-700">
            {showFullDescription ? property.description : truncatedDescription}
          </p>
          {/* Read more / Read less toggle */}
          {property.description && property.description.length > 150 && (
            <div className="mt-2">
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="flex items-center underline cursor-pointer text-gray-900 hover:text-gray-700 transition"
              >
                {showFullDescription ? "Read less" : "Read more"}
                <IoIosArrowDown
                  className={`ml-1 transform transition ${
                    showFullDescription ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Additional Property Attributes */}
        <PropertyAttributes property={property} />

        {/* Amenities Section with a top border */}
        <div>
          <PropertyAmenities amenities={property.amenities} />
        </div>
      </div>
    </div>
  );
}
