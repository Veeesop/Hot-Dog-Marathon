import { useState, useEffect } from 'react'
import moment from "moment"
import { useDispatch } from 'react-redux';
import '../CountDown/CountDown.css'



export const CountdownMonths = ({date, comp_id, leader, winner }) => {

    const dispatch = useDispatch()
    const targetTime = moment(date);
  const [currentTime, setCurrentTime] = useState(moment());

  const timeBetween = moment.duration(targetTime.diff(currentTime));
  const isComplete = (timeDiff) => {
    if(timeDiff > 0){
        dispatch({
            type: "SET_WINNER",
            payload: {
                comp_id: comp_id,
                winner: leader
        }})
        
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    isComplete(timeBetween)
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p>Competition Ends In:</p>
      <p className="counter">
        {timeBetween.years() > 0 && <span>{timeBetween.years()} years </span> }
        {timeBetween.months() > 0 && <span> {timeBetween.months() } months  </span>}
        {timeBetween.days() > 0 && <span> {timeBetween.days()} days  </span>}
        {timeBetween.hours() > 0 && <span> {timeBetween.hours()} hours  </span>}
        {timeBetween.minutes() > 0 && <span> {timeBetween.minutes()} min  </span>}
        {timeBetween.seconds() > 0 && <span> {timeBetween.seconds()} sec  </span>}
      </p>
    </>
  );
};

export default CountdownMonths