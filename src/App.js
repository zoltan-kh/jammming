import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import { useEffect, useState } from "react";
import {
  authorize,
  search,
  createAndFillPlaylist,
  isLoggedIn,
} from "./utils/spotifyConnector";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const addToPlaylist = (trackToAdd) => {
    let trackCount = 0;
    playlistTracks.map((track) => {
      if (track.id === trackToAdd.id) {
        trackCount++;
      }
    });
    console.log(playlistTracks);
    console.log(trackCount);
    if (trackCount > 0) {
      alert("This track is already in your playlist!");
    } else {
      setPlaylistTracks((prev) => [...prev, trackToAdd]);
    }
  };

  const removeFromPlaylist = (trackToRemove) => {
    const index = playlistTracks.findIndex(
      (track) => track.id === trackToRemove.id
    );
    const newTrackList = [...playlistTracks];
    newTrackList.splice(index, 1);
    console.log(newTrackList);
    setPlaylistTracks(newTrackList);
  };

  const savePlaylist = (playlistName, trackList) => {
    createAndFillPlaylist(playlistName, playlistTracks);
  };

  const makeSearch = (term) => {
    search(term).then((data) => {
      setSearchResults(data);
    });
    setSearchTerm(term);
  };

  const makeAuthorization = () => {
    authorize();
  };

  return (
    <div className="App">
      <div className="header">Jammming {loggedIn}</div>
      {loggedIn ? (
        <div>
          <SearchBar makeSearch={makeSearch} />
          {searchResults.length > 0 ? (
            <div>
              <SearchResults
                searchResults={searchResults}
                searchTerm={searchTerm}
                addToPlaylist={addToPlaylist}
              />
              <Playlist
                savePlaylist={savePlaylist}
                playlistTracks={playlistTracks}
                removeFromPlaylist={removeFromPlaylist}
              />
            </div>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div className="authContainer">
          <button onClick={makeAuthorization} className="searchButton">
            Authorize
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
