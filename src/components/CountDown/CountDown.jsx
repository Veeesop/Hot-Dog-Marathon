import { useState, useEffect } from 'react'
import moment from "moment"
import '../CountDown/CountDown.css'



export const CountdownMonths = ({date}) => {

const targetTime = moment(date);
  const [currentTime, setCurrentTime] = useState(moment());
  const timeBetween = moment.duration(targetTime.diff(currentTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>Competiton Ends In:</p>
      <p className="counter">
        {timeBetween.years() > 0 && <span>{timeBetween.years()}years </span>}
        {timeBetween.months() > 0 && <span>{timeBetween.months()}months </span>}
        <span>{timeBetween.days()}days </span>
        <span>{timeBetween.hours()}hours </span>
        <span>{timeBetween.minutes()}min </span>
        <span>{timeBetween.seconds()}sec </span>
      </p>
    </>
  );
};

export default CountdownMonths