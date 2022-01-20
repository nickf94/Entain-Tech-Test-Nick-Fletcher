import React, { useState, useEffect } from 'react';
import './App.css';
import RaceTypeFilter from './components/RaceTypeFilter';
import RaceList from './components/RaceList';

const App = () => {
  const [races, setRaces] = useState([]);
  const [sortedRaces, setSortedRaces] = useState([]);
  const [unsortedRaces, setUnsortedRaces] = useState([]);
  const [time, setTime] = useState(Date.now());
  const [raceCount, setRaceCount] = useState(100);
  const [requestedCount, setRequestedCount] = useState(5);
  const [selectedFilter, setSelectedFilter] = useState('');
  
  const timerId = 0;

  document.title = 'Entain Coding Test'
  
  const filters = {
    Greyhound: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    Harness: '161d9be2-e909-4326-8c2c-35ed71fb460b',
    Horse: '4a2788f8-e825-4d36-9894-efd4baf1cfae'
  }

  useEffect(() => {
    getRaceData();

    return function cleanup() {
      if (timerId !== 0) {
        window.clearInterval(timerId)
      }
    }
  }, []);

  const getRaceData = () => {
    getRawRaceData()
    dataRefresher();
  }

  const getRawRaceData = () => {
    fetch(`https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${raceCount}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      const { data } = json;

      setSortedRaces([]);

      let newRaces = [];

      const races = data.race_summaries;

      for (const [key] of Object.entries(races)) {
        const race = races[key]
        newRaces = newRaces.concat({
          meetingName: race.meeting_name,
          raceNumber: race.race_number,
          advertisedStart: race.advertised_start
        })
      }

      newRaces.sort((item1, item2) => {
        return item1.advertised_start - item2.advertised_start;
      });

      let sortedRaceCount = 0;

      setSortedRaces(() => {
        newRaces.filter((value) => {
          if (sortedRaceCount < 5 && (value.advertisedStart - time) > -60000) {
            sortedRaceCount++;
            return true;
          }
          return false;
        })
      })

      if (sortedRaceCount < 5) {
        setRaceCount({ raceCount: raceCount + 1 });
        getRaceData();
      }

      setRaces(newRaces);
    })
  }

  console.log(races);

  const filterData = () => {
    return races.reduce((accumulator, race) => {
      if (accumulator.length < requestedCount) {
        if (race.category_id === selectedFilter) {
          accumulator.push(race)
        }
      }
      return accumulator;
    }, []);
  }

  const filteredSortedData = () => {
    return filterData()
      .sort((firstRace, lastRace) =>
        firstRace.advertised_start.seconds - lastRace.advertised_start.seconds
      );
  }

  const dataRefresher = () => {
    filteredSortedData();

    const timeUntilNextRace = { ...races[0]?.advertised_start };
    return timeUntilNextRace;
  }

  const updateFilter = () => {
    const filter = 'Greyhound' | 'Harness' | 'Horse'
    selectedFilter = filters[filter];
    dataRefresher();
  };

  return (
    <div className="container">
      <div className="buttonContainer">
        <RaceTypeFilter updateFilter={updateFilter} />
      </div>
      <div className="list">
        <RaceList raceList={races} />
      </div>
    </div>
  );
}

export default App;
