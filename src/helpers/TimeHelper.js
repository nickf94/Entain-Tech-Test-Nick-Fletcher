import dayjs from 'dayjs';

class TimeHelper {
  static convertTime(time) {
    const timeNow = dayjs();
    const diff = dayjs(time).diff(timeNow);
    const hours = dayjs(time).diff(timeNow, 'hours');
    const minutes = dayjs(diff).minute();
    const seconds = dayjs(diff).second();

    const hoursVal = hours ? `${hours}h` : '';
    const minsVal = hours || minutes ? `${minutes}m` : '';
    const secsVal = `${seconds}s`;
    const timeNowUnix = dayjs(timeNow).unix();
    return (timeNowUnix * 1000) >= time ? `${60 - seconds}s ago` : `${hoursVal}${minsVal}${secsVal}`;
  }

  static timeUntilNextRace(time) {
    const timeNow = dayjs();
    return dayjs(time).diff(timeNow, 'milliseconds');
  }
}

export default TimeHelper;
