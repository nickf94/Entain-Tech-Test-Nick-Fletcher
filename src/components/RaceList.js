import React from 'react';

const RaceList = ({ raceList }) => {
  return (
    <div>
      <div>
        <div>
          Meeting name:
        </div>
        <div>
          Race number:
        </div>
        <div>
          Start time:
        </div>
      </div>
      <div>
        <ul>
          {raceList.map((race) => (
            <li key={race.id}>
              <div>{race.meeting_name}</div>
              <div>{race.race_number}</div>
              <div></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RaceList;
