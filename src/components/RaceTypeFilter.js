import React, { useState } from 'react';
import './RaceTypeFilter.css'

const RaceTypeFilter = ({ updateFilter, handleRaceTypeChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <label htmlFor="raceTypes">Choose Race Type:</label>
      <select name="raceTypes" onChange={(e) => setSelectedCategory(e.target.value)} id="raceTypes">
        <option value="Greyhound">Greyhound racing</option>
        <option value="Harness">Harness racing</option>
        <option value="Horse">Horse racing</option>
      </select>
    </div>
  )
}

export default RaceTypeFilter;