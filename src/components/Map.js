import React from "react";

const Map = ({queryOptions, venueCity, venueName}) => {
    const mapsURL = `https://www.google.com/maps/embed/v1/place?key=${queryOptions.g_maps_key}&q=${venueName},${venueCity}`;
    
    return (
        <iframe
            className="Iframe-map"
            title="venue map"
            loading="lazy"
            src={mapsURL}
        ></iframe>
    )
}

export default Map;