import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from './SearchResults.module.css'

function SearchResults({ searchResults = [], searchTerm, addToPlaylist }) {
  
  const addToList = (track)=>{
    addToPlaylist(track);
  }

  return (
    <div className={styles.container}>
      <p className={styles.header}>Search results for {searchTerm}</p>
      <div>
        <Tracklist key="searchList" tracks={searchResults} addToList={addToList} sourceType="searchResult" />
      </div>
    </div>
  );
}

export default SearchResults;
