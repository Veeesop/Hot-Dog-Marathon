const userCompetitions = (state = [], action) => {
  switch (action.type) {
    case "SET_USERS_COMPETITIONS":
      return action.payload;
    default:
      return state;
  }
};

export default userCompetitions;
