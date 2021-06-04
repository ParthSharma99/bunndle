import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";

const AsyncSearchBar = ({ setCollabs }) => {
  //set default query terms
  const [query, setQuery] = useState("");

  //get animated components wrapper
  const animatedComponents = makeAnimated();

  // fetch filteres search results for dropdown
  const loadOptions = ["onr", "ttwo", "theiknas"];

  return (
    <>
      <AsyncSelect
        cacheOptions
        components={animatedComponents}
        getOptionLabel={(e) => e.user_name}
        getOptionValue={(e) => e.id}
        loadOptions={loadOptions}
        onInputChange={(value) => setQuery(value)}
        // onChange={(value) => setCollabs(value)}
      />
    </>
  );
};

export default AsyncSearchBar;
