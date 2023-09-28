import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import { useState } from "react";
import { authorize, search, createAndFillPlaylist } from "./utils/spotifyConnector";

function App() {
  const [playlistTracks, setPlaylistTracks]= useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const addToPlaylist = (trackToAdd) => {
    setPlaylistTracks(prev => [...prev, trackToAdd]);
  };
  const removeFromPlaylist = (trackToRemove) => {
    const index = playlistTracks.findIndex(track => track.id===trackToRemove.id);
    setPlaylistTracks(prev => prev.splice(index, 1));
  }

  const savePlaylist = (playlistName, trackList)=>{
    console.log(`Saving ${playlistName} playlist`);
    createAndFillPlaylist(playlistName, playlistTracks);
  }

  const makeSearch = (term)=>{
    search(term).then(data => {setSearchResults(data)});
  }

  const testButton = ()=>{
    authorize();
  }

  return (
    <div className="App">
      <SearchBar makeSearch={makeSearch} />
      <table>
      <tbody>
        <tr>
          <td>
            <button onClick={testButton}>TEST</button>
            <SearchResults searchResults={searchResults} addToPlaylist={addToPlaylist} />
          </td>
          <td>
            <Playlist savePlaylist={savePlaylist} playlistTracks={playlistTracks} removeFromPlaylist={removeFromPlaylist} />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
