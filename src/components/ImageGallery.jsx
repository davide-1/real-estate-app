
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ImageGallery({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeImage = (newIndex) => {
    // Start fade-out
    setIsTransitioning(true);
    // Wait for fade-out to complete before updating index
    setTimeout(() => {
      setSelectedIndex(newIndex);
      // Remove fade-out (fade-in happens automatically because of CSS transition)
      setIsTransitioning(false);
    }, 800); // Adjust timing as needed (300ms fade-out)
  };

  const nextImage = () => {
    changeImage((prev) => (prev + 1) % data.length);
  };

  const prevImage = () => {
    changeImage((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="relative " style={{ height: "400px" }}>
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 
                       bg-gray-800 cursor-pointer rounded-full shadow-2xl p-4 text-xl text-white 
                       hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 
                       bg-gray-800 cursor-pointer rounded-full shadow-2xl p-4 text-xl text-white 
                       hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowForward />
          </button>
        </>
      )}
    </div>
  );
}
