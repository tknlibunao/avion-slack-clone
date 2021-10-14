import React from "react";
import styled from "styled-components";

function SearchItems({ inputAutoSelect, item, setSearchInput, submit }) {
  const clicked = (e) => {
    setSearchInput(item);
    inputAutoSelect();
    submit(e);
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

  :hover {
    background-color: #ccc;
  }
`;
export default SearchItems;
