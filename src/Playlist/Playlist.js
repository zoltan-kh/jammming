import React, { useState } from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from './Playlist.module.css'

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
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
      <div>
        <input placeholder="Playlist name..." className={styles.nameField} value={playlistName} onChange = {({target})=>setPlaylistName(target.value)} />
      </div>
      <Tracklist key="playList" tracks={playlistTracks} removeTrack={removeTrack} isPlaylist={true}/>
      <div>
        <button className={styles.saveButton} type="submit">Save to Spotify!</button>
      </div>
      </form>
    </div>
  );
}

export default Playlist;
