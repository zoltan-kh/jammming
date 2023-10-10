const clientId = "0287be3825a949778c7d25c2f41af729";

export const authorize = () => {
  const popup = window.open(
    `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-private,&redirect_uri=http://localhost:3000/success?&show_dialog=true`,
    "Login with Spotify",
    "width=600,height=800"
  );

  window.spotifyAuthCallback = async (token, expTime) => {
    popup.close();
    localStorage.setItem("token", token);
    localStorage.setItem("expTime", expTime);

    window.location.reload();
  };
};

export const processLogin = () => {
  const urlParams = new URLSearchParams(window.location.hash);
  const token = urlParams.get("#access_token");
  const expTime = urlParams.get("expires_in");
  const expTimestamp = Math.floor(Date.now() / 1000 + parseInt(expTime, 10));
  window.opener.spotifyAuthCallback(token, expTimestamp);
};

export const search = async (searchTerm) => {
  if (!isLoggedIn()) {
    authorize();
    return;
  }
  const baseUrl = "https://api.spotify.com/v1/search?";
  const params = `q=${searchTerm}&type=track`;
  const headers = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };

  try {
    const response = await fetch(baseUrl + params, headers);
    const jsonResponse = await response.json();
    return await jsonResponse.tracks.items;
  } catch (error) {
    alert(error.message);
  }
};

export const createAndFillPlaylist = async (playlistName, tracks) => {
  if (!isLoggedIn()) {
    authorize();
    return;
  }
  const userId = await getUserId();
  const newPlaylistId = await createPlaylist(playlistName, userId);
  if (userId && newPlaylistId) {
    const addTracksUrl = `https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`;
    const trackIds = [];
    tracks.map((track) => {
      trackIds.push(`spotify:track:${track.id}`);
    });
    const data = {
      uris: trackIds,
      position: 0,
    };
    const postData = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    };
    try {
      const response = await fetch(addTracksUrl, postData);
      console.log(response);
      alert(`Your '${playlistName}' playlist was successfully created!`);
    } catch (error) {
      alert(error.message);
    }
  }
};

export const isLoggedIn = () => {
  if (localStorage.getItem("token") && !isTokenExpired()) {
    return true;
  } else {
    return false;
  }
};

const isTokenExpired = () => {
  const expTimestamp = parseInt(localStorage.getItem("expTime"), 10);
  if(isNaN(expTimestamp)){
    return true;
  }
  return Date.now() / 1000 > expTimestamp;
};

const createPlaylist = async (playlistName, userId) => {
  const playlistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const data = {
    name: playlistName,
    description: "New playlist description",
    public: false,
  };
  const postData = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };

  try {
    const response = await fetch(playlistUrl, postData);
    const jsonResponse = await response.json();
    return await jsonResponse.id;
  } catch (error) {
    alert(error.message);
  }
};

const getUserId = async () => {
  const userUrl = "https://api.spotify.com/v1/me";
  const headers = {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  };

  try {
    const response = await fetch(userUrl, headers);
    const jsonResponse = await response.json();
    return await jsonResponse.id;
  } catch (error) {
    alert(error.message);
  }
};

const getAccessToken = () => {
  return localStorage.getItem("token");
};
