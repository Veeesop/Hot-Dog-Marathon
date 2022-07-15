import { useState, useEffect } from 'react'
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import '../CountDown/CountDown.css'



const CountdownMonths = () => {
  const user = useSelector(store => store.user)
  const comp = useSelector(store => store.activeComp)
  const dogCount= useSelector(store => store.dogCount)
  const dispatch = useDispatch()
  const targetTime = moment(comp.end_date);
  const [currentTime, setCurrentTime] = useState(moment());
  
  const timeBetween = moment.duration(targetTime.diff(currentTime));
  const isComplete = () => {
        dispatch({
            type: "SET_WINNER",
            payload: {
                comp_id: id,
                winner: leader
        }})
    }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    {timeBetween > 0 ? 
    <div>
      <p>Competition Ends In:</p>
      <p className="counter">
        {timeBetween.years() > 0 && <span>{timeBetween.years()} years </span> }
        {timeBetween.months() > 0 && <span> {timeBetween.months() } months  </span>}
        {timeBetween.days() > 0 && <span> {timeBetween.days()} days  </span>}
        {timeBetween.hours() > 0 && <span> {timeBetween.hours()} hours  </span>}
        {timeBetween.minutes() > 0 && <span> {timeBetween.minutes()} min  </span>}
        {timeBetween.seconds() > 0 && <span> {timeBetween.seconds()} sec  </span>}
      </p>
      </div>
      :
      <div className='winner'>
        <h2>winner is HotDogDestroyer</h2>
        {/* {isComplete} */}
      </div>
    }
    </>
  );
};

export default CountdownMonths