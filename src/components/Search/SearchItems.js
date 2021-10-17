import React from "react";
import styled from "styled-components";

function SearchItems({ inputAutoSelect, item, setSearchInput, select }) {
  const clicked = () => {
    setSearchInput(item);
    inputAutoSelect();
  };

  return (
    <Container
      style={{ backgroundColor: item === select ? "#ccc" : "white" }}
      onClick={clicked}
    >
      <Item>
        <b>{item}</b>
      </Item>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;

  color: black;
  :hover {
    background-color: #ccc;
  }
`;

const Item = styled.div`
  width: 100%;
  padding-left: 5px;
  :hover {
    background-color: #ccc;
  }
`;

export default SearchItems;
