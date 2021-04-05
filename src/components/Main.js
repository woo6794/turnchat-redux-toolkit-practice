import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Title from "./Title";
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../store/question";

function Main() {
  const dispatch = useDispatch();
  const surveyState = useSelector((state) => state.survey);
  const questionState = useSelector((state) => state.question);
  const questionIds = useSelector((state) => state.question.ids);
  const onSubmit = () => {
    const questionsStr = JSON.stringify(questionState.questions);
    const _questions = JSON.parse(questionsStr);
    questionIds.forEach((id) => {
      if (_questions[id].optionType === "textarea") {
        delete _questions[id].options;
      } else {
        delete _questions[id].answerPlaceholder;
      }
    });
    console.log(
      "survey : ",
      JSON.stringify({ ...surveyState, ..._questions }, null, 4)
    );
  };
  return (
    <Wrap>
      <Header />
      <Body>
        <BodyWrap>
          <Title />
          {questionIds.map((id) => (
            <Question key={id} id={id} />
          ))}
        </BodyWrap>
        <QuestionAddBtnWrap>
          <QuestionAddBtn onClick={() => dispatch(addQuestion())}>
            Question Add
          </QuestionAddBtn>
        </QuestionAddBtnWrap>
        <SubmitWrap>
          <SubmitBtn onClick={onSubmit}>Submit</SubmitBtn>
        </SubmitWrap>
      </Body>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Body = styled.div`
  width: 900px;
  margin: 0 auto;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const QuestionAddBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const QuestionAddBtn = styled.button`
  border: none;
  border-radius: 6px;
  color: #787fdc;
  outline: none;
  background-color: #ebecf0;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  padding: 5px 20px;
  &:hover {
    box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px #babecc;
  }

  &:active {
    box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff;
  }
`;

const SubmitWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SubmitBtn = styled.button`
  border: none;
  border-radius: 6px;
  outline: none;
  font-size: 30px;
  padding: 10px 20px;
  margin-bottom: 10px;
  color: #606060;
  outline: none;
  background-color: #ebecf0;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px #babecc;
  }

  &:active {
    box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff;
  }
`;
export default Main;
