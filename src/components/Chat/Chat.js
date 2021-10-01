import React from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const Chat = () => {
    return (
        <Container>
            <Header>
                <Channel>
                    <ChannelName>
                        # Channel 1
                    </ChannelName>
                    <ChannelInfo>
                        {/* <box-icon name='plus' color='var(--channelinfo-color)' size='20px'></box-icon>
                        <span>Add a bookmark</span> */}
                    </ChannelInfo>
                </Channel>
            </Header>
            <MessageContainer>
                <ChatMessage/>
            </MessageContainer>
            <ChatInput/>
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display: grid;
    grid-template-rows: 50px auto min-content;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #D3D3D3;
`

const Channel = styled.div`

`

const ChannelName = styled.div`
    font-weight: 700;
`

const ChannelInfo = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
    color: var(--channelinfo-color);
`

const MessageContainer = styled.div`

`