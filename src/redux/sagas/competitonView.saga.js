import { put, takeLatest, fork } from "redux-saga/effects";
import axios from "axios";

function* fetchAllCompDogs(action) {
  try {
    const response = yield axios.get(`/hotdogs/comp/${action.payload}`);
    yield put({ type: "SET_COMP_DOGS", payload: response.data });
  } catch (err) {
    console.log("error in fetchAllCompDogs", err);
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

function* compView(action) {
  yield fork(fetchCompInfo, action);
  yield fork(fetchDogCount, action);
  yield fork(fetchAllCompDogs, action);
}

function* callFetch() {
  yield takeLatest("SET_CURRENT_COMP", compView);
}

export default callFetch;
