import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const Chat = ({ onChange, message, onClick, channelsList, DMList }) => {
	let { path, id } = useParams();
	const [display, setDisplay] = useState({ id });

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

	useEffect(() => {
		getChatDisplay();
	}, [channelsList, DMList, path, id]); // eslint-disable-line react-hooks/exhaustive-deps

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
				<ChatMessage />
			</MessageContainer>
			<ChatInput onClick={onClick} message={message} onChange={onChange} />
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
	height: auto;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 5px;
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
