import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addHotDog(action) {
  axios.post("/hotdogs", action.payload);
  console.log(action.payload);
}

function* addDog() {
  yield takeLatest("ADD_HOT_DOG", addHotDog);
}

export default addDog;
