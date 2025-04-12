import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";
import { useNavigate } from "react-router-dom";


export default function PropertyList({ properties }) {
  const navigate = useNavigate();
  const safeProperties = Array.isArray(properties) ? properties : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {safeProperties.map((property) => (
        <div
          key={property.id}
          className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
          onClick={() => navigate(`/property/${property.id}`)}
        >
          <img
            src={property.coverPhoto?.url}
            alt={property.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
          <div className="p-4 md:p-5">
            <div className="flex items-center gap-2">
              {property.isVerified && (
                <GoVerified className="text-green-500 text-lg md:text-xl" />
              )}
              <p className="text-gray-700 font-semibold text-base md:text-lg">
                AED {millify(property.price)}
                {property.rentFrequency ? ` / ${property.rentFrequency}` : ""}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-gray-500 text-sm md:text-base mt-2">
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
            <h3 className="text-sm md:text-lg font-semibold mt-3 text-gray-800">
              {property.title.length > 40
                ? `${property.title.substring(0, 40)}...`
                : property.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
