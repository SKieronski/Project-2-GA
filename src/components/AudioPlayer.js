import React from "react";

const AudioPlayer = () => {
    
    return (
        <iframe 
            className="Iframe-spotify"
            title="Spotify-embed"
            src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" 
            width="300" 
            height="80" 
            // frameborder="0" 
            // allowtransparency="true" 
            allow="encrypted-media"
        ></iframe>
    )
}

export default AudioPlayer;