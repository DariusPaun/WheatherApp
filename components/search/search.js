import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { ApiUrlAutocomplete, ApiKeyAutocomplete } from "../../app/api";
import { Button } from "@/components/ui/button";
import "./search.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    if (inputValue.trim() !== "") {
      var requestOptions = {
        method: "GET",
      };

      return fetch(
        `${ApiUrlAutocomplete}autocomplete?text=${inputValue}&apiKey=${ApiKeyAutocomplete}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          return {
            options: response.features.map((feature) => {
              const properties = feature.properties;
              const geometry = feature.geometry;
              const hasStreet = properties.street ? true : false;
              return {
                value: `${geometry.coordinates[1]} ${geometry.coordinates[0]}`, // Swap lat and lon if needed
                label: hasStreet
                  ? `Place :${properties.city}, ${properties.country} ,${properties.street}`
                  : `City : ${properties.city}, ${properties.country}`,
              };
            }),
          };
        });
    } else {
      return {
        options: [],
      };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    // Pass the selected data to the parent component
    onSearchChange(searchData);
  };

  const handleSearchButtonClick = (searchData) => {
    // Simulate "Enter" key press by triggering the search action
    // when the search button is clicked.
    setSearch(searchData);
    onSearchChange(searchData);
    
  };

  return (
    <div className="search-container" style={{ width: "95%" ,marginLeft: "auto" }}>
      <AsyncPaginate
        placeholder={"Search for city"}
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
