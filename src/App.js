import React, { useEffect, useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

const App = () => {
  //Event data that we will fetch on page load and form submit
  const [eventData, setEventData] = useState(null);

  //Performer data that will be used to get the event performer's spotify url
  const initPerformerData = {
    performers : [],
  }
  const [performerData, setPerformerData] = useState(initPerformerData);

  // Fetch the main performer of each event.
  const getPerformers = () => {
    const events = eventData.events;
    events.forEach((event) => {
      fetch(`https://api.seatgeek.com/2/performers?id=${event.performers[0].id}&client_id=${queryOptions.client_id}&client_secret=${queryOptions.client_secret}`)
      .then(response => {
      return response.json();
      })
      .then(response => {
        setPerformerData((performerData) => ({
          performers: [...performerData.performers, response]
        }));
      })
      .catch(err => {
      console.error(err);
      });
    })
  }

  const initFormState = {
    queryType: "",
    searchString: "",
  }
  
  //Form state that is changed on form change and form submit
  //we use this to handle how we fetch data from the event API
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
          // console.log(response);
          return response.json();
        })
        .then(response => {
          // console.log(response);
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
        console.log("default case");
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

  //Use useEffect hooks to prevent infinite looping.
  useEffect(getEventInfo, []);

  //getPerformers after event data is fetched
  useEffect(() => {
    if(eventData) {
      getPerformers();
    }
    
  }, [eventData]);
  
  return (
    <div className="App">
      <header className="App-header">
        <SearchForm handleSubmit={handleSubmit} handleChange={handleChange} formState={formState}/>
      </header>
      <SearchResults eventData={eventData} lastForm={lastForm} queryOptions={queryOptions} performerData={performerData}/>
    </div>
  );
}

export default App;
