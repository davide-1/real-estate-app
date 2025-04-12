import React from "react";
import banner from "../assets/banner.jpg"; // adjust the path according to your project structure

export default function Banner() {
  return (
    <div className="w-full md:w-full h-100 aspect-video overflow-hidden">

      <img
        src={banner}
        alt="RealtorImg"
        className="w-full h-100 object-cover"
      />
    </div>
  );
}
