import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { sidebarItems } from "../../data/SidebarData";

const Sidebar = ({ channelsList, addChannel, DMList, myHeaders }) => {
  const history = useHistory();

  const goToChannel = (id) => {
    if (id) {
      history.push(`/room/channel/${id}`);
    }
  };

  const goToDM = (id) => {
    if (id) {
      history.push(`/room/messages/${id}`);
    }
  };

  const newDM = () => {
    var username = prompt(`Enter user email`);
    let id = username;

    fetch(`http://206.189.91.54//api/v1/users`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result.data.forEach((item) => {
          if (item.uid === id) {
            console.log(item.id);
            history.push(`/room/messages/${item.id}`);
          }
        });
      });
  };
  return (
    <Container>
      <WorkspaceContainer>
        <Name>
          <span>Avion School</span>
          <box-icon
            name="chevron-down"
            color="var(--sidebar-font-color)"
          ></box-icon>
        </Name>
        <NewMessage onClick={newDM}>
          <box-icon name="edit" color="var(--sidebar-color)"></box-icon>
        </NewMessage>
      </WorkspaceContainer>
      <MainChannels>
        {sidebarItems.map((item, index) => (
          <MainChannelItem key={index}>
            {item.icon}
            {item.text}
          </MainChannelItem>
        ))}
      </MainChannels>
      <ChannelsContainer>
        <NewChannelContainer>
          <div>
            <span>Channels</span>
          </div>
          <box-icon
            name="plus"
            color="var(--sidebar-font-color)"
            onClick={addChannel}
          ></box-icon>
        </NewChannelContainer>
        <ChannelsList>
          {channelsList.map((item, index) => (
            <Channel key={index} onClick={() => goToChannel(item.id)}>
              <box-icon
                name="hash"
                color="var(--sidebar-font-color)"
              ></box-icon>
              <span>{item.name}</span>
            </Channel>
          ))}
        </ChannelsList>
      </ChannelsContainer>
      <DirectMessageContainer>
        <NewDirectMessage>
          <span>Direct Messages</span>
          <box-icon name="plus" color="var(--sidebar-font-color)"></box-icon>
        </NewDirectMessage>
        <DirectMessageList>
          {DMList.map((item, index) => (
            <DirectMessage key={index} onClick={() => goToDM(item.id)}>
              <box-icon
                name="user-rectangle"
                color="var(--sidebar-font-color)"
                type="solid"
              ></box-icon>
              <span>{item.uid}</span>
            </DirectMessage>
          ))}
        </DirectMessageList>
      </DirectMessageContainer>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
	background-color: var(--sidebar-color);
	height: 100%;
`;

const WorkspaceContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: var(--workspace-color);
	height: 50px;
	padding-left: 20px;
	padding-right: 20px;
	border-bottom: 1px solid #532652;
`;

const Name = styled.div`
	display: flex;
	align-items: center;

	span {
		font-weight: bolder;
		font-size: 1.2em;
	}
`;

const NewMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	background-color: var(--workspace-color);
	border-radius: 50%;
	cursor: pointer;
`;

const MainChannels = styled.div`
	align-items: center;
	padding-top: 20px;
	cursor: pointer;
`;

const MainChannelItem = styled.div`
	display: grid;
	grid-template-columns: 15% auto;
	height: 30px;
	padding-left: 20px;
	color: var(--sidebar-font-color);

	span {
		padding-left: 10px;
	}

	:hover:not(:last-child) {
		background-color: var(--sidebar-hover);
	}

	:hover:last-child {
		color: var(--workspace-color) !important;
	}
`;

const ChannelsContainer = styled.div`
	color: var(--sidebar-font-color);
	height: 175px;
	margin-top: 10px;
`;

const NewChannelContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 30px;
	padding-left: 20px;
	padding-right: 20px;

	box-icon:hover {
		cursor: pointer;
	}
`;

const ChannelsList = styled.div`
	height: 85%;
	overflow-x: hidden;
	overflow-y: hidden;
	:hover {
		overflow-y: auto;
	}
	::-webkit-scrollbar {
		width: 7px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #2b0029;
		border-radius: 10px;
	}
`;

const Channel = styled.div`
	display: flex;
	align-items: center;
	height: 30px;
	padding-left: 20px;
	cursor: pointer;

	span {
		padding-left: 10px;
	}

	:hover {
		background-color: var(--sidebar-hover);
	}
`;

const DirectMessageContainer = styled.div`
	color: var(--sidebar-font-color);
	height: 175px;
	margin-top: 10px;
`;

const NewDirectMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 30px;
	padding-left: 20px;
	padding-right: 20px;

	box-icon:hover {
		cursor: pointer;
	}
`;

const DirectMessageList = styled.div`
	height: 85%;
	overflow-x: hidden;
	overflow-y: hidden;
	:hover {
		overflow-y: auto;
	}
	::-webkit-scrollbar {
		width: 7px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #2b0029;
		border-radius: 10px;
	}
`;

const DirectMessage = styled.div`
	display: flex;
	// font-size: 13px;
	align-items: center;
	height: 30px;
	padding-left: 20px;
	cursor: pointer;

	span {
		padding-left: 10px;
	}

	:hover {
		background-color: var(--sidebar-hover);
	}
`;
