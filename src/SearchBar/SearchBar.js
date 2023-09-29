import React, { useState } from "react";

function SearchBar({makeSearch}) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    makeSearch(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={searchTerm}
            placeholder="Search..."
            onChange={({target}) => setSearchTerm(target.value)}
          />
        </div>
        <button type="submit">Search!</button>
      </form>
    </div>
  );
}

export default SearchBar;
