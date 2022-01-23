import React, { useEffect, useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

const App = () => {
  //Our event data will use hooks to update without page refreshes
  const [eventData, setEventData] = useState(null);
  
  //Init Form state
  const initFormState = {
    queryType: "",
    searchString: "",
  }
  
  // Form state
  const [formState, setFormState] = useState(initFormState);
  const [lastForm, setLastForm] = useState(formState);

  //function for handling form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    //call useEffect on our fetch function
    getEventInfo();
    setLastForm(formState);
    //Reset the form
    setFormState(initFormState);
  }

  //function for handling form change
  const handleChange = (event) => {
    setFormState({...formState, [event.target.id]: event.target.value});
  }

  //query options needed to fetch event data
  const queryOptions = {
    client_id : process.env.REACT_APP_SEATGEEK_CLIENT_ID,
    client_secret : process.env.REACT_APP_SEATGEEK_CLIENT_SECRET,
    g_maps_key : process.env.REACT_APP_GOOGLE_MAPS_KEY,
  }

  //Fetch the event info
  const getEventInfo = () => {
    switch(formState.queryType) {
      case "performer":
        console.log("in performer case");
        fetch(`https://api.seatgeek.com/2/events?performers.slug=${formState.searchString}&taxonomies.name=concert&client_id=${queryOptions.client_id}&client_secret=${queryOptions.client_secret}`)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(response => {
          console.log(response);
          setEventData(response);
        })
        .catch(err => {
          console.error(err);
        });
        break;
      
      case "city":
        console.log("in city case");
        fetch(`https://api.seatgeek.com/2/events?venue.city=${formState.searchString}&taxonomies.name=concert&client_id=${queryOptions.client_id}&client_secret=${queryOptions.client_secret}`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          setEventData(response);
        })
        .catch(err => {
          console.error(err);
        });
        break;

      default:
        fetch(`https://api.seatgeek.com/2/events?venue.city=Chicago&taxonomies.name=concert&client_id=${queryOptions.client_id}&client_secret=${queryOptions.client_secret}`)
        .then(response => {
          return response.json();
        })
        .then(response => {
          setEventData(response);
        })
        .catch(err => {
          console.error(err);
        });
    } 
  };

  useEffect(getEventInfo, []);

  return (
    <div className="App">
      <header className="App-header">
        <SearchForm handleSubmit={handleSubmit} handleChange={handleChange} formState={formState}/>
      </header>
      <SearchResults eventData={eventData} lastForm={lastForm} queryOptions={queryOptions}/>
    </div>
  );
}

export default App;
