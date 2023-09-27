import React, { useEffect, useState } from "react";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({savePlaylist, removeFromPlaylist, playlistTracks}) {
  const [playlistName, setPlaylistName] = useState("");

  const handleSubmit = (event)=>{
    event.preventDefault();
    savePlaylist(playlistName, playlistTracks);
    setPlaylistName('');
  }

  const removeTrack = (track) =>{
    removeFromPlaylist(track);
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <div>
        <input value={playlistName} onChange = {({target})=>setPlaylistName(target.value)} />
      </div>
      <Tracklist tracks={playlistTracks} removeTrack={removeTrack} isPlaylist={true}/>
      <div>
        <button type="submit">Save to Spotify!</button>
      </div>
      </form>
    </div>
  );
}

export default Playlist;
