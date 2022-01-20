import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  //Our event data will use hooks to update without page refreshes
  const [eventData, setEventData] = useState(null);

  //query options needed to fetch event data
  const queryOptions = {
    client_id : process.env.REACT_APP_SEATGEEK_CLIENT_ID,
    client_secret : process.env.REACT_APP_SEATGEEK_CLIENT_SECRET,
  }
  //Fetch the event info
  const getEventInfo = () => {
    fetch(`https://api.seatgeek.com/2/events?client_id=${queryOptions.client_id}&client_secret=${queryOptions.client_secret}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      setEventData(response);
    })
    .catch(err => {
      console.error(err);
    });
  };

  useEffect(getEventInfo, []);
  console.log(eventData);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
