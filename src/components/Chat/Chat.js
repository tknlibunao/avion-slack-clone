import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

function Chat({
  channelsList,
  DMList,
  myHeaders,
  url,
  onChange,
  message,
  onClick,
}) {
  let { path, id } = useParams();
  const [display, setDisplay] = useState({ id });
  const [messageList, setMessageList] = useState([]);

  const getChatDisplay = () => {
    let items = [];
    switch (path) {
      case "channel":
        items = channelsList;
        break;
      case "messages":
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

  const retrieveMessage = (param) => {
    setMessageList([]);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // receiver_id: check id from recently DMs
    // NOTE: receiver_id can also be the sender of the message to our user
    // check the result.data.forEach(item.[sender/receiver].uid) to see who is sender/receiver

    // receiver_class: [Channel/User]
    fetch(
      `${url}/messages?receiver_class=${param}&receiver_id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let updatedList = [];
        result.data.forEach((item) => {
          updatedList.push({
            body: item.body,
            created_at: item.created_at,
            receiver: item.receiver.uid,
            sender: item.sender.uid,
          });
        });
        setMessageList(updatedList);
      })
      .catch((error) => console.log("error", error));
  };

  // useEffect(() => {
  // 	console.log('Messages: ', messageList);
  // }, [messageList]);

  useEffect(() => {
    getChatDisplay();
  }, [channelsList, DMList, path, id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    switch (path) {
      case "channel":
        retrieveMessage("Channel");
        break;
      case "messages":
        retrieveMessage("User");
        break;
      default:
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Header>
        <Channel>
          <ChannelName>
            {path === "channel" ? display.name : display.uid}
          </ChannelName>
          <ChannelInfo>First viewed on {display.created_at}</ChannelInfo>
        </Channel>
        <ChannelDetails>
          <div>Details</div>
          <Info />
        </ChannelDetails>
      </Header>
      <MessageContainer>
        {/* <ChatMessage messageList={messageList} /> */}
        {messageList.map((item, index) => (
          <ChatMessage
            key={index}
            sender={item.sender}
            body={item.body}
            date={item.created_at}
          />
        ))}
      </MessageContainer>
      <ChatInput onClick={onClick} message={message} onChange={onChange} />
    </Container>
  );
}
export default Chat;

const Container = styled.div`
	display: grid;
	grid-template-rows: 64px auto min-content;
`;

const Channel = styled.div``;

const ChannelDetails = styled.div`
	display: flex;
	align-channels: center;
	color: #606060;
`;

const ChannelName = styled.div`
	font-weight: 700;
`;

const ChannelInfo = styled.div`
	font-weight: 400;
	color: #606060;
	font-size: 13px;
	margin-top: 8px;
`;

const Info = styled(InfoOutlinedIcon)`
	margin-left: 10px;
`;

const Header = styled.div`
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	justify-content: space-between;
	align-channels: center;
	border-bottom: 1px solid rgba(83, 39, 83, 0.13);
`;

const MessageContainer = styled.div`
	// background: red;
	height: 440px;
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
