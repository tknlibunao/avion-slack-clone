import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import AddMember from './AddMember';
import ShowMembers from './ShowMembers';

const Chat = ({
	channelsList,
	DMList,
	myHeaders,
	url,
	usersList,
	getDMs,
	userAuth,
	getAllChannels,
	socket,
	checkMessage,
	setCheckMessage,
}) => {
	/* ROUTE PARAMETERS */
	let { path, id } = useParams();

	/* NEW INPUTS */
	const [message, setMessage] = useState('');
	const [newMemberEmail, setMemberEmail] = useState('');

	/* DISPLAY PARAMETERS */
	const [display, setDisplay] = useState({ id });
	const [messageList, setMessageList] = useState([]);
	const [channelMembers, setChannelMembers] = useState([]);
	const [membersList, setMembersList] = useState([]);

	/* MODAL FLAGS */
	const [isOpenAddMember, setOpenAddMember] = useState(false);
	const [isOpenShowMembers, setIsOpenShowMembers] = useState(false);

	/* TRIGGERS */
	const [newMember, setNewMember] = useState(0);
	const [channelCount, setChannelCount] = useState(0);

	/* REFS */
	const scrollToBottom = useRef(null);
	// const socket = useRef();

	/* CHAT DISPLAY FUNCTIONS */
	const getChatDisplay = () => {
		if (path === 'channel') {
			channelsList.forEach((item) => {
				if (Number(id) === Number(item.id)) {
					setDisplay(item);
				}
			});
		} else if (path === 'messages') {
			let result = DMList.find((item) => Number(id) === Number(item.id));
			if (result) setDisplay(result);
			else {
				let user = usersList.find((item) => Number(id) === Number(item.id));
				if (user) localStorage.setItem('newDM', JSON.stringify(user));
				else user = JSON.parse(localStorage.getItem('newDM'));
				setDisplay({
					id: '',
					uid: user.uid,
					created_at: '',
					updated_at: '',
				});
			}
		}
	};

	/* CHANNEL FUNCTIONS */
	const getChannelDetails = () => {
		if (path === 'messages') return;
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		fetch(`${url}/channels/${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.channel_members.forEach((item) => {
					updatedList.push(item.user_id);
				});
				setChannelMembers(updatedList);
			})
			.catch((error) => console.log('error', error));
	};

	const inputMemberId = (e) => {
		setMemberEmail(e.target.value);
	};

	const closeAddMember = () => {
		setMemberEmail('');
		setOpenAddMember(false);
	};

	const displayMember = () => {
		setIsOpenShowMembers(true);
		let members = [];
		channelMembers.forEach((member) => {
			let user = usersList.find((user) => user.id === member);
			members.push(user.uid);
			setMembersList(members);
		});
	};

	const addMember = (e) => {
		e.preventDefault();

		var user = usersList.find((user) => user.uid === newMemberEmail);
		if (user) var newMemberId = user.id;

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				id: id,
				member_id: newMemberId,
			}),
			redirect: 'follow',
		};

		fetch(`${url}/channel/add_member`, requestOptions)
			.then((response) => response.json())
			// .then((result) => console.log(result))
			.catch((error) => console.log('error', error));

		socket.current.emit('addMember', {
			addedBy: userAuth,
			member: newMemberId,
		});

		setNewMember((newMember) => newMember + 1);
		getChannelDetails();
		setMemberEmail('');
		if (newMemberEmail !== '') setOpenAddMember(false);
	};

	/* MESSAGES FUNCTIONS */
	const inputMessage = (e) => {
		setMessage(e.target.value);
	};

	const sendMessage = (e) => {
		e.preventDefault();

		if (message === '') {
			return;
		} else {
			let receiver_class = '';
			if (path === 'channel') receiver_class = 'Channel';
			if (path === 'messages') receiver_class = 'User';

			socket.current.emit('sendMessage', {
				senderId: userAuth,
				receiverId: id,
				text: message,
			});

			var requestOptions = {
				method: 'POST',
				body: JSON.stringify({
					receiver_id: id,
					receiver_class: receiver_class,
					body: message,
				}),
				headers: myHeaders,
				redirect: 'follow',
			};

			fetch(`${url}/messages`, requestOptions)
				.then((res) => {
					if (res.status === 200) {
						setMessage('');
						getDMs();
					}
					retrieveMessage(receiver_class);
				})
				.catch((err) => console.log(err));
		}
	};

	const retrieveMessage = (receiverClass) => {
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		fetch(
			`${url}/messages?receiver_class=${receiverClass}&receiver_id=${id}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.forEach((item) => {
					updatedList.push({
						body: item.body,
						created_at: new Date(item.created_at),
						receiver: item.receiver.uid,
						sender: item.sender.uid,
					});
				});
				updatedList.forEach((item) => {
					item.created_at = item.created_at.toUTCString();
				});

				// let user = usersList.find(
				// 	(item) => item.uid === localStorage.getItem('uid')
				// );

				// if (path === 'messages' && String(id) === String(user.id)) {
				// 	console.log(updatedList);
				// 	let ownDM = [];
				// 	for (let i = 0; i < updatedList.length; i++) {
				// 		if (i % 2 === 0) ownDM.push(updatedList[i]);
				// 	}
				// 	console.log(ownDM);
				// 	return setMessageList(ownDM);
				// }

				setMessageList(updatedList);
			})
			.catch((error) => console.log('error', error));
	};

	/* USE EFFECTS */
	useEffect(() => {
		getChatDisplay();
	}, [channelsList, DMList, path, id]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getChannelDetails();
	}, [path, id, newMember]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		console.log(id);
		if (path === 'channel') return retrieveMessage('Channel');
		if (path === 'messages') return retrieveMessage('User');
	}, [path, id, checkMessage]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (scrollToBottom) {
			scrollToBottom.current.addEventListener('DOMNodeInserted', (event) => {
				const { currentTarget: target } = event;
				target.scroll({ top: target.scrollHeight });
			});
		}
	}, []);

	useEffect(() => {
		// socket.current = io('ws://localhost:8900');
		socket.current = io('https://slack-app-react.herokuapp.com/');

		//	update messages
		socket.current.on('getMessage', (data) => {
			console.log('RECEIVED: ', data);
			console.log(data.senderId.id, path, id);
			setCheckMessage((prev) => prev + 1);
			getDMs();
		});

		// update channels
		socket.current.on('checkChannel', (data) => {
			console.log('CHANNEL UPDATE: ', data);
			setNewMember((prev) => prev + 1);
			getChannelDetails();
			setChannelCount((prev) => prev + 1);
			getAllChannels();
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getDMs();
	}, [checkMessage]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getAllChannels();
	}, [channelCount]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (userAuth !== null) {
			socket.current.emit('addUser', userAuth);
			socket.current.on('getUsers', (users) => {
				console.log(users);
			});
		}
	}, [userAuth]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container>
			<Header>
				<Channel>
					<ChannelName>
						{path === 'channel' ? '#' + display.name : display.uid}
					</ChannelName>
					<ChannelInfo>
						<span
							onClick={path === 'channel' ? displayMember : null}
							style={
								path === 'channel'
									? { cursor: 'pointer' }
									: { cursor: 'default' }
							}
						>
							{path === 'channel' &&
								(channelMembers.length > 1
									? channelMembers.length + ' members'
									: channelMembers.length + ' member')}

							{display.updated_at !== '' &&
								path === 'messages' &&
								'Updated on ' + display.created_at}
							{display.updated_at === '' &&
								path === 'messages' &&
								'Start a conversation'}
						</span>
						<ShowMembers
							open={isOpenShowMembers}
							onClose={() => setIsOpenShowMembers(false)}
							channelName={display.name}
							membersList={membersList}
						/>
					</ChannelInfo>
				</Channel>
				<ChannelDetails>
					{path === 'messages' ? (
						<box-icon
							name="info-circle"
							color="var(--chatbutton-color)"
						></box-icon>
					) : (
						<box-icon
							name="user-plus"
							color="var(--chatbutton-color)"
							onClick={() => setOpenAddMember(true)}
						></box-icon>
					)}
					<AddMember
						setMemberEmail={setMemberEmail}
						usersList={usersList}
						open={isOpenAddMember}
						onClose={closeAddMember}
						onClick={addMember}
						onSubmit={addMember}
						onChange={inputMemberId}
						newMemberEmail={newMemberEmail}
					></AddMember>
				</ChannelDetails>
			</Header>
			<MessageContainer ref={scrollToBottom}>
				{messageList.map((item, index) => (
					<ChatMessage
						key={index}
						sender={item.sender}
						body={item.body}
						date={item.created_at}
					/>
				))}
			</MessageContainer>
			<ChatInput
				onSubmit={sendMessage}
				onClick={sendMessage}
				message={message}
				onChange={inputMessage}
			/>
		</Container>
	);
};

export default Chat;

const Container = styled.div`
	display: grid;
	grid-template-rows: 50px auto min-content;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom: 1px solid #d3d3d3;
`;

const Channel = styled.div``;

const ChannelName = styled.div`
	font-weight: 700;
`;

const ChannelInfo = styled.div`
	display: flex;
	align-items: center;
	font-size: 13px;
	color: var(--channelinfo-color);
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

const ChannelDetails = styled.div`
	display: flex;
	align-items: center;
	color: #606060;

	box-icon:hover {
		cursor: pointer;
	}
`;
