import React from "react";
import styled from "styled-components";

function SearchItems({ inputAutoSelect, item, setSearchInput }) {
  const clicked = () => {
    setSearchInput(item);
    inputAutoSelect();
  };

  return (
    <Container onClick={clicked}>
      <p>
        <b>{item}</b>
      </p>
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  padding-left: 5px;
  color: black;
  :hover {
    background-color: #ccc;
  }
`;
export default SearchItems;
