import React from "react";
import SearchItems from "./SearchItems";
import styled from "styled-components";

function SearchResults({
  select,
  inputAutoSelect,
  searchItem,
  setSearchInput,
  searchInput,
  submit,
}) {
  return (
    <Container>
      {searchItem.map((item) => (
        <SearchItems
          submit={submit}
          searchInput={searchInput}
          key={item}
          setSearchInput={setSearchInput}
          item={item}
          inputAutoSelect={inputAutoSelect}
          select={select}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  max-height: 100px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }
`;

export default SearchResults;
