import React from "react";
import { useEffect } from "react/cjs/react.development";

const AudioPlayer = ({performerData, mapIndex}) => {
    let myURL = "";
    console.log(performerData)
    // console.log(performerData.performers[mapIndex].links[0].url);
    console.log(mapIndex);
    //updateURLS is a function that modifies the performers' url for the spotify embedded player
    const updateURLS = () => {

        const url = performerData.performers[mapIndex].links[0].url;
        const splitIndex = url.indexOf("artist");
        console.log(splitIndex);
        let firstHalf = url.substring(0, splitIndex);
        let secondHalf = url.substring(splitIndex);
        myURL = firstHalf.concat("embed/", secondHalf);
        console.log(myURL);

    }

    // if (performerData){
    //     updateURLS();
    // }
    // useEffect(() => {
    //     let mounted = true;
    //     if(performerData && mounted) {
    //         updateURLS();
    //     }
    //     // if(mounted) {
    //     //     updateURLS();
    //     // }

    //     return () => mounted = false;
    // }, [performerData]);

    if(performerData) {
        updateURLS();
        return (
            <iframe 
            className="Iframe-spotify"
            title="Spotify-embed"
            src={myURL} 
            width="300" 
            height="80" 
            // frameborder="0" 
            // allowtransparency="true" 
            allow="encrypted-media"
            ></iframe>
        )
    } else {
        return <p>Loading Spotify Player...</p>
    }
    
}

export default AudioPlayer;