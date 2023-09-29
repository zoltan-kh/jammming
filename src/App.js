import logo from "./logo.svg";
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
  const [searchTerm, setSearchTerm] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(loggedIn);
    setLoggedIn(isLoggedIn());
  }, []);
  const addToPlaylist = (trackToAdd) => {
    setPlaylistTracks((prev) => [...prev, trackToAdd]);
  };
  const removeFromPlaylist = (trackToRemove) => {
    const index = playlistTracks.findIndex(
      (track) => track.id === trackToRemove.id
    );
    setPlaylistTracks((prev) => prev.splice(index, 1));
  };

  const savePlaylist = (playlistName, trackList) => {
    console.log(`Saving ${playlistName} playlist`);
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
