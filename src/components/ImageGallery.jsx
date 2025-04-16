
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ImageGallery({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeImage = (newIndex) => {
    // Start fade-out transition
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex(newIndex);
      // End fade-out, allow fade-in transition via CSS
      setIsTransitioning(false);
    }, 800); // Adjust timing as needed
  };

  const nextImage = () => {
    changeImage((prev) => (prev + 1) % data.length);
  };

  const prevImage = () => {
    changeImage((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="relative" style={{ height: "400px" }}>
      <img
        src={data[selectedIndex].url}
        alt="property"
        className={`w-full h-full object-cover rounded-3xl transition-opacity duration-600 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      />
      {data.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 cursor-pointer rounded-full shadow-2xl p-4 text-xl text-white hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 cursor-pointer rounded-full shadow-2xl p-4 text-xl text-white hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowForward />
          </button>
        </>
      )}
      {/* Image count overlay */}
      <div className="absolute bottom-4 right-1/2 transform translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
        {selectedIndex + 1} / {data.length}
      </div>
    </div>
  );
}
