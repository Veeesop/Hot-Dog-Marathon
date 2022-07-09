import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addHotDogPhoto(action) {
  try {
    const url = yield axios.post("/hotdogs/photo", action.payload);

    const hotdog = {
      user_id: action.payload.user_id,
      rating: action.payload.rating,
      description: action.payload.description,
      photo: url.data,
      probability: action.payload.probability,
    };
    yield put({ type: "ADD_HOT__DOG_DATABASE", payload: hotdog });
  } catch (err) {
    console.error("Error in addHotDogPhoto", err);
  }
}

function* addHotDogDatabase(action) {
  try {
    yield axios.post("/hotdogs/database", action.payload);
    console.log("Success! POST to database");
  } catch (err) {
    console.error("Error in addHotDogDatabase", err);
  }
}

function* fetchAllCompDogs(action) {
  try {
    const response = yield axios.get(`/hotdogs/comp/${action.payload}`);
    yield put({ type: "SET_COMP_DOGS", payload: response.data });
  } catch (err) {
    console.log("error in fetchAllCompDogs", err);
  }
}

function* fetchSusDogs(action) {
  try {
    const response = yield axios.get(`/hotdogs/susDogs/${action.payload}`);
    yield put({ type: "SET_SUS_DOGS", payload: response.data });
  } catch (err) {
    console.log("Error in fetchSusDogs", err);
  }
}

function* hotdog() {
  yield takeLatest("ADD_HOT_DOG_PHOTO", addHotDogPhoto);
  yield takeLatest("ADD_HOT__DOG_DATABASE", addHotDogDatabase);
  yield takeLatest("FETCH_ALL_COMP_DOGS", fetchAllCompDogs);
  yield takeLatest("FETCH_SUS_DOGS", fetchSusDogs);
}

export default hotdog;
