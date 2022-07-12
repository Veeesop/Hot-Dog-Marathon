const dogCount = (state = [], action) => {
  switch (action.type) {
    case "SET_DOG_COUNT":
      return action.payload;
    default:
      return state;
  }
};

export default dogCount;
