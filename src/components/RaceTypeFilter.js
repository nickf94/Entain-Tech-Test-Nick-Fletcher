import React from 'react';

const RaceTypeFilter = ({ updateFilter, handleRaceTypeChange }) => {
  return (
    <div>
      <label htmlFor="raceTypes">Choose Race Type:</label>
      <select name="raceTypes" onChange={handleRaceTypeChange} id="raceTypes">
        <option value="Greyhound">Greyhound racing</option>
        <option value="Harness">Harness racing</option>
        <option value="Horse">Horse racing</option>
      </select>
    </div>
  )
}

export default RaceTypeFilter;