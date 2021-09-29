import React from 'react';
import styled from 'styled-components';

function ChatMessage() {
	return (
		<Container>
			<UserAvatar>
				<img src='https://i.imgur.com/6VBx3io.png' alt='user avatar' />
			</UserAvatar>
			<MessageContent>
				<Name>
					Juan Dela Cruz
					<span>2/23/2021 11:13:36 AM</span>
				</Name>
				<Text>Insert message body here!</Text>
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
        background: grey;
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
