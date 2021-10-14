import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ChatInput from '../Chat/ChatInput';
import SearchResults from '../Search/SearchResults';

const NewDirectMessage = ({
	url,
	myHeaders,
	usersList,
	getDMs,
	channelsList,
}) => {
	const history = useHistory();

	const [message, setMessage] = useState('');
	const [receiverValue, setReceiverValue] = useState('');
	const [searchReceiver, setSearchReceiver] = useState('');
	const [searchItem, setSearchItem] = useState([]);
	const [searchPool, setSearchPool] = useState([]);
	const [confirm, setConfirm] = useState(false);

	const sortList = (list) => {
		return list.sort(function (a, b) {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		});
	};

	const getSearchPool = () => {
		let p = [];
		usersList.forEach((user) => {
			p.push(user.uid);
		});
		channelsList.forEach((channel) => {
			p.push(channel.name);
		});

		setSearchPool(sortList(p));
	};

	// const onKeyPress = (e) => {
	// 	if (e.key === 'Tab' && searchItem.length !== 0) {
	// 		e.preventDefault();
	// 		setSearchReceiver(searchItem[0]);
	// 	}
	// };

	const inputAutoSelect = () => {
		let searchReceiver = document.querySelector(`.searchReceiver`);
		searchReceiver.select();
	};

	const search = () => {
		let y = [];

		// let searchPool = [];

		// usersList.forEach((user) => {
		// 	searchPool.push(user.uid);
		// });
		// channelsList.forEach((channel) => {
		// 	searchPool.push(channel.name);
		// });

		if (searchReceiver === '') setSearchItem([]);
		else {
			searchPool.forEach((item) => {
				if (item.includes(searchReceiver)) {
					y.push(item);
				}
			});
			if (y.length === 0) setSearchItem(['User or channel not found']);
			else setSearchItem(y);
		}

		if (searchItem[0] === searchReceiver) setSearchItem([]);
	};

	const inputReceiver = (e) => {
		setConfirm(false);
		setSearchReceiver(e.target.value);
	};

	const submitReceiver = (e) => {
		e.preventDefault();
		let searchPool = [];

		usersList.forEach((user) => {
			searchPool.push(user.uid);
		});
		channelsList.forEach((channel) => {
			searchPool.push(channel.name);
		});

		let found = searchPool.find((item) => item === searchReceiver);
		if (searchItem.length === 0 || found) {
			setSearchItem([]);
			setReceiverValue(searchReceiver);
			setConfirm(true);
		}
	};

	const inputMessage = (e) => {
		setMessage(e.target.value);
	};

	const sendMessage = (e) => {
		e.preventDefault();

		if (message === '') {
			return;
		} else {
			let user = usersList.find((user) => user.uid === searchReceiver);
			let channel = channelsList.find(
				(channel) => channel.name === searchReceiver
			);

			if (user) {
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
							// history.push(`/room/messages/${user.id}`);
						}
					})
					.catch((err) => console.log(err));

				history.push(`/room/messages/${user.id}`);
			}
			if (channel) {
				fetch(`${url}/messages`, {
					method: 'POST',
					body: JSON.stringify({
						receiver_id: channel.id,
						receiver_class: 'Channel',
						body: message,
					}),
					headers: myHeaders,
					redirect: 'follow',
				})
					.then((res) => {
						if (res.status === 200) {
							setMessage('');
						}
					})
					.catch((err) => console.log(err));

				history.push(`/room/channel/${channel.id}`);
			}
		}
	};

	useEffect(() => {
		search();
	}, [searchReceiver]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getSearchPool();
	}, [usersList, channelsList]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container>
			<Header>
				<NewMessageWrapper>
					<NewMessage>New Message</NewMessage>
				</NewMessageWrapper>
			</Header>
			<InputContainer>
				<form action="" onSubmit={submitReceiver}>
					<span>To:</span>
					<input
						className="searchReceiver"
						type="text"
						placeholder="Enter user email or channel name"
						value={searchReceiver}
						onChange={inputReceiver}
						// onKeyDown={onKeyPress}
					/>
				</form>
				{confirm ? <Recepient>{receiverValue}</Recepient> : null}
			</InputContainer>
			<Line>
				{searchItem !== '' ? (
					<SearchResults
						searchItem={searchItem}
						setSearchInput={setSearchReceiver}
						searchInput={searchReceiver}
						submit={submitReceiver}
						inputAutoSelect={inputAutoSelect}
					/>
				) : null}
			</Line>
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

const Line = styled.div`
	width: 60%;
	background-color: grey;
	position: absolute;
	top: 138px;
	left: 327px;
	z-index: 1;
`;

const Recepient = styled.div`
	background-color: #cdeaf4;
	color: black;
	z-index: 2;
	position: absolute;
	top: 101px;
	left: 327px;
	border-radius: 2px;
	padding-left: 5px;
	padding-right: 5px;
	padding-top: 2px;
	padding-bottom: 2px;
	box-shadow: 1px 1px 3px #121212;
`;
// const MembersWrapper = styled.div`

// `
// const Member = styled.div`

// `
