const clientId = "0287be3825a949778c7d25c2f41af729";

export const authorize = () => {
  const authUrl = "https://accounts.spotify.com/authorize?";
  const params = `response_type=token&client_id=${clientId}&scope=playlist-modify-private,&redirect_uri=http://localhost:3000/success?`;
  const requestUrl = authUrl + params;
  window.location = requestUrl;
};

export const search = async (searchTerm) => {
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
  const userId = await getUserId();
  const newPlaylistId = await createPlaylist(playlistName, userId);
  if(userId && newPlaylistId){
    const addTracksUrl = `https://api.spotify.com/v1/playlists/${newPlaylistId}/tracks`;
    const trackIds = [];
    tracks.map( (track) => {
      trackIds.push(`spotify:track:${track.id}`);
    });
    const data = {
      "uris": trackIds,
      "position": 0
  }
    const postData = {
      method: 'POST',
      body : JSON.stringify(data),
      headers : {  Authorization: `Bearer ${getAccessToken()}` }
    }
    try {
      const response = await fetch(addTracksUrl, postData);
      const jsonResponse = await response.json();
    } catch (error) {
      alert(error.message);
    }
  }
  
};

const createPlaylist = async (playlistName, userId) => {
    const playlistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const data = {
      "name": playlistName,
      "description": "New playlist description",
      "public": false
  }
    const postData = {
      method: 'POST',
      body : JSON.stringify(data),
      headers : {  Authorization: `Bearer ${getAccessToken()}` }
    }
  
    try {
      const response = await fetch(playlistUrl, postData);
      const jsonResponse = await response.json();
      return await jsonResponse.id;
    } catch (error) {
      alert(error.message);
    }
}

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
  const urlParams = new URLSearchParams(window.location.hash);
  return urlParams.get("#access_token");
};
