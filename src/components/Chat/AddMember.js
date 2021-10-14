import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchResults from "../Search/SearchResults";

const AddMember = ({
  open,
  onClose,
  onClick,
  onSubmit,
  usersList,
  setMemberEmail,
}) => {
  const [searchItem, setSearchItem] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const searchUser = () => {
    if (searchInput === "") {
      return;
    } else {
      const y = [];
      usersList.forEach((item) => {
        if (item.uid.includes(searchInput)) {
          y.push(item.uid);
        }
      });
      setSearchItem(y);
    }
  };

  const inputAutoSelect = () => {
    let searchInput = document.querySelector(`.searchInput`);
    searchInput.select();
  };

  useEffect(() => {
    searchUser();
    setMemberEmail(searchInput);
  }, [searchInput]);

  useEffect(() => {
    setSearchInput("");
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <Container>
      <Modal>
        <Header>
          <h3>Add Member</h3>
          <CloseIcon onClick={onClose}>
            <box-icon name="x" color="#686868"></box-icon>
          </CloseIcon>
        </Header>
        <form onSubmit={(e) => onSubmit(e)}>
          <InputForm>
            <input
              className="searchInput"
              type="text"
              placeholder="Enter their email"
              name=""
              id=""
              value={searchInput}
              onChange={handleChange}
            />
          </InputForm>
          {searchInput === "" ? null : (
            <SearchResults
              inputAutoSelect={inputAutoSelect}
              setSearchInput={setSearchInput}
              searchItem={searchItem}
            />
          )}

          <AddButton>
            <button onClick={onClick}>
              <b>Add</b>
            </button>
          </AddButton>
        </form>
      </Modal>
    </Container>
  );
};

export default AddMember;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 25;
`;

const Modal = styled.div`
  position: fixed;
  background: white;
  width: 100%;
  max-width: 400px;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0px 0px 25px 10px rgba(0, 0, 0, 0.2);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1d1c1d;
  padding-left: 3px;
  padding-right: 3px;
`;
const CloseIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 35px;
  height: 35px;

  :hover {
    background: #f6f6f6;
  }
`;
const InputForm = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  padding-left: 3px;
  height: 60px;
  width: 100%;

  input[type="text"] {
    height: 40px;
    width: 100%;
    max-width: 340px;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #bbbabb;
  }
  input[type="text"]:hover {
    border: 1px solid #a8a7a8;
  }
  input[type="text"]:focus {
    border: 1px solid #1264a3;
    box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  }
`;
const AddButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 6px;
  button {
    width: 80px;
    height: 40px;
    outline: none;
    border: none;
    color: #ffffff;
    border-radius: 5px;
    background: #007a5a;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;

    :active {
      transform: scale(0.99);
    }
  }
`;
