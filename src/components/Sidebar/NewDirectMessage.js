import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ChatInput from '../Chat/ChatInput';

const NewDirectMessage = ({ url, myHeaders, usersList, getDMs }) => {
	const history = useHistory();

	const [message, setMessage] = useState('');
	const [userEmail, setUserEmail] = useState('');

	const inputUserEmail = (e) => {
		setUserEmail(e.target.value);
	};

	const submitUserEmail = (e) => {
		e.preventDefault();
	};

	const inputMessage = (e) => {
		console.log(usersList);
		setMessage(e.target.value);
	};

	const sendMessage = (e) => {
		e.preventDefault();

		if (message === '') {
			return;
		} else {
			let user = usersList.find((user) => user.uid === userEmail);
			if (user) {
				console.log('USER FOUND: ', user);
				console.log('SEND THIS MESSAGE: ', message);

				localStorage.setItem('newDM', JSON.stringify(user));

				fetch(`${url}/messages`, {
					method: 'POST',
					body: JSON.stringify({
						receiver_id: user.id,
						receiver_class: 'User',
						body: message,
					}),
					headers: myHeaders,
					redirect: 'follow',
				})
					.then((res) => {
						if (res.status === 200) {
							setMessage('');
							getDMs();
						}
					})
					.catch((err) => console.log(err));

				history.push(`/room/messages/${user.id}`);
			} else {
				alert('SORRY USER NOT FOUND');
			}
		}
	};

	return (
		<Container>
			<Header>
				<NewMessageWrapper>
					<NewMessage>New Message</NewMessage>
				</NewMessageWrapper>
			</Header>
			<InputContainer>
				<form action="" onSubmit={submitUserEmail}>
					<span>To:</span>
					<input
						type="text"
						placeholder="Enter user email"
						value={userEmail}
						onChange={inputUserEmail}
					/>
				</form>
			</InputContainer>
			<MessageContainer></MessageContainer>
			<ChatInput
				message={message}
				onSubmit={sendMessage}
				onClick={sendMessage}
				onChange={inputMessage}
			/>
		</Container>
	);
};

export default NewDirectMessage;

const Container = styled.div`
	display: grid;
	grid-template-rows: 50px 50px auto min-content;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom: 1px solid #d3d3d3;
`;

const NewMessageWrapper = styled.div``;

const NewMessage = styled.div`
	font-weight: 700;
`;

const MessageContainer = styled.div`
	height: auto;
	overflow-y: hidden;
	:hover {
		overflow-y: auto;
	}
	::-webkit-scrollbar {
		width: 10px;
	}
	::-webkit-scrollbar-thumb {
		background: rgb(188, 171, 188);
		border-radius: 10px;
	}
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom: 1px solid #d3d3d3;

	form {
		display: flex;
		align-items: center;
		width: 100%;
	}

	span {
		margin-right: 10px;
	}

	input[type='text'] {
		font-size: 16px;
		height: 40px;
		width: 100%;
		border: none;
	}
`;