import React, { useEffect } from 'react';
import TimeHelper from '../helpers/TimeHelper';

const CountTime = ({ timeValue }) => {
  const data = {
      countDownTimer: null,
      refresTimerId: null,
  };

  const { countDownTimer, refresTimerId } = data;

  useEffect(() => {
    let refresTimerId = window.setInterval(() => {
      refreshData()
    }, 1000)
  })

  const refreshData = () => {
    let countDownTimer = TimeHelper.convertTime(timeValue * 1000);
  }

  return (
    <div>
      <div>
        {countDownTimer?.length ? countDownTimer : 'loading'}
      </div>
    </div>
  )
}

export default CountTime;
