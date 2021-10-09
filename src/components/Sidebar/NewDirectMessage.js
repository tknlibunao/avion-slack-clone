import styled from 'styled-components';
import ChatInput from '../Chat/ChatInput';

const NewDirectMessage = () => {

	return (
		<Container>
			<Header>
				<NewMessageWrapper>
					<NewMessage>
                        New Message
					</NewMessage>
				</NewMessageWrapper>
			</Header>
			<InputContainer>
				<form action="">
					<span>To:</span>
					<input type="text" placeholder='Enter user email' />
				</form>
			</InputContainer>
			<MessageContainer>
			</MessageContainer>
			<ChatInput message=''/>
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

	input[type=text] {
		font-size: 16px;
		height: 40px;
		width: 100%;
		border: none;
	}
`;
