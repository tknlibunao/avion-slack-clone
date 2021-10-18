import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import AddMember from './AddMember';
import ShowMembers from './ShowMembers';
import { io } from 'socket.io-client';

const Chat = ({
	channelsList,
	DMList,
	myHeaders,
	url,
	usersList,
	getDMs,
	userAuth,
	getAllChannels,
}) => {
	let { path, id } = useParams();
	const [display, setDisplay] = useState({ id });
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	const [channelMembers, setChannelMembers] = useState([]);
	const [newMember, setNewMember] = useState(0);
	const scrollToBottom = useRef(null);
	const [isOpenAddMember, setOpenAddMember] = useState(false);
	const [newMemberEmail, setMemberEmail] = useState('');
	const [isOpenShowMembers, setIsOpenShowMembers] = useState(false);
	const [membersList, setMembersList] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState('');
	const [currentId, setCurrentId] = useState(id);
	const [count, setCount] = useState(0);
	const [channelCount, setChannelCount] = useState(0);

	const socket = useRef();

	useEffect(() => {
		socket.current = io('ws://localhost:8900');
		socket.current.on('getMessage', (data) => {
			console.log('RECEIVED: ', data);
			console.log(data.senderId.id, path, id, currentId);
			setCount((prev) => prev + 1);
		});

		socket.current.on('checkChannel', (data) => {
			console.log('CHANNEL UPDATE: ', data);
			setNewMember((prev) => prev + 1);
			getChannelDetails();
			setChannelCount((prev) => prev + 1);
			getAllChannels();
		});
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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
	}, [userAuth]);

	useEffect(() => {
		socket.current = io('ws://localhost:8900');
		socket.current.on('getMessage', (data) => {
			console.log('RECEIVED: ', data);
			getDMs();
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		arrivalMessage && console.log('NEW MESSAGE! ', arrivalMessage);
	}, [arrivalMessage, path, id]);

	const getChatDisplay = () => {
		// console.log(usersList);
		if (path === 'channel') {
			channelsList.forEach((item) => {
				if (Number(id) === Number(item.id)) {
					setDisplay(item);
				}
			});
		} else if (path === 'messages') {
			let result = DMList.find((item) => Number(id) === Number(item.id));
			if (result) {
				// console.log('FOUND', result);
				setDisplay(result);
			} else {
				// console.log('NOT FOUND');
				let user = usersList.find((item) => Number(id) === Number(item.id));
				if (user) localStorage.setItem('newDM', JSON.stringify(user));
				else user = JSON.parse(localStorage.getItem('newDM'));
				// console.log('USER ON REFRESH: ', user);
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
				// console.log(result.data);
				let updatedList = [];
				result.data.channel_members.forEach((item) => {
					updatedList.push(item.user_id);
				});
				setChannelMembers(updatedList);
				// console.log(updatedList);
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
			// console.log(user.uid);
			members.push(user.uid);
			setMembersList(members);
		});
	};

	const addMember = (e) => {
		// let memberId = prompt('Enter member ID:');
		e.preventDefault();

		var user = usersList.find((user) => user.uid === newMemberEmail);
		if (user) var newMemberId = user.id;

		var raw = JSON.stringify({
			id: id,
			member_id: newMemberId,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
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
			switch (path) {
				case 'channel':
					receiver_class = 'Channel';
					socket.current.emit('sendMessage', {
						senderId: userAuth,
						receiverId: id,
						text: message,
					});
					break;
				case 'messages':
					receiver_class = 'User';
					socket.current.emit('sendMessage', {
						senderId: userAuth,
						receiverId: id,
						text: message,
					});
					break;
				default:
			}

			fetch(`${url}/messages`, {
				method: 'POST',
				body: JSON.stringify({
					receiver_id: id,
					receiver_class: receiver_class,
					body: message,
				}),
				headers: myHeaders,
				redirect: 'follow',
			})
				.then((res) => {
					// console.log(res);
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
		// setMessageList([]);
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		// receiver_id: check id from recently DMs
		// NOTE: receiver_id can also be the sender of the message to our user
		// check the result.data.forEach(item.[sender/receiver].uid) to see who is sender/receiver

		// receiver_class: [Channel/User]
		fetch(
			`${url}/messages?receiver_class=${receiverClass}&receiver_id=${id}`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				// console.log(`Message retrieved (${receiverClass} ${id}):`, result);
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

	//   const newDM = () => {
	// 		var username = prompt(`Enter user email`);
	// 		let id = username;

	// 		fetch(`http://206.189.91.54//api/v1/users`, {
	// 			method: 'GET',
	// 			headers: myHeaders,
	// 			redirect: 'follow',
	// 		})
	// 			.then((response) => response.json())
	// 			.then((result) => {
	// 				console.log(result);
	// 				result.data.forEach((item) => {
	// 					if (item.uid === id) {
	// 						console.log(item.id);
	// 						history.push(`/room/messages/${item.id}`);
	// 					}
	// 				});
	// 			});
	// 	};

	useEffect(() => {
		getChatDisplay();
	}, [channelsList, DMList, path, id]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getChannelDetails();
	}, [path, id, newMember]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		console.log(id);
		switch (path) {
			case 'channel':
				retrieveMessage('Channel');
				break;
			case 'messages':
				retrieveMessage('User');
				break;
			default:
		}
	}, [path, id, count]); // eslint-disable-line react-hooks/exhaustive-deps

	// Scroll to bottom
	useEffect(() => {
		if (scrollToBottom) {
			scrollToBottom.current.addEventListener('DOMNodeInserted', (event) => {
				const { currentTarget: target } = event;
				target.scroll({ top: target.scrollHeight });
			});
		}
	}, []);

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
					{/* <div>
						{path === 'messages' ? (
							<span>Details</span>
						) : (
							<span>Add member</span>
						)}
					</div> */}
					{path === 'messages' ? (
						// <Info />
						<box-icon
							name="info-circle"
							color="var(--chatbutton-color)"
						></box-icon>
					) : (
						// <Add onClick={() => addMember(id)} />
						<box-icon
							name="user-plus"
							color="var(--chatbutton-color)"
							// onClick={() => addMember(id)}
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
