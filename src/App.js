import React, { useEffect, useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

const App = () => {
  //Our event data will use hooks to update without page refreshes
  const [eventData, setEventData] = useState(null);
  const [performerData, setPerformerData] = useState(null);

  const[isLoading, setIsLoading] = useState(false);

  //write a function to be called back in the .finally after the first fetch call
  const getPerformers = () => {
    // console.log("start of getPerformers");
    // console.log(eventData)
    const myEvents = eventData.events;
    let myURL = `https://api.seatgeek.com/2/performers?`;
    let endURL = `client_id=${queryOptions.client_id}&client_secret=${queryOptions.client_secret}`;
    myEvents.forEach((event) => {
      // console.log("in for each loop")
      // console.log(event.performers[0].id)
      myURL = myURL.concat(`id=${event.performers[0].id}&`);
      // console.log(event.performers[0])
    })
    myURL = myURL.concat(endURL);
    // console.log(myURL);
    fetch(myURL)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // console.log("in fetch");
      // console.log(response);
      setPerformerData(response);
    })
    .catch((err) => {
      console.error(err);
    })
  }

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
    setIsLoading(true);
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
        .finally(() => {
          setIsLoading(false);
          // getPerformers();
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
        .finally(() => {
          setIsLoading(false);
          // getPerformers();
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
        .finally(() => {
          setIsLoading(false);
          // getPerformers();
        })
        .catch(err => {
          console.error(err);
        });
    } 
  };

  useEffect(getEventInfo, []);
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
