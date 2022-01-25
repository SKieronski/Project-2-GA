import React from "react";
import { useEffect } from "react/cjs/react.development";

const AudioPlayer = ({performerData, eventPerformerName}) => {
    let myURL = "";
    // console.log(performerData.performers);
    // console.log(performerData.performers[mapIndex].links[0].url);
    // console.log(mapIndex);
    // console.log(performerData.performers[index])
    //updateURLS is a function that modifies the performers' url for the spotify embedded player
    const updateURLS = () => {

        performerData.performers.forEach((performer) => {
            // console.log(performer.performers[0].name);
            // console.log(eventPerformerName);
            if(performer.performers[0].name === eventPerformerName && performer.performers[0].links.length > 0) {
                const url = performer.performers[0].links[0].url;
                const splitIndex = url.indexOf("artist");
                // console.log(splitIndex);
                let firstHalf = url.substring(0, splitIndex);
                let secondHalf = url.substring(splitIndex);
                myURL = firstHalf.concat("embed/", secondHalf);
                // console.log(myURL);
                return;
            }
        })
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

    // const updateURLS = () => {
    //     console.log(performerData.performers)
    //     performerData.performers.forEach((performer) => {
    //         console.log(performer.performers[0].links[0].url)
    //         const url = performer.performers[0].links[0].url;
    //         const splitIndex = url.indexOf("artist");
    //         // console.log(splitIndex);
    //         let firstHalf = url.substring(0, splitIndex);
    //         let secondHalf = url.substring(splitIndex);
    //         myURL = firstHalf.concat("embed/", secondHalf);
    //         // console.log(myURL);
    //     })
    // }
    if(performerData) {
        updateURLS();
        console.log(myURL);
        if(myURL !== "") {
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
            return <p>No Spotify data available</p>
        }
        
    } else {
        return <p>Loading Spotify Player...</p>
    }
    
}

export default AudioPlayer;