import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { removeOption, updateOption } from "../store/question";

function Option({
  questionId,
  item,
  isRemove,
  checkedOption,
  setCheckedOption,
}) {
  const dispatch = useDispatch();
  const { id } = item;
  const [localText, setLocalText] = useState("");
  const [localIsChecked, setLocalIsChecked] = useState(false);
  const prevType = useRef();

  const optionType = useSelector((state) => {
    return state.question.questions[questionId].optionType;
  });

  const handleUpdateOption = useCallback(
    (data) => {
      dispatch(
        updateOption({ questionId, optionId: data.id, updatedData: data })
      );
    },
    [dispatch, questionId]
  );

  useEffect(() => {
    if (prevType.current !== optionType) {
      prevType.current = optionType;
      setLocalIsChecked(false);
      handleUpdateOption({ id, isChecked: false });
      if (item.text) {
        setLocalText(item.text);
      }
    }
  }, [optionType, id, item.text, handleUpdateOption]);

  useEffect(() => {
    if (optionType === "radio") {
      if (id !== checkedOption && localIsChecked) {
        console.log("111");
        setLocalIsChecked(false);
        handleUpdateOption({ id, isChecked: false });
      }
    }
  }, [optionType, id, checkedOption, localIsChecked, handleUpdateOption]);

  const onClickRemove = useCallback(
    (optionId) => {
      dispatch(removeOption({ questionId, optionId }));
    },
    [dispatch, questionId]
  );
  const onChangeIsChecked = (e) => {
    handleUpdateOption({ id, isChecked: e.target.checked });
    setLocalIsChecked(e.target.checked);
    setCheckedOption(id);
  };
  const onChangeText = (e) => {
    handleUpdateOption({ id, text: e.target.value });
    setLocalText(e.target.value);
  };

  return (
    <InputWrap>
      <QuestionButton
        type={optionType}
        size="50"
        checked={localIsChecked}
        onChange={onChangeIsChecked}
      />
      <QuestionInput value={localText} onChange={onChangeText} />
      {isRemove && <DelBtn onClick={() => onClickRemove(id)}>Delete</DelBtn>}
    </InputWrap>
  );
}

const InputWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const QuestionButton = styled.input`
  width: 20px;
  height: 20px;
  margin: 0 5px 0 0;
`;

const QuestionInput = styled.input`
  outline: none;
  margin-right: 15px;
`;

const DelBtn = styled.button`
  border: none;
  border-radius: 6px;
  outline: none;
  color: #ae1100;
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

export default Option;
