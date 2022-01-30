import React from 'react';
import styled from 'styled-components';
import userDefaultImage from '../../assets/userDefaultImage.png';

const ChatMessage = ({ sender, body, date }) => {
	return (
		<Container>
			<UserAvatar>
				<img src={userDefaultImage} alt="" />
			</UserAvatar>
			<MessageContent>
				<Name>
					{sender}
					<span>{date.match(/\d\d:\d\d/)}</span>
				</Name>
				<Text>{body}</Text>
			</MessageContent>
		</Container>
	);
};

export default ChatMessage;

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	padding: 8px 20px;

	:hover {
		background-color: #f8f8f8;
	}
`;

const UserAvatar = styled.div`
	width: 36px;
	height: 36px;
	margin-top: 5px;
	border-radius: 4px;
	overflow: hidden;
	margin-right: 10px;

	img {
		width: 100%;
	}
`;

const MessageContent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Name = styled.div`
	font-weight: 900;
	font-size: 15px;
	line-height: 1.4;

	span {
		font-size: 13px;
		margin-left: 10px;
		font-weight: 400;
		color: #707070;
	}
`;

const Text = styled.div``;
