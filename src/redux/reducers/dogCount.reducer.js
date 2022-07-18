const dogCount = (state = [], action) => {
  switch (action.type) {
    case "SET_DOG_COUNT":
      return action.payload;
    case "UNSET_DOG_COUNT":
      return [];
    default:
      return state;
  }
};

export default dogCount;
