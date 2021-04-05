import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Wrap>
      <div>Survey Project</div>
    </Wrap>
  );
}

const Wrap = styled.div`
  text-align: center;
  color: #422727;
  width: 100%;
  font-size: 50px;
  font-weight: 700;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

export default Header;
