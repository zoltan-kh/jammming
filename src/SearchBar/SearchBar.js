import React, { useState } from "react";
import styles from './SearchBar.module.css'

function SearchBar({makeSearch}) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if(searchTerm){
      makeSearch(searchTerm);
    }
    else{
      alert('Enter something to search!');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className={styles.searchField}
            value={searchTerm}
            placeholder="Search..."
            onChange={({target}) => setSearchTerm(target.value)}
          />
        </div>
        <button className={styles.searchButton} type="submit" >Search!</button>
      </form>
    </div>
  );
}

export default SearchBar;
