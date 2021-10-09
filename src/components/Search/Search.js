import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {useHistory} from 'react-router';

function Search({toggleSearch, myHeaders}) {

    const [roomClass, setRoomClass] = useState('');
    const [searchItem, setSearchItem] = useState('')
    
    const history = new useHistory();

    const pickChannel = () => {
        setRoomClass('channels')
    }
    const pickPeople = () => {
        setRoomClass('users')
    }
    const revertClass = () => {
        setRoomClass('')
    }

    const handleChange = (e) => {
        setSearchItem(e.target.value)
    }

    const search = (e) => {
    e.preventDefault();
    let x = searchItem;
    const condition = roomClass === 'users' || roomClass === ''

    fetch(`http://206.189.91.54//api/v1/${condition ? "users" : "channels"}`, {
            method:'GET',
            headers: myHeaders,
            redirect:"follow",
        }).then((response) => response.json())
        .then(result => {console.log(result);
        result.data.forEach((item)=>{
            if(condition  ? item.uid === x : item.name === x){
                console.log(item.id);
                history.push(`/room/${condition  ? 'messages' : 'channel'}/${item.id}`)
                toggleSearch();
            }
            return
            
        })})
    }
    useEffect(()=>{
        let searchInput = document.querySelector(`.searchInput`)
        const inputAutoSelect = () => {
            searchInput.select();
        }
        inputAutoSelect();
    },[roomClass])

    return (
        <Container>
            <SearchModal>
                <SearchDiv>
                    <p onClick={revertClass} style={roomClass ? pStyle : null}>{roomClass === "" ? <box-icon name="search-alt"/> : roomClass === "users" ? "People" : "Channel" }</p>
                    <Form onSubmit={search}>
                        <input className="searchInput" type="text" onChange={handleChange} style={inputStyle} />
                    </Form>
                    <CloseButton onClick={toggleSearch}><box-icon name='plus'></box-icon></CloseButton>
                </SearchDiv>
                <Line>
                   <LineText>I'm looking for...</LineText>
                </Line>
                <ButtonContainer>
                    <Button onClick={pickChannel}><box-icon name='spreadsheet'></box-icon>Channel</Button>
                    <Button onClick={pickPeople}><box-icon name='user'></box-icon>People</Button>
                </ButtonContainer>
            </SearchModal>
        </Container>
    )
}

const Container = styled.div`
    width:100vw;
    height:100vh;
    background-color:rgba(0,0,0,0.5);
    z-index:10;
    display:flex;
    justify-content:center;
    position:absolute;
    top:0;
`
const SearchModal = styled.div`
    width:700px;
    height:150px;
    border-radius:5px;
    background-color:white;
`
const SearchDiv = styled.div`
    display:flex;
    padding:5px;
`
const Form = styled.form`
    width:80%;
`
const pStyle = {
    width:"auto",
    padding:"0.25rem 0.75rem",
    backgroundColor:"#cdeaf4",
    color:"black",
    borderRadius:"5px",
    transform:"scale(1,.95)",
    cursor:"pointer"
}

const inputStyle={
    width:"100%",
    border:"none",
    paddingLeft:"0.5rem"
}

const Line = styled.div`
    border-top:1px solid #ccc;
`
const LineText = styled.div`
    padding-left:5px;
`
const ButtonContainer = styled.div`
    display:flex;
`
const Button = styled.button `
    margin-left:5px;
    margin-top:5px;
    padding:0.5rem 0.5rem;
    border-radius:5px;
    border:none;
    background-color:#cdeaf4;
    color:black;
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;

    :hover{
        background-color:#2e6296;
        color:white;
    }
`
const CloseButton = styled.button`
    width:50px;
    border:none;
    background-color:white;
    cursor:pointer;
    margin-right:0;
    margin-left:auto;
    transform:rotate(45deg);
`
export default Search
