import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addCompetition(action) {
  try {
    const competition = yield axios.post("/competitions", action.payload);
    const forJunction = {
      players: action.payload.players,
      competition_id: competition.data.rows[0].id,
    };
    yield put({ type: "ADD_TO_JUNCTION", payload: forJunction });
  } catch (err) {
    console.error("error in addCompetition", err);
  }
}

function* addToJunction(action) {
  try {
    yield axios.post("/competitions/junction", action.payload);
  } catch (err) {
    console.log("error in addToJunction", err);
  }
}

function* fetchCompInfo(action) {
  try {
    const response = yield axios.get(
      `/competitions/compInfo/${action.payload}`
    );
    console.log(response.data[0]);
    yield put({ type: "SET_ACTIVE_COMP_INFO", payload: response.data[0] });
  } catch (err) {
    console.log("Error in fetchCompInfo", err);
  }
}

function* competitions() {
  yield takeLatest("ADD_NEW_COMPETITION", addCompetition);
  yield takeLatest("ADD_TO_JUNCTION", addToJunction);
  yield takeLatest("FETCH_COMP_INFO", fetchCompInfo);
}

export default competitions;
