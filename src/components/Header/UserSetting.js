import React from "react";
import styled from "styled-components";
import { useState } from "react";
import userDefaultImage from "../../assets/userDefaultImage.png";
import { useHistory } from "react-router";

const UserSetting = (props) => {
  const workspaceName = "Avion School";
  const [isUserActive, setUserActive] = useState(false);

  const history = useHistory();

  const isUserActiveHandler = () => {
    setUserActive(!isUserActive);
  };

  const logOutHandler = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  return (
    <Container>
      <UserInfo>
        <UserProfile>
          <UserImage>
            <img src={userDefaultImage} alt="User" />
          </UserImage>
          <UserName>
            <span className="user-name">
              <b>Bills</b>
            </span>
            <span className="user-status">
              {!isUserActive ? "Active" : "Away"}
            </span>
          </UserName>
        </UserProfile>
        <UserStatus>
          <UpdateStatus>
            <box-icon name="smile" color="#707070" size="24px"></box-icon>
            <span>Update your status</span>
          </UpdateStatus>
          <SetStatus onClick={isUserActiveHandler}>
            Set yourself as <b>{isUserActive ? "active" : "away"}</b>
          </SetStatus>
          <PauseNotification>
            <span>Pause notifications</span>
            <box-icon
              name="chevron-right"
              color="var(--profile-font-color)"
              size="17px"
            ></box-icon>
          </PauseNotification>
        </UserStatus>
        <ProfileOptions>
          <Profile>
            <span>Profile</span>
          </Profile>
          <Preference>
            <span>Preferences</span>
          </Preference>
        </ProfileOptions>
        <DownloadWrapper>
          <Download>
            <span>Downloads</span>
            <span className="download-shortcut">Ctrl+Shift+J</span>
          </Download>
        </DownloadWrapper>
        <SignOut onClick={logOutHandler}>
          <span>Sign out of {workspaceName}</span>
        </SignOut>
      </UserInfo>
    </Container>
  );
};

export default UserSetting;

const Container = styled.div`
    position: absolute;
    top: 40px;
    right: 15px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    box-shadow: 0px 2px 5px 1px rgba(0,0,0,0.3);
    width: 100%;
    max-width: 300px;
    background: #FFFFFF;
    color: var(--profile-font-color);
    z-index: 10;
    font-size: 15px;
    cursor: default;
`;
const UserInfo = styled.div`
    
`;
const UserProfile = styled.div`
    display: flex;
    align-items: center;
    margin-top: 24px;
    margin-left: 24px;
    margin-bottom: 10px;
`;
const UserImage = styled.div`
    width: 36px;
    height:36px;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 10px;
    img {
        width: 100%;
    }
`;
const UserName = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
`;
const UserStatus = styled.div`
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
`;
const UpdateStatus = styled.div`
    display: flex;
    align-items: center;
    margin-left: 24px;
    margin-right: 24px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #E2E2E2;
    margin-bottom: 10px;
    cursor: pointer;
    
    span{
        margin-left: 15px;
        color: var(--profile-font-color);
    }

    :hover {
        border: 1px solid #C6C6C6;
    }
`;
const SetStatus = styled.div`
    padding: 4px 24px;
    cursor: pointer;

    :hover {
        background: #1264A3;
        color: #FFFFFF;
    }
`;
const PauseNotification = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 24px;
    cursor: pointer;

    :hover {
        background: #1264A3;
        color: #FFFFFF;
    }
    box-icon:hover {
        color: #FFFFFF;
    }
`;
const ProfileOptions = styled.div`
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
`;
const Profile = styled.div`
    display: flex;
    align-items: center;
    padding: 4px 24px; 
    cursor: pointer;

    :hover {
        background: #1264A3;
        color: #FFFFFF;
    }
`;
const Preference = styled.div`
    display: flex;
    align-items: center;
    padding: 4px 24px; 
    cursor: pointer;

    :hover {
        background: #1264A3;
        color: #FFFFFF;
    }
`;
const DownloadWrapper = styled.div`
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
`;
const Download = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 24px; 
    cursor: pointer;

    :hover {
        background: #1264A3;
        color: #FFFFFF;
    }
`;
const SignOut = styled.div`
    padding: 4px 24px;
    margin-bottom: 10px;
    cursor: pointer;

    :hover {
        background: #1264A3;
        color: #FFFFFF;
    }
`;
