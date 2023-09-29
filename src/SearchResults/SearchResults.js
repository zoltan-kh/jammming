import React from "react";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ searchResults = [], searchTerm, addToPlaylist }) {
  
  const addToList = (track)=>{
    addToPlaylist(track);
  }

  return (
    <div>
      <h1>Search results for {searchTerm}</h1>
      <div>
        <Tracklist key="searchList" tracks={searchResults} addToList={addToList} sourceType="searchResult" />
      </div>
    </div>
  );
}

export default SearchResults;
