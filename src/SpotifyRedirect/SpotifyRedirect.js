import React, { useEffect } from "react";
import {   processLogin  } from "../utils/spotifyConnector";

function SpotifyRedirect(){
    useEffect(()=>{
        processLogin();
    }, []);
return <div></div>
}

export default SpotifyRedirect;