import React from "react";

function Track({
  id = "mockKey",
  album = "Fortitude",
  duration = "5:02",
  artist = "Gojira",
  title = "Into the Storm",
  isPlaylist,
  removeTrackFromList,
  addTrackToList,
}) {
  const handleClick = (event) => {
    if (isPlaylist) {
      removeTrackFromList(id);
    } else {
      addTrackToList(id);
    }
  };

  return (
    <div>
      <p>{title}</p>
      <p>{album}</p>
      <p>{artist}</p>
      <p>{duration}</p>

      <button type="button" onClick={handleClick}>
        {isPlaylist ? "-" : "+"}
      </button>
    </div>
  );
}

export default Track;
