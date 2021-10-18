import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import SearchResults from "./SearchResults";

function Search({ toggleSearch, myHeaders, usersList, channelsList }) {
  const [roomClass, setRoomClass] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchItem, setSearchItem] = useState([]);
  const [select, setSelect] = useState("");
  let [c, setC] = useState(-1);

  const history = new useHistory();

  const pickChannel = () => {
    setRoomClass("channels");
  };
  const pickPeople = () => {
    setRoomClass("users");
  };
  const revertClass = () => {
    setRoomClass("");
  };
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const onKeyPress = (e) => {
    if (searchInput === "") {
      setC(-1);
      return;
    } else {
      if (e.key === "Tab") {
        setSearchInput(searchItem[c]);
        setSelect("");
      } else if (e.key === "ArrowDown" && c <= searchItem.length) {
        setC((c += 1));
        setSelect(searchItem[c]);
      } else if (e.key === "ArrowUp" && c !== 0) {
        setC((c -= 1));
        setSelect(searchItem[c]);
      } else if (c === 0 || c > searchItem.length) {
        return;
      }
    }
  };

  // useEffect(() => {}, [c]);

  ///// ----- FUNCTION FOR LIST SEARCH ON TYPE ----- /////
  const condition = roomClass === "users" || roomClass === "";

  const search = () => {
    let y = [];
    if (searchInput === "") {
      setSearchItem([]);
      return;
    } else {
      condition
        ? usersList.forEach((item) => {
            if (item.uid.includes(searchInput)) {
              y.push(item.uid);
            }
          })
        : channelsList.forEach((item) => {
            if (item.name.includes(searchInput)) {
              y.push(item.name);
            }
          });
    }
    setSearchItem(y);
  };

  ///// ----- FUNCTION FOR SUBMIT SEARCH ----- /////
  const submit = (e) => {
    e.preventDefault();
    fetch(`http://206.189.91.54//api/v1/${condition ? "users" : "channels"}`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result.data.forEach((item) => {
          if (
            condition ? item.uid === searchInput : item.name === searchInput
          ) {
            console.log(item.id);
            history.push(
              `/room/${condition ? "messages" : "channel"}/${item.id}`
            );
            toggleSearch();
          }
          return;
        });
      });
  };

  const inputAutoSelect = () => {
    let searchInput = document.querySelector(`.searchInput`);
    searchInput.select();
  };
  ///// ----- useEffects ----- //////
  useEffect(() => {
    search();
  }, [searchInput, roomClass]);

  useEffect(() => {
    inputAutoSelect();
  }, [roomClass]);

  ///// ----- RENDER ----- /////
  return (
    <Container>
      <SearchModal>
        <SearchDiv>
          <p onClick={revertClass} style={roomClass ? pStyle : null}>
            {roomClass === "" ? (
              <box-icon name="search-alt" />
            ) : roomClass === "users" ? (
              "People"
            ) : (
              "Channel"
            )}
          </p>
          <Form onSubmit={submit}>
            <input
              className="searchInput"
              value={searchInput}
              type="text"
              onKeyDown={onKeyPress}
              onChange={handleChange}
              style={inputStyle}
              submit={submit}
            />
          </Form>
          <button style={{ opacity: "0" }} onClick={submit} />
          <CloseButton onClick={toggleSearch}>
            <box-icon name="plus"></box-icon>
          </CloseButton>
        </SearchDiv>
        <Line>
          {searchItem !== "" ? (
            <SearchResults
              select={select}
              searchItem={searchItem}
              setSearchInput={setSearchInput}
              searchInput={searchInput}
              submit={submit}
              inputAutoSelect={inputAutoSelect}
            />
          ) : null}
          <LineText>I'm looking for...</LineText>
        </Line>
        <ButtonContainer>
          <Button onClick={pickChannel}>
            <box-icon name="spreadsheet"></box-icon>Channel
          </Button>
          <Button onClick={pickPeople}>
            <box-icon name="user"></box-icon>People
          </Button>
        </ButtonContainer>
      </SearchModal>
    </Container>
  );
}

///// ----- STYLES ----- /////
const Container = styled.div`
  width: 100vw;
  height: auto;
  z-index: 10;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  color: black;
`;
const SearchModal = styled.div`
  width: 700px;
  height: auto;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #ccc;
  padding-bottom: 15px;
`;
const SearchDiv = styled.div`
  display: flex;
  padding: 5px;
`;
const Form = styled.form`
  width: 80%;
`;
const pStyle = {
  width: "auto",
  padding: "0.25rem 0.75rem",
  backgroundColor: "#cdeaf4",
  color: "black",
  borderRadius: "5px",
  transform: "scale(1,.95)",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  border: "none",
  paddingLeft: "0.5rem",
};

const Line = styled.div`
  border-top: 1px solid #ccc;
`;
const LineText = styled.div`
  padding-left: 5px;
`;
const ButtonContainer = styled.div`
  display: flex;
`;
const Button = styled.button`
  margin-left: 5px;
  margin-top: 5px;
  padding: 0.5rem 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #cdeaf4;
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #2e6296;
    color: white;
  }
`;
const CloseButton = styled.button`
  width: 50px;
  border: none;
  background-color: white;
  cursor: pointer;
  margin-right: 0;
  margin-left: auto;
  transform: rotate(45deg);
  outline: none;
`;
export default Search;
