import React from "react";
import Track from "../Track/Track";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ searchResult = [], searchTerm, addToPlaylist }) {
  const tracksFound = [];
 /* if (searchResult.length) {
    for (let track in tracksFound) {
      tracksFound.push(<Track />);
    }
  }*/

  const addToList = (track)=>{
    addToPlaylist(track);
  }

  return (
    <div>
      <h1>Search results for {searchTerm}</h1>
      <div>
        <Tracklist tracks={searchResult} addToList={addToList} sourceType="searchResult" />
      </div>
    </div>
  );
}

export default SearchResults;
