import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const HotDogComp = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch({
            type: "FETCH_ALL_COMP_DOGS",
            payload: id
        })
    }, [])
    return (
        <h2>hot dog comp</h2>
    )
}

export default HotDogComp;