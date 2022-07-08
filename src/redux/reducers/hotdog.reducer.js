const hotdogReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_COMP_DOGS":
      return action.payload;
    default:
      return state;
  }
};

export default hotdogReducer;
