import React from 'react';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';

function ChatInput() {
	return (
		<Container>
			<InputContainer>
				<form>
					<input type='text' placeholder='Messsage here...' />
					<SendButton>
						<Send />
					</SendButton>
				</form>
			</InputContainer>
		</Container>
	);
}

export default ChatInput;

const Container = styled.div`
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 24px;
	padding-bottom: 24px;
	border-top: 1px solid rgb(0 0 0 / 20%);
`;

const InputContainer = styled.div`
	border: 1px solid #8d8dbe;
	border-radius: 4px;

	form {
		height: 42px;
		padding-left: 10px;
		display: flex;
		align-items: center;

		input {
			flex: 1;
			border: none;
			font-size: 13px;
		}

		input:focus {
			outline: none;
		}
	}
`;

const SendButton = styled.div`
	background: #087a5a;
	width: 32px;
	height: 32px;
	margin-right: 5px;
	border-radius: 2px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	.MuiSvgIcon-root {
		width: 18px;
	}

	:hover {
		background: #148567;
	}
`;

const Send = styled(SendIcon)`
	color: #d9d9d9;
`;
