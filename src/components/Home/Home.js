import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

function Home() {
  const history = useHistory();

  const signIn = () => {
    history.push("/login");
  };

  const signUp = () => {
    history.push("/signup");
  };

  return (
    <Container>
      <Content>
        <SlackImg src="https://images.prismic.io/smarttask/1c150a8e-9f13-420e-8b0f-e6365219250f_slack.png?auto=compress,format" />
        <h1>Slack App</h1>
        <SignInButton onClick={signIn}>Sign In</SignInButton>
        <SignUpButton onClick={signUp}>Sign Up</SignUpButton>
        {/* <span>
					or <a href='/'> create new account </a>
				</span> */}
      </Content>
    </Container>
  );
}

export default Home;

const Container = styled.div`
	background: #f8f8f8;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	background: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 100px;
	border-radius: 5px;
	box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);

	span {
		margin-top: 5px;
		font-size: 13px;
	}
`;

const SlackImg = styled.img`
	height: 100px;
`;

const SignInButton = styled.button`
	background-color: #0a8d48;
	color: white;
	width: 150px;
	height: 40px;
	margin-top: 50px;
	font-size: 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;

const SignUpButton = styled.button`
	background-color: #e01e5a;
	color: white;
	width: 150px;
	height: 40px;
	margin-top: 10px;
	font-size: 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
`;
