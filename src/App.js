import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import RaceTypeFilter from './components/RaceTypeFilter';
import RaceList from './components/RaceList';

const App = () => {
  const [races, setRaces] = useState([]);
  const [sortedRaces, setSortedRaces] = useState([]);
  const [unsortedRaces, setUnsortedRaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [time, setTime] = useState(Date.now());
  const [raceCount, setRaceCount] = useState(100);
  const [requestedCount, setRequestedCount] = useState(5);
  const [selectedFilter, setSelectedFilter] = useState('');

  document.title = 'Entain Coding Test'
  
  const filters = {
    Greyhound: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    Harness: '161d9be2-e909-4326-8c2c-35ed71fb460b',
    Horse: '4a2788f8-e825-4d36-9894-efd4baf1cfae'
  }

  useEffect(() => {
    getRawRaceData();

    const interval = setInterval(() => {
      setTime(Date.now());
      getRaceData();
    }, 1000);
    return function cleanup() {
      clearInterval(interval)
    }
  }, []);

  const getRaceData = async() => {
    races = await getRawRaceData(raceCount)
    dataRefresher();
  }

  const getRawRaceData = (raceCount) => {
    axios.get(`https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${raceCount}`, {
        headers: { 'Content-type': 'application/json' }
    }).then((res) => {
      return Object.values(res.data.data.race_summaries);
    })
    .catch(err => console.log(err))
  }

  const filterData = () => {
    return races.reduce((accumulator: RaceListData[], race: RaceListData) => {
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
      .sort((firstRace: RaceListData, lastRace: RaceListData) =>
        firstRace.advertised_start.seconds - lastRace.advertised_start.seconds
      );
  }

  const dataRefresher = () => {
    races = filteredSortedData();

    const timeUntilNextRace = { ...races[0]?.advertised_start };
    const interval = TimeHelper.timeUntilNextRace((timeUntilNextRace.seconds + 60) * 1000);
    window.clearInterval(timerId);
    console.log(interval);
    if (interval > 0) {
      timerId = window.setInterval(() => {
        getRawRaceData();
        window.clearInterval(timerId);
      }, interval);
    }
  }

  const updateFilter = () => {
    const filter = 'Greyhound' | 'Harness' | 'Horse'
    selectedFilter = filters[filter];
    dataRefresher();
  };

  return (
    <div className="container">
      <div className="buttonContainer">
        <RaceTypeFilter updateFilter={updateFilter} handleRaceTypeChange={(e) => setSelectedCategory(e.target.value)} />
      </div>
      <div className="list">
        <RaceList raceList={races} />
      </div>
    </div>
  );
}

export default App;
