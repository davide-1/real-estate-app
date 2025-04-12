// import { Routes, Route } from "react-router-dom"
// import NavBar from "./components/NavBar"
// import Footer from "./components/Footer"
// import Search from "./components/Search"
// import Home from "./components/Home"
// import PropertyDetails from "./components/PropertyDetails"


// function App() {

//   return (
//     <div>
//       <NavBar />
//       <Routes>
//         <Route
//           path="/"
//           element={<Home />}
//         />
//         <Route
//           path="/search"
//           element={<Search />}
//         />
//         <Route 
//         path="/property/:id" 
//         element={<PropertyDetails />} 
//         />
//       </Routes>
//       <Footer />
//     </div>
//   )
// }

// export default App




import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Search from "./components/Search";
import PropertyDetails from "./components/PropertyDetails";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache the query for 5 minutes
      staleTime: 1000 * 60 * 5,
      // Refetch data in the background when re-mounted
      refetchOnMount: "always",
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
