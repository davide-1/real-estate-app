import React from "react";

export default function PropertyAmenities({ amenities }) {
  if (!amenities || amenities.length === 0) {
    return null;
  }

  // Check if amenities are nested (e.g. an array of groups, each with an "amenities" array)
  const flatAmenities =
    amenities.length > 0 && amenities[0].amenities
      ? amenities.flatMap((group) => group.amenities)
      : amenities;

  return (
    <div className="mt-8 border-t border-gray-300 pt-6">
      <h2 className="text-xl font-bold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {flatAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Optionally, you can add an icon if available */}
            <span className="text-gray-700">
              {amenity.text || amenity.name || amenity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
