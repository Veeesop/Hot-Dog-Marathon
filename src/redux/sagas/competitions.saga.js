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

function* fetchDogCount(action) {
  try {
    const response = yield axios.get(
      `/competitions/dogCount/${action.payload}`
    );
    yield put({ type: "SET_DOG_COUNT", payload: response.data });
  } catch (err) {
    console.log("Error in fetchDogCount", err);
  }
}

function* setWinner(action) {
  try {
    console.log(action.payload);
    yield axios.put(`competitions/winner/${action.payload.id}`, action.payload);
  } catch (err) {
    console.log("Error in setWinner", err);
  }
}

function* competitions() {
  yield takeLatest("ADD_NEW_COMPETITION", addCompetition);
  yield takeLatest("ADD_TO_JUNCTION", addToJunction);
  yield takeLatest("FETCH_COMP_INFO", fetchCompInfo);
  yield takeLatest("FETCH_DOG_COUNT", fetchDogCount);
  yield takeLatest("SET_WINNER", setWinner);
}

export default competitions;
