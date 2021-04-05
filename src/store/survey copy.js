const UPDATE_TITLE = "SURVEY/UPDATE_TITLE";
const UPDATE_DESCRIPTION = "SURVEY/UPDATE_DESCRIPTION";

export const updateTitle = (title) => {
  return {
    type: UPDATE_TITLE,
    payload: title,
  };
};

export const updateDescription = (description) => {
  return {
    type: UPDATE_DESCRIPTION,
    payload: description,
  };
};

export const surveyState = {
  title: "",
  description: "",
};

const reducer = (state = surveyState, action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
