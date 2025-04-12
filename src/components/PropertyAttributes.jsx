import React from "react";
import { FaHome, FaCalendarAlt, FaCheckCircle, FaDog } from "react-icons/fa";

export default function PropertyAttributes({ property }) {
  // Build an array of attribute objects.
  const attributes = [
    {
      icon: <FaHome className="text-2xl" />,
      label: "Property Type",
      value: property.product || "N/A",
    },
    {
      icon: <FaCalendarAlt className="text-2xl" />,
      label: "Listed On",
      value: property.approvedAt
        ? new Date(property.approvedAt * 1000).toLocaleDateString()
        : "N/A",
    },
    {
      icon: <FaCheckCircle className="text-2xl" />,
      label: "Completion Status",
      value: property.completionStatus || "N/A",
    },
    {
      icon: <FaDog className="text-2xl" />,
      label: "Pets Allowed",
      value:
        property.petsAllowed === true
          ? "Yes"
          : property.petsAllowed === false
          ? "No"
          : "N/A",
    },
  ];

  return (
    <div className="mt-8 border-t border-gray-300 pt-6">
      <h2 className="text-xl font-bold mb-4">Additional Property Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {attributes.map((attr, index) => (
          <div key={index} className="flex items-center gap-3">
            {attr.icon}
            <div>
              <p className="font-semibold">{attr.label}</p>
              <p className="text-gray-600">{attr.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
