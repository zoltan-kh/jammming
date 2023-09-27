import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchTerm);
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
