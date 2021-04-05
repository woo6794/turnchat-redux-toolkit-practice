import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  removeQuestion,
  addOption,
  changeOptionType,
  updateQuestionTitle,
  updateQuestionDescription,
  updateAnswerPlaceholder,
} from "../store/question";
import Option from "./Option";
import { optionItems } from "../constants/option";

function Question({ id }) {
  const options = useSelector((state) => {
    return state.question.questions[id].options;
  });
  const optionType = useSelector((state) => {
    return state.question.questions[id].optionType;
  });
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");
  const [localPlaceholder, setLocalPlaceholder] = useState("");
  const [checkedOption, setCheckedOption] = useState(null);
  const dispatch = useDispatch();

  const onClickAdd = useCallback(() => {
    dispatch(addOption(id));
  }, [dispatch, id]);

  const handleRemoveQuestion = (id) => {
    dispatch(removeQuestion(id));
  };

  const onChangeTitle = (e) => {
    setLocalTitle(e.target.value);
    dispatch(updateQuestionTitle({ questionId: id, value: e.target.value }));
  };

  const onChangeDescription = (e) => {
    setLocalDescription(e.target.value);
    dispatch(
      updateQuestionDescription({ questionId: id, value: e.target.value })
    );
  };

  const onChangePlaceholder = (e) => {
    setLocalPlaceholder(e.target.value);
    dispatch(
      updateAnswerPlaceholder({ questionId: id, value: e.target.value })
    );
  };

  return (
    <Wrap>
      <DefaultTitle
        value={localTitle}
        onChange={onChangeTitle}
        placeholder="Question Text"
      />
      <InitialValue
        value={localDescription}
        onChange={onChangeDescription}
        placeholder="Input desc"
      />
      <InWrap>
        {optionType === "radio" || optionType === "checkbox" ? (
          <>
            {options.map((item, index) => {
              return (
                <Option
                  key={item.id}
                  item={item}
                  questionId={id}
                  checkedOption={checkedOption}
                  setCheckedOption={setCheckedOption}
                  isRemove={options.length > 1}
                />
              );
            })}
          </>
        ) : (
          <Answer value={localPlaceholder} onChange={onChangePlaceholder} />
        )}
      </InWrap>
      <RemoveBtn
        onClick={() => {
          handleRemoveQuestion(id);
        }}
      >
        Remove
      </RemoveBtn>
      <SelBtn
        defaultValue="radio"
        onChange={(e) =>
          dispatch(
            changeOptionType({
              questionId: id,
              optionType: optionItems[e.target.selectedIndex].type,
            })
          )
        }
      >
        {optionItems.map((option) => (
          <option key={option.type} type={option.type}>
            {option.label}
          </option>
        ))}
      </SelBtn>
      {optionType !== "textarea" && <AddBtn onClick={onClickAdd}>Add</AddBtn>}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background: #ebecf0;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
    3px 3px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 6px;
  margin-top: 30px;
`;

const DefaultTitle = styled.input`
  background-color: #ebecf0;
  border: none;
  font-size: 20px;
  margin-bottom: 10px;
  color: #2e444e;
  ::placeholder {
    color: #2e444e;
  }
  &:focus {
    outline: none;
  }
`;

const InitialValue = styled.input`
  background-color: #ebecf0;
  border: none;
  margin-bottom: 10px;
  color: #2e444e;
  ::placeholder {
    color: #2e444e;
  }
  &:focus {
    outline: none;
  }
`;

const Answer = styled.textarea`
  width: 550px;
  height: 45px;
  resize: none;
  outline: none;
`;

const InWrap = styled.div``;

const RemoveBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  border-radius: 6px;
  color: #ae1100;
  outline: none;
  font-size: 15px;
  padding: 5px;
  margin-bottom: 10px;
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

const SelBtn = styled.select`
  margin-bottom: 10px;
  position: absolute;
  top: 60px;
  right: 20px;
  outline: none;
`;

const AddBtn = styled.button`
  margin-bottom: 10px;
  position: absolute;
  bottom: 0px;
  right: 20px;
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

export default Question;
