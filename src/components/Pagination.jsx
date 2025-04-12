// export default function Pagination({
//     currentPage,
//     totalPages,
//     onPageChange,
//   }) {
//     const pageButtons = [];
  
//     for (let i = 1; i <= totalPages; i++) {
//       pageButtons.push(
//         <button
//           key={i}
//           className={`px-3 py-1 border rounded ${
//             currentPage === i
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 hover:bg-gray-200"
//           }`}
//           onClick={() => onPageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }
  
//     return (
//       <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {pageButtons}
//         <button
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     );
//   }
  
  

import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Create an array with page numbers (zero-indexed)
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 mx-1 text-white bg-gray-800 rounded hover:bg-gray-900 transition disabled:opacity-50"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`text-white px-4 py-2 mx-1 rounded transition ${
            page === currentPage
              ? "bg-gray-800  text-white"
              : "bg-gray-700  hover:bg-gray-900"
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 mx-1 text-white bg-gray-800 rounded hover:bg-gray-900 transition disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
