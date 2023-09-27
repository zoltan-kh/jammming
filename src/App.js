import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./SearchResults/SearchResults";
import Playlist from "./Playlist/Playlist";
import { useState } from "react";

function App() {
  const [playlistTracks, setPlaylistTracks]= useState([]);
  const addToPlaylist = (trackToAdd) => {
    console.log("I am at the APP!");
    setPlaylistTracks(prev => [...prev, trackToAdd]);
  };
  const removeFromPlaylist = (trackToRemove) => {
    const index = playlistTracks.findIndex(track => track.key===trackToRemove.key);
    setPlaylistTracks(prev => prev.splice(index, 1));
  }

  const savePlaylist = (playlistName, trackList)=>{
    console.log(`Saving ${playlistName} playlist`);
  }

  return (
    <div className="App">
      <SearchBar />
      <table>
      <tbody>
        <tr>
          <td>
            <SearchResults addToPlaylist={addToPlaylist} />
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
