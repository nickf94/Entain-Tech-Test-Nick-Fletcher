import React from 'react';
import './RaceList.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const RaceList = ({ raceList }) => {
  return (
    <TableContainer>
      <Table w="1120px">
        <TableHead>
          <TableRow>
            <TableCell align="center">Meeting name</TableCell>
            <TableCell align="center">Race number</TableCell>
            <TableCell align="center">Starting time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {raceList.map((race) => (
            <TableRow key={race.race_id}>
              <TableCell align="center">{race.meetingName}</TableCell>
              <TableCell align="center">{race.raceNumber}</TableCell>
              <TableCell align="center">{race.advertisedStart.seconds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RaceList;
