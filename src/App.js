import "./App.css";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import SpotifyRedirect from "./SpotifyRedirect/SpotifyRedirect";
import { useEffect, useState } from "react";
import {
  authorize,
  search,
  createAndFillPlaylist,
  isLoggedIn
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
    if (trackCount > 0) {
      alert("This track is already in your playlist!");
    } else {
      setPlaylistTracks((prev) => [...prev, trackToAdd]);
    }

    const index = searchResults.findIndex(
      (track) => track.id === trackToAdd.id
    );
    const newSearchList = [...searchResults];
    newSearchList.splice(index, 1);
    setSearchResults(newSearchList);
  };

  const removeFromPlaylist = (trackToRemove) => {
    const index = playlistTracks.findIndex(
      (track) => track.id === trackToRemove.id
    );
    const newTrackList = [...playlistTracks];
    newTrackList.splice(index, 1);
    setPlaylistTracks(newTrackList);

    setSearchResults((prev) => [...prev, trackToRemove]);
  };

  const savePlaylist = (playlistName) => {
    createAndFillPlaylist(playlistName, playlistTracks).then(() => {
      setPlaylistTracks([]);
      makeSearch(searchTerm);
    });
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="success?" element={<SpotifyRedirect />} />

          <Route
            index
            path="/"
            element={
              <div className="App">
                <div className="header">Jammming</div>
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
                    <button
                      onClick={makeAuthorization}
                      className="searchButton"
                    >
                      Authorize
                    </button>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
