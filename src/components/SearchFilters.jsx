
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { filterData, getFilterValues } from "../API/filteredData";
import { BASE_URL, fetchPropertiesByUrl } from "../API/api";
import noresult from "../assets/noresult.svg";

export default function SearchFilters() {
  const [filters] = useState(filterData);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Merge new filter value with existing ones and update URL query parameters
  const searchProperties = (newFilter) => {
    const updatedFilters = { ...selectedFilters, ...newFilter };
    setSelectedFilters(updatedFilters);

    const params = new URLSearchParams(location.search);
    const values = getFilterValues(updatedFilters);

    values.forEach((item) => {
      if (item.value) {
        params.set(item.name, item.value);
      }
    });

    navigate({ pathname: location.pathname, search: params.toString() });
  };

  // Fetch auto-complete suggestions when searchTerm changes
  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchPropertiesByUrl(
          `${BASE_URL}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits || []);
      };
      fetchData();
    }
  }, [searchTerm]);

  return (
    <div className="bg-gray-100 p-4 flex justify-center flex-wrap">
      {/* Render filter dropdowns */}
      {filters.map((filter) => (
        <div key={filter.queryName} className="m-2">
          <select
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
            value={selectedFilters[filter.queryName] || ""}
          >
            <option value="">{filter.placeholder}</option>
            {filter.items.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Location search */}
      <div className="flex flex-col m-2">
        <button
          onClick={() => setShowLocations(!showLocations)}
          className="border border-gray-200 mt-2 p-2 rounded"
        >
          Search Location
        </button>
        {showLocations && (
          <div className="relative pt-2 flex flex-col">
            <input
              type="text"
              placeholder="Type Here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px] p-2 border border-gray-300 rounded focus:outline-none"
            />
            {searchTerm !== "" && (
              <MdCancel
                className="absolute right-5 top-3 cursor-pointer z-10"
                onClick={() => setSearchTerm("")}
              />
            )}
            {loading && <div className="m-auto mt-3">Loading...</div>}
            <div className="h-[300px] overflow-auto mt-2">
              {locationData && locationData.length > 0 ? (
                locationData.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: loc.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(loc.name);
                    }}
                  >
                    <p className="cursor-pointer bg-gray-200 p-2 border-b border-gray-100">
                      {loc.name}
                    </p>
                  </div>
                ))
              ) : (
                !loading && (
                  <div className="flex flex-col items-center justify-center mt-5 mb-5">
                    <img src={noresult} alt="No result" />
                    <p className="text-xl mt-3">Waiting to search!</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
