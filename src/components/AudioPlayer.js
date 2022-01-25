import React from "react";

const AudioPlayer = ({performerData, eventPerformerName}) => {
    let myURL = "";
    //updateURLS is a function that modifies the performers' url for the spotify embedded player
    const updateURLS = () => {
         performerData.performers.forEach((performer) => {
            if(performer.performers[0].name === eventPerformerName && performer.performers[0].links.length > 0) {
                const url = performer.performers[0].links[0].url;
                const splitIndex = url.indexOf("artist");
                let firstHalf = url.substring(0, splitIndex);
                let secondHalf = url.substring(splitIndex);
                myURL = firstHalf.concat("embed/", secondHalf);
                return;
            }
        })
    }

    if(performerData) {
        updateURLS();
        //If the performer has a spotify url return the spotify player
        if(myURL !== "") {
            return (
                <iframe 
                className="Iframe-spotify"
                title="Spotify-embed"
                src={myURL} 
                width="300" 
                height="80"
                allow="encrypted-media"
                ></iframe>
            )
        } else {
            return <p>No Spotify data available</p>
        }
        
    } else {
        return <p>Loading Spotify Player...</p>
    }
    
}

export default AudioPlayer;