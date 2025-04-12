
import React from "react";
import { useNavigate } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";

export default function HorizontalPropertyList({ properties }) {
  const navigate = useNavigate();
  const safeProperties = Array.isArray(properties) ? properties : [];

  return (
    // Outer container allows horizontal scrolling.
    <div className="overflow-x-auto pb-4">
      <div className="flex justify-center space-x-6">
        {safeProperties.map((property) => (
          <div
            key={property.id}
            className="min-w-[250px] max-w-[300px] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer flex-shrink-0"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            <img
              src={property.coverPhoto?.url}
              alt={property.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2">
                {property.isVerified && (
                  <GoVerified className="text-green-500 text-lg" />
                )}
                <p className="text-gray-700 font-semibold text-base">
                  AED {millify(property.price)}
                  {property.rentFrequency ? ` / ${property.rentFrequency}` : ""}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
                <span className="flex items-center">
                  <FaBed className="mr-1" /> {property.rooms}
                </span>
                <span className="flex items-center">
                  <FaBath className="mr-1" /> {property.baths}
                </span>
                <span className="flex items-center">
                  <BsGridFill className="mr-1" /> {millify(property.area)} sqft
                </span>
              </div>
              <h3 className="text-sm font-semibold mt-3 text-gray-800">
                {property.title.length > 40
                  ? `${property.title.substring(0, 40)}...`
                  : property.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
