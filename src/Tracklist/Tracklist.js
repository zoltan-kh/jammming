import React from "react";
import Track from "../Track/Track";
import styles from './TrackList.module.css'

function Tracklist({ tracks, isPlaylist, removeTrack, addToList }) {
  const trackList = [];

  const removeTrackFromList = (trackKey) => {
    const index = tracks.findIndex(track => track.id===trackKey);
    removeTrack(tracks[index]);
  };

  const addTrackToList = (trackKey) => {
    const index = tracks.findIndex(track => track.id===trackKey);
    addToList(tracks[index]);
  };

  if (tracks.length) {
    tracks.map((track)=>{
      
      trackList.push(<Track
          key={track.id}
          id={track.id}
          album={track.album.name}
          duration={track.duration_ms}
          artist={track.artists[0].name}
          title={track.name}
          isPlaylist={isPlaylist}
          removeTrackFromList={removeTrackFromList}
          addTrackToList={addTrackToList}
        />)
    })
    
  }

  return <div className={styles.container}>{trackList}</div>;
}

export default Tracklist;
