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

function* competitions() {
  yield takeLatest("ADD_NEW_COMPETITION", addCompetition);
  yield takeLatest("ADD_TO_JUNCTION", addToJunction);
}

export default competitions;
