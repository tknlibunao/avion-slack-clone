import React from 'react';
import styled from 'styled-components';

function ChatMessage({ sender, body, date }) {
	return (
		<Container>
			<UserAvatar>
				<img src='https://i.imgur.com/6VBx3io.png' alt='user avatar' />
			</UserAvatar>
			<MessageContent>
				<Name>
					{sender}
					<span>{date}</span>
				</Name>
				<Text>{body}</Text>
			</MessageContent>
		</Container>
	);
}

export default ChatMessage;

const Container = styled.div`
	padding: 8px 20px;
	display: flex;
	align-items: center;

	:hover {
		background: #e5e5e5;
	}
`;

const UserAvatar = styled.div`
	width: 36px;
	height: 36px;
	border-radius: 2px;
	overflow: hidden;

	img {
		width: 100%;
	}
`;

const MessageContent = styled.div`
	display: flex;
	flex-direction: column;
`;

const Name = styled.span`
	margin-left: 8px;
	font-weight: 900;
	font-size: 15px;
	line-height: 1.4;

	span {
		margin-left: 8px;
		font-weight: 400;
		font-size: 13px;
		color: rgba(97, 96, 97);
	}
`;

const Text = styled.span`
	margin-left: 8px;
`;
