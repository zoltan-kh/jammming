import React from "react";

function Track({
  id = "mockKey",
  album = "Fortitude",
  duration = "5:02",
  artist = "Gojira",
  title = "Into the Storm",
  isPlaylist,
  removeTrackFromList,
  addTrackToLIst,
}) {
  const handleClick = (event) => {
    if (isPlaylist) {
      console.log("Removing Track");
      removeTrackFromList(id);
    } else {
      console.log("Adding Track");
      addTrackToLIst(id);
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
