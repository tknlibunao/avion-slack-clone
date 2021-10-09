import styled from 'styled-components';

const AddChannel = ({
	onSubmit,
	onChange,
	newChannelName,
}) => {
	return (
		<Container>
			<Header>
				<NewChannelWrapper>
					<NewChannel>
						Add Channel
					</NewChannel>
				</NewChannelWrapper>
			</Header>
			<InputContainer>
				<form onSubmit={() => onSubmit()}>
					<input
						type='text'
						placeholder='Enter channel name'
						value={newChannelName}
						onChange={onChange}
					/>
				</form>
			</InputContainer>
			<MessageContainer>
			</MessageContainer>
		</Container>
	);
};

export default AddChannel;

const Container = styled.div`
	display: grid;
	grid-template-rows: 50px 80px auto;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom: 1px solid #d3d3d3;
`;

const NewChannelWrapper = styled.div``;

const NewChannel = styled.div`
	font-weight: 700;
	margin-left: 4px;
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

	form {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100px;
		padding: 5px 5px;
	}

	span {
		margin-right: 10px;
	}

	input[type='text'] {
		height: 40px;
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border-radius: 4px;
		border: 1px solid #bbbabb;
	}
	input[type='text']:hover {
		border: 1px solid #a8a7a8;
	}
	input[type='text']:focus {
		border: 1px solid #1264a3;
		box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
	}
`;
const InputForm = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 5px;
	border-radius: 4px;
	padding-left: 3px;
	height: 60px;
	width: 100%;

	
`;