import React from 'react';
import styled from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

function Header({ name }) {
	return (
		<Container>
			<Main>
				<AccessTimeIcon />
				<SearchContainer>
					<Search>
						<input type='text' placeholder='Search...' />
					</Search>
				</SearchContainer>
				<HelpOutlineIcon />
			</Main>
			<UserContainer>
				<Name>{name}</Name>
				<UserImage>
					<img src='https://i.imgur.com/6VBx3io.png' alt='display user' />
				</UserImage>
			</UserContainer>
		</Container>
	);
}

export default Header;

const Container = styled.div`
	background: #350d36;
	color: white;
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
	box-shadow: 0 1px 0 0 rgb(255 255 255 / 10%);
`;

const Main = styled.div`
	display: flex;
	margin-right: 16px;
	margin-left: 16px;
`;

const SearchContainer = styled.div`
	min-width: 400px;
	margin-left: 16px;
	margin-right: 16px;
`;

const Search = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	border-radius: 6px;
	box-shadow: inset 0 0 0 1px rgb(104 74 104);

	input {
		background: transparent;
		width: 90%;
		border: none;
		padding-top: 4px;
		padding-bottom: 4px;
		padding-left: 8px;
		padding-right: 8px;
		color: white;
	}

	input: focus {
		outline: none;
	}
`;

const UserContainer = styled.div`
	display: flex;
	position: absolute;
	right: 0;
	align-items: center;
	padding-right: 16px;
`;

const Name = styled.div`
	padding-right: 16px;
`;

const UserImage = styled.div`
	width: 28px;
	height: 28px;
	border: 2px solid white;
	border-radius: 3px;

	img {
		width: 100%;
	}
`;
