import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const SuspectedHotDogs = () => {
    const susDogs = useSelector(store => store.susDogs)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(()=>{
        dispatch({
            type: "FETCH_SUS_DOGS",
            payload: id
        })
    })

    return (
        <div>
               <h2>Suspected Dogs</h2>
        </div>
     
        
    )
}

export default SuspectedHotDogs