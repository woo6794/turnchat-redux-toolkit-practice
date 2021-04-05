const ADD_OPTION = "QUESTION/ADD_OPTION";
const REMOVE_OPTION = "QUESTION/REMOVE_OPTION";
const UPDATE_OPTION = "QUESTION/UPDATE_OPTION";
const CHANGE_TYPE = "QUESTION/CHANGE_TYPE";
const ADD_QUESTION = "QUESTION/ADD_QUESTION";
const REMOVE_QUESTION = "QUESTION/REMOVE_QUESTION";
const UPDATE_QUESTION_TITLE = "QUESTION/UPDATE_QUESTION_TITLE";
const UPDATE_QUESTION_DESCRIPTION = "QUESTION/UPDATE_QUESTION_DESCRIPTION";
const UPDATE_ANSWER_PLACEHOLDER = "QUESTION/UPDATE_ANSWER_PLACEHOLDER";

// data === { questionId, value }
export const updateQuestionTitle = (data) => {
  return {
    type: UPDATE_QUESTION_TITLE,
    payload: data,
  };
};

// data === { questionId, value }
export const updateQuestionDescription = (data) => {
  return {
    type: UPDATE_QUESTION_DESCRIPTION,
    payload: data,
  };
};

// data === { questionId, value }
export const updateAnswerPlaceholder = (data) => {
  return {
    type: UPDATE_ANSWER_PLACEHOLDER,
    payload: data,
  };
};

export const addQuestion = () => {
  return {
    type: ADD_QUESTION,
  };
};

export const removeQuestion = (questionId) => {
  return {
    type: REMOVE_QUESTION,
    payload: questionId,
  };
};

export const addOption = (questionId) => {
  return {
    type: ADD_OPTION,
    payload: questionId,
  };
};

// ids === { questionId, optionId }
export const removeOption = (ids) => {
  return {
    type: REMOVE_OPTION,
    payload: ids,
  };
};

// data === { questionId, optionsId, updatedData }
export const updateOption = (data) => {
  return {
    type: UPDATE_OPTION,
    payload: data,
  };
};

// data === { questionId, optionType }
export const changeOptionType = (data) => {
  return {
    type: CHANGE_TYPE,
    payload: data,
  };
};

const createDefaultOption = (id = 0) => ({
  id,
  isChecked: false,
  text: "",
});

const createDefaultQuestion = (id = 0) => ({
  id,
  options: [createDefaultOption()],
  optionType: "radio",
  title: "",
  description: "",
  answerPlaceholder: "",
});

export const questionsState = {
  ids: [0],
  questions: {
    0: createDefaultQuestion(),
  },
};

const reducer = (state = questionsState, action) => {
  let targetQuestion;
  let lastId;
  switch (action.type) {
    case ADD_QUESTION:
      lastId = Math.max(...state.ids);
      return {
        ...state,
        ids: [...state.ids, lastId + 1],
        questions: {
          ...state.questions,
          [lastId + 1]: createDefaultQuestion(lastId + 1),
        },
      };
    case REMOVE_QUESTION:
      const result = { ...state.questions };
      delete result[action.payload];
      return {
        ...state,
        ids: state.ids.filter((id) => id !== action.payload),
        questions: result,
      };
    case UPDATE_QUESTION_TITLE:
      targetQuestion = { ...state.questions[action.payload.questionId] };
      targetQuestion.title = action.payload.value;
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: targetQuestion,
        },
      };
    case UPDATE_ANSWER_PLACEHOLDER:
      targetQuestion = { ...state.questions[action.payload.questionId] };
      targetQuestion.answerPlaceholder = action.payload.value;
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: targetQuestion,
        },
      };
    case UPDATE_QUESTION_DESCRIPTION:
      targetQuestion = { ...state.questions[action.payload.questionId] };
      targetQuestion.description = action.payload.value;
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: targetQuestion,
        },
      };
    case ADD_OPTION:
      targetQuestion = { ...state.questions[action.payload] };
      lastId = targetQuestion.options.reduce((prevId, option) => {
        return prevId > option.id ? prevId : option.id;
      }, 0);
      targetQuestion.options = [
        ...targetQuestion.options,
        createDefaultOption(lastId + 1),
      ];
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload]: targetQuestion,
        },
      };
    case REMOVE_OPTION:
      targetQuestion = { ...state.questions[action.payload.questionId] };
      targetQuestion.options = targetQuestion.options.filter(
        (option) => option.id !== action.payload.optionId
      );
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: targetQuestion,
        },
      };
    case UPDATE_OPTION:
      targetQuestion = { ...state.questions[action.payload.questionId] };
      targetQuestion.options = targetQuestion.options.map((option) => {
        if (option.id === action.payload.optionId) {
          return { ...option, ...action.payload.updatedData };
        }
        return option;
      });
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: targetQuestion,
        },
      };
    case CHANGE_TYPE:
      targetQuestion = { ...state.questions[action.payload.questionId] };
      targetQuestion.optionType = action.payload.optionType;
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.payload.questionId]: targetQuestion,
        },
      };
    default:
      return state;
  }
};

export default reducer;
