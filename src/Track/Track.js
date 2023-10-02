import React from "react";
import styles from './Track.module.css'

function Track({
  id = "mockKey",
  album = "Fortitude",
  duration = 546579875,
  artist = "Gojira",
  title = "Into the Storm",
  isPlaylist,
  removeTrackFromList,
  addTrackToList,
}) {
  const handleClick = () => {
    if (isPlaylist) {
      removeTrackFromList(id);
    } else {
      addTrackToList(id);
    }
  };

  const millisecondsToTime = (millisec) => {
    var minutes = Math.floor(millisec / 60000);
    var seconds = ((millisec % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div className={[styles.container, isPlaylist ? styles.playlistStyle : styles.searchStyle].join(' ')}>
      <span className={styles.trackInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.artist}>{artist}</div>
        <div className={styles.album}>{album}</div>
      </span>
      <span className={styles.trackDuration}>
        <div className={styles.trackTime}>
          {millisecondsToTime(duration)}
          </div>
      </span>
      <span className={styles.addButtonContainer}>
        <button
          className={styles.addButton}
          type="button"
          onClick={handleClick}
        >
          {isPlaylist ? "-" : "+"}
        </button>
      </span>
    </div>
  );
}

export default Track;
