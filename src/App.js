import './App.css';
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	// Link,
	// useRouteMatch,
	// useParams,
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
import Search from './components/Search/Search';

function App() {
	/* USER PARAMETERS */
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');
	const [error, setError] = useState('');
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
	const [addSuccess, setAddSuccess] = useState(false);

	/* INITIALIZE HEADERS */
	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('access-token', localStorage.getItem('token'));
	myHeaders.append('client', localStorage.getItem('client'));
	myHeaders.append('expiry', localStorage.getItem('expiry'));
	myHeaders.append('uid', localStorage.getItem('uid'));

	/* DEFINE URL */
	const url = 'http://206.189.91.54//api/v1';

	/* HELPER FUNCTIONS */

	const sortList = (list) => {
		return list.sort(function (a, b) {
			if (a.updated_at > b.updated_at) return -1;
			if (a.updated_at < b.updated_at) return 1;
			return 0;
		});
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

	const inputUser = (e) => {
		setEmail(e.target.value);
	};
	const inputPassword = (e) => {
		setPassword(e.target.value);
	};

	const inputConfirmation = (e) => {
		setConfirmation(e.target.value);
	};

	const toggleSearch = () => {
		setSearchToggle(!searchToggle);
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
				// history.push("/login");
			})
			.catch((error) => console.log(error));
	};

	const loginUser = (e) => {
		e.preventDefault();
		let raw = JSON.stringify({
			email: email,
			password: password,
		});

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
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
							break;
					}
				});
				if (response.status === 200) {
					// alert("LOGIN SUCCESS");
					setSuccess(true);
					localStorage.setItem('isUserActive', true);
					// localStorage.setItem("success", success);
				}
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
				setMyChannels(sortList(updatedList));
			})
			.catch((error) => console.log('error', error));
	};

	const inputNewChannelName = (e) => {
		setNewChannelName(e.target.value);
	};

	const createNewChannel = (e) => {
		// var channelName = prompt('Create new channel');
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
				setAddSuccess(true);
				getAllChannels();
				setNewChannelName('');
				setAddSuccess(false);
			})
			.catch((error) => console.log('error', error));
	};

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
				updatedList = sortList(removeDuplicate(updatedList));
				updatedList.forEach((item) => {
					item.created_at = item.created_at.toUTCString();
					item.updated_at = item.updated_at.toUTCString();
				});
				setDMList(updatedList);
			})
			.catch((error) => console.log('error', error));
	};

	const getAllChannels = () => {
		let requestOptions = {
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
				updatedList = sortList(updatedList);
				updatedList.forEach((item) => {
					item.created_at = item.created_at.toUTCString();
					item.updated_at = item.updated_at.toUTCString();
				});
				setChannelsList(updatedList);
			})
			.catch((error) => console.log('error', error));
	};

	useEffect(() => {
		getMyChannels();
	}, [success, newChannel]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getAllChannels();
		if (addSuccess) {
			console.log('IT WORKS!', addId, addSuccess);
			setAddSuccess(false);
		}
	}, [success, newChannel]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getDMs();
	}, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getAllUsers();
	}, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	console.log(DMList);
	// }, [DMList]);

	// useEffect(() => {
	// 	console.log(channelsList);
	// }, [channelsList]);

	// useEffect(() => {
	// 	console.log(usersList);
	// }, [usersList]);

	return (
		<div className="App">
			<header className="App-header">
				<Router>
					<Switch>
						<Route path="/room">
							{localStorage.getItem('token') !== null ? (
								<Container>
									<Header
										name={localStorage.getItem('uid')}
										toggleSearch={toggleSearch}
									/>
									<Main>
										<Sidebar
											myHeaders={myHeaders}
											myChannels={myChannels}
											channelsList={channelsList}
											DMList={DMList}
											usersList={usersList}
										/>
										{searchToggle ? (
											<Search
												toggleSearch={toggleSearch}
												myHeaders={myHeaders}
											/>
										) : (
											<Route path="/room/:path/:id">
												<Chat
													myChannels={myChannels}
													channelsList={channelsList}
													DMList={DMList}
													myHeaders={myHeaders}
													url={url}
													usersList={usersList}
												/>
											</Route>
										)}
										<Route path="/room/new-message">
											<NewDirectMessage
												url={url}
												myHeaders={myHeaders}
												usersList={usersList}
												getDMs={getDMs}
											/>
										</Route>
										<Route path="/room/add-channel">
											{addSuccess ? (
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
	grid-template-columns: 300px auto;
	background: var(--chatarea-color);
`;
