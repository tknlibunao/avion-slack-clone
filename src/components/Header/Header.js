import React from 'react'
import styled from 'styled-components'
import 'boxicons'
import userDefaultImage from '../../assets/userDefaultImage.png'

const Header = ({name}) => {
    return (
        <Container>
            <Menu>
                <box-icon name='menu' color='#d7cfd7' ></box-icon>
            </Menu>
            <Main> 
                <History>
                    <box-icon name='left-arrow-alt' color='#d7cfd7' ></box-icon>
                    <box-icon name='right-arrow-alt' color='#d7cfd7' ></box-icon>
                    <box-icon name='time' color='#d7cfd7' ></box-icon>
                </History>
                <SearchContainer>
                    <Search>
                        <input type="text" placeholder='Search Avion School' name='' id='' />
                    </Search>
                    <SearchIcon>
                        <box-icon name='search' size='20px' color='#d7cfd7' ></box-icon>
                    </SearchIcon>
                </SearchContainer>
                <HelpIcon>
                    <box-icon name='help-circle' color='#d7cfd7' ></box-icon>
                </HelpIcon>
            </Main>
            <UserContainer>
                <Name>{name}</Name>
                <UserImage>
                    <img src={userDefaultImage} alt="User" />
                </UserImage>
            </UserContainer>
            
        </Container>
            
    )
}

export default Header

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--header-font-color);
    background-color: var(--header-color);
    box-shadow: 0 1px 0 0 rgb( 255 255 255 / 10%);
    z-index: 5;
`

const Main = styled.div`
    display: flex;
    margin-right: 15px;
    margin-left: 15px;
`

const Menu = styled.div`
    display: flex;
    margin-left: 10px;
    align-items: center;
    cursor: pointer;
`

const History = styled.div`
    display: flex;
    width: 100px;
    justify-content: space-evenly;
    align-items: center;
`

const SearchContainer = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    min-width: 600px;
    margin-left: 10px;
    margin-right: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    border-radius: 5px;
`

const Search = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    input {
        width: 90%;
        padding-left: 6px;
        padding-right: 6px;
        background: transparent;
        border: none;
        color: var(--search-color) !important;
        cursor: pointer;
    }
`

const SearchIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const HelpIcon = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
`

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    padding-right: 15px;
    cursor: pointer;
`

const Name = styled.div`
	padding-right: 16px;
`;

const UserImage = styled.div`
    width: 28px;
    height: 28px;

    img {
        width: 100%;
        border-radius: 5px;
    }
`
