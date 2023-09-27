import React from "react";
import Track from "../Track/Track";

function Tracklist({ tracks, isPlaylist, removeTrack, addToList }) {
  const trackList = [];

  const removeTrackFromList = (trackKey) => {
    console.log(trackKey);
    const index = trackList.findIndex(track => track.key===trackKey);
    removeTrack(trackList[index]);
  };

  const addTrackToLIst = (trackKey) => {
    console.log(trackKey);
    const index = trackList.findIndex(track => track.key===trackKey);
    addToList(trackList[index]);
  };

  if (tracks.length) {
    for (let track in tracks) {
      trackList.push(
        <Track
          key={track.id}
          id={track.id}
          album={track.album}
          duration={track.duration}
          artist={track.artist}
          title={track.title}
          isPlaylist={isPlaylist}
          removeTrackFromList={removeTrackFromList}
        />
      );
    }
  } else {
    for (let i = 0; i < 7; i++) {
      trackList.push(
        <Track
          key={i}
          id={i}
          removeTrackFromList={removeTrackFromList}
          addTrackToLIst={addTrackToLIst}
          isPlaylist={isPlaylist}
        />
      );
    }
  }

  return <div>{trackList}</div>;
}

export default Tracklist;
