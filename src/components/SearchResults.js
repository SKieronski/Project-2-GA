import React from "react";

const SearchResults = ({eventData}) => {
    if(eventData) {
        const myResults = eventData.events;
        console.log(myResults)
        return (
            <div className="Div-results">
                {myResults.map((event) => {
                    return (
                        <div className="inDIVidual-results" key={event.title}>
                            <img className="Img-results" src={event.performers[0].image} alt={event.performers[0].name}/>
                            <h2 className="H2-results">{event.title}</h2>
                            <ul className="Ul-genre">
                                {event.performers[0].genres && event.performers[0].genres.map((genre) => {
                                    return (
                                        <li className="Li-genre" key={genre.id}>{genre.name}</li>
                                    )
                                })}
                                <li className="Li-venue" key={event.venue.slug}>{event.venue.name} in {event.venue.display_location}</li>
                                <li className="Li-avgPrice" key={event.stats.average_price}>Avg Price: ${event.stats.average_price}</li>
                            </ul>

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
    

    
}

export default SearchResults