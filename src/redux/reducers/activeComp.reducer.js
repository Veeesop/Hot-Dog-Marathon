const activeComp = (state = [], action) => {
  switch (action.type) {
    case "SET_ACTIVE_COMP_INFO":
      return action.payload;
    default:
      return state;
  }
};

export default activeComp;
