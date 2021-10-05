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
import styled from 'styled-components';

function App() {
	/* USER PARAMETERS */
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');
	const [error, setError] = useState('');

	/* API DATA */
	const [channelsList, setChannelsList] = useState([]);
	// const [usersList, setUsersList] = useState([]);
	const [myChannels, setMyChannels] = useState([]);
	const [DMList, setDMList] = useState([]);

	/*  FLAGS */
	const [success, setSuccess] = useState(false);
	const [newChannel, setNewChannel] = useState(0);

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

	const createNewChannel = () => {
		var channelName = prompt('Create new channel');

		var raw = JSON.stringify({
			name: channelName,
			user_ids: [],
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		fetch(`${url}/channels`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));

		setNewChannel((newChannel) => newChannel + 1);
		getMyChannels();
	};

	// const getAllUsers = () => {
	// 	var requestOptions = {
	// 		method: 'GET',
	// 		headers: myHeaders,
	// 		redirect: 'follow',
	// 	};

	// 	fetch('http://206.189.91.54//api/v1/users', requestOptions)
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			let updatedList = [];
	// 			result.data.forEach((item) => {
	// 				updatedList.push({
	// 					name: item.name,
	// 					id: item.id,
	// 					uid: item.uid,
	// 				});
	// 			});
	// 			setUsersList(updatedList);
	// 		})
	// 		.catch((error) => console.log('error', error));
	// };

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
						created_at: item.created_at,
						updated_at: item.updated_at,
					});
				});
				updatedList = sortList(removeDuplicate(updatedList));
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
	}, [success, newChannel]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getDMs();
	}, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	if (success) getAllUsers();
	// }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

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
		<div className='App'>
			<header className='App-header'>
				<Router>
					<Switch>
						<Route path='/room'>
							{localStorage.getItem('token') !== null ? (
								<Container>
									<Header name={localStorage.getItem('uid')} />
									<Main>
										<Sidebar
											myChannels={myChannels}
											channelsList={channelsList}
											addChannel={createNewChannel}
											DMList={DMList}
										/>
										<Route path='/room/:path/:id'>
											<Chat
												myChannels={myChannels}
												channelsList={channelsList}
												DMList={DMList}
												myHeaders={myHeaders}
												url={url}
												// onClick={sendMessage}
												// message={message}
												// onChange={inputMessage}
											/>
										</Route>
										{/* <Route path='/room'>Select channel</Route> */}
									</Main>
								</Container>
							) : (
								<Loading />
								// <Home />
							)}
						</Route>

						<Route path='/signup'>
							{localStorage.getItem('token') !== null ? (
								<Redirect to='/room/:path/:id' />
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
						<Route path='/login'>
							{localStorage.getItem('token') !== null ? (
								<Redirect to='/room/:path/:id' />
							) : (
								<Login
									onSubmit={loginUser}
									inputUser={inputUser}
									inputPassword={inputPassword}
								/>
							)}
						</Route>

						<Route path='/'>
							{localStorage.getItem('token') !== null ? (
								<Redirect to='/room/:path/:id' />
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
