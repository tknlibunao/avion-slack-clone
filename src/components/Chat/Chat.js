import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const Chat = ({ channelsList, DMList, myHeaders, url }) => {
	let { path, id } = useParams();
	const [display, setDisplay] = useState({ id });
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);

	const getChatDisplay = () => {
		let items = [];
		switch (path) {
			case 'channel':
				items = channelsList;
				break;
			case 'messages':
				items = DMList;
				break;
			default:
		}
		items.forEach((item) => {
			if (Number(id) === Number(item.id)) {
				setDisplay(item);
			}
		});
	};
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
					break;
				case 'messages':
					receiver_class = 'User';
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
					console.log(res);
					if (res.status === 200) {
						setMessage('');
					}
					retrieveMessage(receiver_class);
				})
				.catch((err) => console.log(err));
		}
	};

	const retrieveMessage = (receiverClass) => {
		setMessageList([]);
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
				setMessageList(updatedList);
			})
			.catch((error) => console.log('error', error));
	};

	useEffect(() => {
		getChatDisplay();
	}, [channelsList, DMList, path, id]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		switch (path) {
			case 'channel':
				retrieveMessage('Channel');
				break;
			case 'messages':
				retrieveMessage('User');
				break;
			default:
		}
	}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container>
			<Header>
				<Channel>
					<ChannelName>
						{path === 'channel' ? display.name : display.uid}
					</ChannelName>
					<ChannelInfo>
						{/* <box-icon name='plus' color='var(--channelinfo-color)' size='20px'></box-icon>
                        <span>Add a bookmark</span> */}
					</ChannelInfo>
				</Channel>
			</Header>
			<MessageContainer>
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
	height: 440px;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 7px;
	}
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb {
		background: rgb(188, 171, 188);
		border-radius: 10px;
	}
`;
