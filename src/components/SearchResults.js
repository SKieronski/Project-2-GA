import React from "react";
import Map from "./Map";
import AudioPlayer from "./AudioPlayer";

const SearchResults = ({eventData, lastForm, queryOptions, performerData}) => {
    
    
    if(eventData && performerData) {
        const myResults = eventData.events;
        if(myResults.length < 1) {
            return (
                <h1>No upcoming events for "{lastForm.searchString}"</h1>
            )
        }
        let index = -1;
        return (
            <div className="Div-results">
                {myResults.map((event) => {
                    // console.log(event);
                    // console.log(performerData.performers[index].links.length);
                    index++;
                    let hasSpotifyLink = true;
                    const venueCity = event.venue.city;
                    const venueName = event.venue.name;
                    const venueDate = event.datetime_local.split("T", 1)
                    // console.log("about to go in")
                    // if(performerData.performers[index])
                    // {
                    //     console.log("reached this part")
                    //     if(performerData.performers[index].links.length === 0) {
                    //         hasSpotifyLink = false;
                    //         console.log(hasSpotifyLink);
                    //     } 
                    // }
                    // console.log(hasSpotifyLink);
                    // console.log(index);
                    console.log(performerData.performers[index]);
                    // console.log(eventData);
                    // console.log(performerData.performers[index])
                    return (
                        <div className="inDIVidual-results" key={event.id}>
                            <img className="Img-results" src={event.performers[0].image} alt={event.performers[0].name}/>
                            <h2 className="H2-results">{event.title}</h2>
                            <ul className="Ul-genre">
                                {event.performers[0].genres && 
                                <li className="Li-genre" key={event.performers[0].genres[0].id}>{event.performers[0].genres[0].name}</li>}

                                <li className="Li-venue" key={event.venue.slug}>{event.venue.name} in {event.venue.display_location}</li>
                                
                                <li className="Li-date" key={event.created_at}>{venueDate}</li>

                                {event.stats.average_price && <li className="Li-avgPrice" key={event.stats.average_price}>Avg Price: ${event.stats.average_price}</li>}

                                <li className="Li-ticket" key={event.url}><a href={event.url} className="Li-a">Buy Tickets Here</a></li>
                            </ul>
                            {/* {hasSpotifyLink === true && <AudioPlayer performerData={performerData} eventPerformerName={event.performers[0].name}/>} */}
                            <AudioPlayer performerData={performerData} eventPerformerName={event.performers[0].name}/>
                            <Map queryOptions={queryOptions} venueName={venueName} venueCity = {venueCity} />
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <h1>Loading...</h1>
        )
    }

    // if(eventData) {
    //     // const myResults = eventData.events;
    //     if(eventData.events.length < 1) {
    //         return (
    //             <h1>No upcoming events for "{lastForm.searchString}"</h1>
    //         )
    //     }
    //     return (
    //         <div className="Div-results">
    //             {eventData.events.map((event) => {
    //                 console.log(event);
    //                 // const venueCity = event.venue.city;
    //                 // const venueName = event.venue.name;
    //                 // const venueDate = event.datetime_local.split("T", 1)
    //                 return (
    //                     <div className="inDIVidual-results" key={event.id}>
    //                         <img className="Img-results" src={event.performers[0].image} alt={event.performers[0].name}/>
    //                         <h2 className="H2-results">{event.title}</h2>
    //                         <ul className="Ul-genre">
    //                             {event.performers[0].genres && 
    //                             <li className="Li-genre" key={event.performers[0].genres[0].id}>{event.performers[0].genres[0].name}</li>}

    //                             <li className="Li-venue" key={event.venue.slug}>{event.venue.name} in {event.venue.display_location}</li>
                                
    //                             <li className="Li-date" key={event.created_at}>{event.datetime_local.split("T", 1)}</li>

    //                             {event.stats.average_price && <li className="Li-avgPrice" key={event.stats.average_price}>Avg Price: ${event.stats.average_price}</li>}

    //                             <li className="Li-ticket" key={event.url}><a href={event.url} className="Li-a">Buy Tickets Here</a></li>
    //                         </ul>
    //                         {/* <Map queryOptions={queryOptions} eventData={eventData}/> */}
    //                         {/* <AudioPlayer /> */}
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     )
    // } else {
    //     return (
    //         <h1>Loading...</h1>
    //     )
    // }
    

    
}

export default SearchResults