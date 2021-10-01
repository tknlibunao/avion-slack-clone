import React from 'react'
import styled from 'styled-components'
import { sidebarItems } from '../../data/SidebarData'
import { channelsList } from '../../data/ChannelsList'
import { directMessageData } from '../../data/DirectMessageData'

const Sidebar = (props) => {
    return (
        <Container>
            <WorkspaceContainer>
                <Name>
                    <span>Avion School</span>
                    <box-icon name='chevron-down' color='var(--sidebar-font-color)'></box-icon>
                </Name>
                <NewMessage>
                    <box-icon name='edit' color='var(--sidebar-color)'></box-icon>
                </NewMessage>
            </WorkspaceContainer>
            <MainChannels>
                {
                    sidebarItems.map(item => (
                        <MainChannelItem>
                            {item.icon}
                            {item.text}
                        </MainChannelItem>
                    ))
                }
            </MainChannels>
            <ChannelsContainer>
                <NewChannelContainer>
                    <div>
                        <span>Channels</span>
                    </div>  
                    <box-icon name='plus' color='var(--sidebar-font-color)'></box-icon>
                </NewChannelContainer>
                <ChannelsList>
                    {
                        channelsList.map(item => (
                            <Channel>
                                {item.icon}
                                {item.text}
                            </Channel>
                        ))
                    }
                </ChannelsList>
            </ChannelsContainer>
            <DirectMessageContainer>
                <NewDirectMessage>
                    <span>Direct Messages</span>
                    <box-icon name='plus' color='var(--sidebar-font-color)'></box-icon>
                </NewDirectMessage>
                <DirectMessageList>
                    {
                        directMessageData.map(item => (
                            <DirectMessage>
                                {item.userImage}
                                {item.userName}
                            </DirectMessage>
                        ))
                    }
                </DirectMessageList>
            </DirectMessageContainer>
        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    background-color: var(--sidebar-color);
`

const WorkspaceContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--workspace-color);
    height: 50px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #532652;
`

const Name = styled.div`
    display: flex;
    align-items: center;

    span {
        font-weight: bolder;
        font-size: 1.2em;
    }
`

const NewMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: var(--workspace-color);
    border-radius: 50%;
    cursor: pointer;
`

const MainChannels = styled.div`
    align-items: center;
    padding-top: 20px;
    cursor: pointer;
`

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
`

const ChannelsContainer = styled.div`
    color: var(--sidebar-font-color);
    margin-top: 10px;
`

const NewChannelContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding-left: 20px;
    padding-right: 20px;
`

const ChannelsList = styled.div`

`

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
`

const DirectMessageContainer = styled.div`
    color: var(--sidebar-font-color);
    margin-top: 10px;
`

const NewDirectMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    padding-left: 20px;
    padding-right: 20px;
`

const DirectMessageList = styled.div`

`

const DirectMessage = styled.div`
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
`