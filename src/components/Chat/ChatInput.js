import React from "react";
import styled from "styled-components";

const ChatInput = ({ onChange, onClick, message }) => {
  return (
    <Container>
      <InputContainer>
        <form action="">
          <input
            type="text"
            placeholder="Message"
            name=""
            id=""
            value={message}
            onChange={onChange}
          />
          <ChatButtons>
            <ShortcutButton>
              <box-icon
                name="zap"
                type="solid"
                size="18px"
                color="var(--chatbutton-color)"
              ></box-icon>
            </ShortcutButton>
            <TextFormatButtons>
              <box-icon
                name="bold"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="italic"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="strikethrough"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="code-alt"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="link"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="list-ol"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="list-ul"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="poll"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="code-block"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
            </TextFormatButtons>
            <MultimediaButtons>
              <box-icon
                name="font-family"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="at"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="smile"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="paperclip"
                flip="vertical"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="video"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
              <box-icon
                name="microphone"
                size="20px"
                color="var(--chatbutton-color)"
              ></box-icon>
            </MultimediaButtons>
            <SendButton
              style={{ backgroundColor: message === "" ? "#ccc" : "#007A5A" }}
            >
              <SendIcon onClick={onClick}>
                <box-icon
                  type="solid"
                  size="18px"
                  color="var(--chatarea-color)"
                  name="send"
                ></box-icon>
              </SendIcon>
              <SendOptions>
                <box-icon
                  name="chevron-down"
                  size="18px"
                  color="var(--chatarea-color)"
                ></box-icon>
              </SendOptions>
            </SendButton>
          </ChatButtons>
        </form>
      </InputContainer>
    </Container>
  );
};

export default ChatInput;

const Container = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 24px;
`;

const InputContainer = styled.div`
    border: 1px solid #808080;
    border-radius: 4px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80px;

        input{
            height: 40px;
            width: 100%;
            padding-left: 10px;
            padding-right: 10px;
            font-size: 13px;
            border: none;
        }
    }
`;

const ChatButtons = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-items: space-between;
    height: 40px;
    width: 100%;
    background: #F8F8F8;
    border-top: 1px solid #DDDDDD;

    box-icon:not(box-icon[name=zap]):not(box-icon[name=send]):not(box-icon[name=chevron-down]) {
        padding: 5px;
    }
    box-icon:hover:not(box-icon[name=zap]):not(box-icon[name=send]):not(box-icon[name=chevron-down]) {
        padding: 5px;
        background: #DCDCDC;
        border-radius: 2px;
    }
`;

const ShortcutButton = styled.div`
    position: absolute;
    left: 0;
    display: flex;
    margin-left: 5px;
    padding: 5px 5px;
    border-right: 1px solid #DDDDDD;
    cursor: pointer;

    :hover {
        background: #DCDCDC;
        border-radius: 2px;
    }

`;

const TextFormatButtons = styled.div`
    position: absolute;
    left: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 10px;
    max-width: 280px;
    min-width: 50px;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
`;

const MultimediaButtons = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 180px;
    min-width: 50px;
    width: 100%;
    right: 80px;
    cursor: pointer;
`;

const SendButton = styled.div`
    position: absolute;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
    height: 32px;
    margin-right: 5px;
    padding-left: 10px;
    border-radius: 4px;
    cursor: pointer;
`;

const SendIcon = styled.div`
    display: flex;
    align-items: center;
    padding-right: 10px;
    border-right: 1px solid #FFFFFF;
`;

const SendOptions = styled.div`
    display: flex;
    align-items: center;
`;
