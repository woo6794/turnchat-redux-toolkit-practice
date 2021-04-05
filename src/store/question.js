import { createSlice } from "@reduxjs/toolkit";

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

export const initialState = {
  ids: [0],
  questions: {
    0: createDefaultQuestion(),
  },
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    updateQuestionTitle(state, action) {
      state.questions[action.payload.questionId].title = action.payload.value;
    },
    updateQuestionDescription(state, action) {
      state.questions[action.payload.questionId].description =
        action.payload.value;
    },
    updateAnswerPlaceholder(state, action) {
      state.questions[action.payload.questionId].answerPlaceholder =
        action.payload.value;
    },
    addQuestion(state) {
      const lastId = Math.max(...state.ids);
      state.ids.push(lastId + 1);
      state.questions[lastId + 1] = createDefaultQuestion(lastId + 1);
    },
    removeQuestion(state, action) {
      delete state.questions[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    addOption(state, action) {
      const targetQuestion = state.questions[action.payload];
      const lastId = targetQuestion.options.reduce((prevId, option) => {
        return prevId > option.id ? prevId : option.id;
      }, 0);
      targetQuestion.options.push(createDefaultOption(lastId + 1));
    },
    removeOption(state, action) {
      const targetQuestion = state.questions[action.payload.questionId];
      targetQuestion.options = targetQuestion.options.filter(
        (option) => option.id !== action.payload.optionId
      );
    },
    updateOption(state, action) {
      const targetQuestion = state.questions[action.payload.questionId];
      targetQuestion.options = targetQuestion.options.map((option) => {
        if (option.id === action.payload.optionId) {
          return { ...option, ...action.payload.updatedData };
        }
        return option;
      });
    },
    changeOptionType(state, action) {
      const targetQuestion = state.questions[action.payload.questionId];
      targetQuestion.optionType = action.payload.optionType;
    },
  },
});

export const {
  updateQuestionTitle,
  updateQuestionDescription,
  updateAnswerPlaceholder,
  addQuestion,
  removeQuestion,
  addOption,
  removeOption,
  updateOption,
  changeOptionType,
} = questionSlice.actions;
export default questionSlice.reducer;
