import React from 'react';
import { sidebarItemsData } from '../../data/SidebarData';
import styled from 'styled-components';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';

function Sidebar({ channelsList, addChannel }) {
	return (
		<div>
			<Container>
				<WorkspaceContainer>
					<Name>My Workspace</Name>
					<NewMessage>
						<AddCircleOutlineIcon />
					</NewMessage>
				</WorkspaceContainer>
				<MainChannels>
					{sidebarItemsData.map((item, index) => (
						<MainChannelItem key={index}>
							{item.icon}
							{item.text}
						</MainChannelItem>
					))}
				</MainChannels>
				<ChannelsContainer>
					<NewChannelContainer>
						<div>Channels</div>
						<NewChannel>
							<AddIcon onClick={addChannel} />
						</NewChannel>
					</NewChannelContainer>
					<ChannelsList>
						{/* <Channel>#Channel 1</Channel>
						<Channel>#Channel 2</Channel> */}
						{channelsList.map((item, index) => (
							<Channel key={index}>#{item.name}</Channel>
						))}
					</ChannelsList>
				</ChannelsContainer>
			</Container>
		</div>
	);
}

export default Sidebar;

const Container = styled.div`
	height: 100%;
	background: #3f0e40;
`;

const WorkspaceContainer = styled.div`
	color: white;
	height: 64px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 19px;
	border-bottom: 1px solid #532753;
`;

const Name = styled.div``;

const NewMessage = styled.div`
	background: white;
	color: #3f0e40;
	width: 36px;
	height: 36px;
	margin-right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;
`;

const NewChannel = styled.div`
	width: 36px;
	height: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	cursor: pointer;

	:hover {
		background: #350d36;
	}
`;

const MainChannels = styled.div`
	padding-top: 20px;
`;

const MainChannelItem = styled.div`
	height: 28px;
	color: rgb(188, 171, 188);
	padding-left: 19px;
	display: grid;
	grid-template-columns: 15% auto;
	align-items: center;
	cursor: pointer;

	:hover {
		background: #350d36;
	}
`;

const ChannelsContainer = styled.div`
	color: rgb(188, 171, 188);
	margin-top: 10px;
`;

const NewChannelContainer = styled.div`
	height: 28px;
	padding-left: 19px;
	padding-right: 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const ChannelsList = styled.div`
	height: 306px;
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

const Channel = styled.div`
	height: 28px;
	padding-left: 19px;
	display: flex;
	align-items: center;
	cursor: pointer;

	:hover {
		background: #350d36;
	}
`;
