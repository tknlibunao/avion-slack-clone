import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NewDirectMessage from './components/Sidebar/NewDirectMessage';
import AddChannel from './components/Sidebar/AddChannel';
import styled from 'styled-components';

function App() {
	/* USER PARAMETERS */
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');
	const [error, setError] = useState('');
	const [userAuth, setUserAuth] = useState(
		JSON.parse(localStorage.getItem('userAuth'))
	);

	/* NEW CHANNEL VALUES */
	const [newChannelName, setNewChannelName] = useState('');
	const [addId, setId] = useState('');

	/* API DATA */
	const [channelsList, setChannelsList] = useState([]);
	const [usersList, setUsersList] = useState([]);
	const [myChannels, setMyChannels] = useState([]);
	const [DMList, setDMList] = useState([]);

	/*  FLAGS */
	const [success, setSuccess] = useState(false);
	const [newChannel, setNewChannel] = useState(0);
	const [searchToggle, setSearchToggle] = useState(false);
	const [addChannelSuccess, setAddChannelSuccess] = useState(false);
	const [checkMessage, setCheckMessage] = useState(0);

	/* INITIALIZE HEADERS */
	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('access-token', localStorage.getItem('token'));
	myHeaders.append('client', localStorage.getItem('client'));
	myHeaders.append('expiry', localStorage.getItem('expiry'));
	myHeaders.append('uid', localStorage.getItem('uid'));

	/* DEFINE URL */
	const url = 'http://206.189.91.54//api/v1';

	const socket = useRef();

	/* HELPER FUNCTIONS */
	const sortList = (list, type) => {
		if (type === 'channel') {
			return list.sort(function (a, b) {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});
		} else if (type === 'user') {
			return list.sort(function (a, b) {
				if (a.uid < b.uid) return -1;
				if (a.uid > b.uid) return 1;
				return 0;
			});
		}
	};

	const removeDuplicate = (list) => {
		return list.filter(
			(item, index, self) => index === self.findIndex((t) => t.uid === item.uid)
		);
	};

	const arrangeList = (list) => {
		return list.sort(function (a, b) {
			if (a.id < b.id) return -1;
			if (a.id > b.id) return 1;
			return 0;
		});
	};

	/* MAIN FUNCTIONS */

	/* REGISTER AND LOGIN */
	const inputUser = (e) => {
		setEmail(e.target.value);
	};
	const inputPassword = (e) => {
		setPassword(e.target.value);
	};

	const inputConfirmation = (e) => {
		setConfirmation(e.target.value);
	};

	const registerUser = (e) => {
		e.preventDefault();

		fetch(`${url}/auth`, {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: password,
				password_confirmation: confirmation,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
		})
			.then((result) => {
				if (email === '') {
					setError('Field empty: email');
				} else if (password === '') {
					setError('Field empty: password');
				} else if (confirmation === '') {
					setError('Field empty: password confirmation');
				} else if (password !== confirmation) {
					setError('Password does not match');
				} else if (result.status === 422) {
					setError('Email already taken');
				} else {
					alert('Registration Successful!');
					setError('');
					e.target.reset();
					setEmail('');
					setPassword('');
					setConfirmation('');
				}
			})
			.catch((error) => console.log(error));
	};

	const loginUser = (e) => {
		e.preventDefault();

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			redirect: 'follow',
		};

		fetch(`${url}/auth/sign_in`, requestOptions)
			.then((response) => {
				response.headers.forEach((item, key) => {
					switch (key) {
						case 'access-token':
							// setAccessToken(item);
							localStorage.setItem('token', item);
							break;
						case 'client':
							// setClient(item);
							localStorage.setItem('client', item);
							break;
						case 'expiry':
							// setExpiry(item);
							localStorage.setItem('expiry', item);
							break;
						case 'uid':
							// setUID(item);
							localStorage.setItem('uid', item);
							break;
						default:
					}
				});
				if (response.status === 200) {
					setSuccess(true);
					localStorage.setItem('isUserActive', true);
					// localStorage.setItem("success", success);
				}
			})
			.catch((error) => console.log('error', error));
	};

	const toggleSearch = () => {
		setSearchToggle(!searchToggle);
	};

	/* CHANNELS FUNCTIONS */
	const getAllChannels = () => {
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		fetch(`${url}/channels`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.forEach((item) => {
					updatedList.push({
						name: item.name,
						id: item.id,
						owner_id: item.owner_id,
						created_at: new Date(item.created_at),
						updated_at: new Date(item.updated_at),
					});
				});
				updatedList = sortList(updatedList, 'channel');
				updatedList.forEach((item) => {
					item.created_at = item.created_at.toUTCString();
					item.updated_at = item.updated_at.toUTCString();
				});
				setChannelsList(updatedList);
			})
			.catch((error) => console.log('error', error));
	};

	const getMyChannels = () => {
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		fetch(`${url}/channel/owned`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.forEach((item) => {
					updatedList.push({
						name: item.name,
						id: item.id,
						created_at: item.created_at,
					});
				});
				setMyChannels(sortList(updatedList, 'channel'));
			})
			.catch((error) => console.log('error', error));
	};

	const inputNewChannelName = (e) => {
		setNewChannelName(e.target.value);
	};

	const createNewChannel = (e) => {
		e.preventDefault();
		var raw = JSON.stringify({
			name: newChannelName,
			user_ids: [],
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		fetch(`${url}/channels`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setId(String(result.data.id));
				setNewChannel((newChannel) => newChannel + 1);
				setAddChannelSuccess(true);
				getAllChannels();
				setNewChannelName('');
				setAddChannelSuccess(false);
			})
			.catch((error) => console.log('error', error));
	};

	/* USERS FUNCTIONS */
	const getAllUsers = () => {
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		fetch(`${url}/users`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.forEach((item) => {
					updatedList.push({
						name: item.name,
						id: item.id,
						uid: item.uid,
					});
				});
				setUsersList(arrangeList(updatedList));
			})
			.catch((error) => console.log('error', error));
	};

	const getDMs = () => {
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		fetch(`${url}/users/recent`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.forEach((item) => {
					updatedList.push({
						id: item.id,
						uid: item.uid,
						created_at: new Date(item.created_at),
						updated_at: new Date(item.updated_at),
					});
				});
				updatedList = sortList(removeDuplicate(updatedList), 'user');
				updatedList.forEach((item) => {
					item.created_at = item.created_at.toUTCString();
					item.updated_at = item.updated_at.toUTCString();
				});
				setDMList(updatedList);
			})
			.catch((error) => console.log('error', error));
	};

	/* GET USER AUTHENTICATION */
	const getUserAuth = () => {
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		fetch(`${url}/users`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.forEach((item) => {
					updatedList.push({
						name: item.name,
						id: item.id,
						uid: item.uid,
					});
				});
				let users = arrangeList(updatedList);
				let uid = localStorage.getItem('uid');
				let user = users.find((user) => user.uid === uid);
				localStorage.setItem('userAuth', JSON.stringify(user));
				setUserAuth(user);
			})
			.catch((error) => console.log('error', error));
	};

	/* USE EFFECTS */

	useEffect(() => {
		if (success) getUserAuth();
	}, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getMyChannels();
	}, [success, newChannel]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getAllChannels();
		if (addChannelSuccess) {
			console.log('NEW CHANNEL ADDED: ', addId, addChannelSuccess);
			setAddChannelSuccess(false);
		}
	}, [success, newChannel]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getDMs();
	}, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getAllUsers();
	}, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="App">
			<header className="App-header">
				<Router>
					<Switch>
						<Route path="/room">
							{localStorage.getItem('token') !== null ? (
								<Container>
									<Header
										usersList={usersList}
										channelsList={channelsList}
										toggleSearch={toggleSearch}
										myHeaders={myHeaders}
										name={localStorage.getItem('uid')}
										searchToggle={searchToggle}
									/>
									<Main>
										<Sidebar
											myHeaders={myHeaders}
											myChannels={myChannels}
											channelsList={channelsList}
											DMList={DMList}
											usersList={usersList}
										/>
										<Route path="/room/:path/:id">
											<Chat
												myChannels={myChannels}
												channelsList={channelsList}
												DMList={DMList}
												myHeaders={myHeaders}
												url={url}
												usersList={usersList}
												getDMs={getDMs}
												userAuth={userAuth}
												getAllChannels={getAllChannels}
												socket={socket}
												checkMessage={checkMessage}
												setCheckMessage={setCheckMessage}
											/>
										</Route>
										<Route path="/room/new-message">
											<NewDirectMessage
												url={url}
												myHeaders={myHeaders}
												usersList={usersList}
												getDMs={getDMs}
												channelsList={channelsList}
												socket={socket}
											/>
										</Route>
										<Route path="/room/add-channel">
											{addChannelSuccess ? (
												<Redirect
													to={{
														pathname: `/room/channel/${addId}`,
													}}
												/>
											) : (
												<AddChannel
													onSubmit={createNewChannel}
													onChange={inputNewChannelName}
													newChannelName={newChannelName}
												/>
											)}
										</Route>
									</Main>
								</Container>
							) : (
								<Loading />
								// <Home />
							)}
						</Route>

						<Route path="/signup">
							{localStorage.getItem('token') !== null ? (
								<Redirect to="/room/" />
							) : (
								<Register
									onSubmit={registerUser}
									inputUser={inputUser}
									inputPassword={inputPassword}
									inputConfirmation={inputConfirmation}
									error={error}
								/>
							)}
						</Route>
						<Route path="/login">
							{localStorage.getItem('token') !== null ? (
								<Redirect to="/room/" />
							) : (
								<Login
									onSubmit={loginUser}
									inputUser={inputUser}
									inputPassword={inputPassword}
								/>
							)}
						</Route>

						<Route path="/">
							{localStorage.getItem('token') !== null ? (
								<Redirect to="/room/" />
							) : (
								<Home />
							)}
						</Route>
					</Switch>
				</Router>
			</header>
		</div>
	);
}

export default App;

const Container = styled.div`
	display: grid;
	grid-template-rows: 38px auto;
	width: 100vw;
	height: 100vh;
`;
const Main = styled.div`
	display: grid;
	grid-template-columns: 280px auto;
	background: var(--chatarea-color);
`;
