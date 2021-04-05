import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateTitle, updateDescription } from "../store/survey";

function Title() {
  const dispatch = useDispatch();
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");

  const onChangeTitle = (e) => {
    setLocalTitle(e.target.value);
    dispatch(updateTitle(e.target.value));
  };

  const onChangeDescription = (e) => {
    setLocalDescription(e.target.value);
    dispatch(updateDescription(e.target.value));
  };

  return (
    <>
      <Wrap>
        <DefaultTitle
          value={localTitle}
          onChange={onChangeTitle}
          placeholder="Default Title"
        />
        <InitialValue
          value={localDescription}
          onChange={onChangeDescription}
          placeholder="Initial Value"
        />
      </Wrap>
      <hr size="1" width="900px" color="#e0e0e0" />
    </>
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
  margin-bottom: 20px;
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

export default Title;
