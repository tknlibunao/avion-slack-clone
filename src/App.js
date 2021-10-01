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
// import Login from './components/Login/Login';
// import Register from './components/Login/Register';
import styled from 'styled-components';

function App() {
	/* HEADER PARAMETERS */
	const [accessToken, setAccessToken] = useState('');
	const [client, setClient] = useState('');
	const [expiry, setExpiry] = useState('');
	const [uid, setUID] = useState('');

	/* USER PARAMETERS */
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirmation, setConfirmation] = useState('');

	/* API DATA */
	// const [channelsList, setChannelsList] = useState([]);
	// const [usersList, setUsersList] = useState([]);
	const [myChannels, setMyChannels] = useState([]);
	const [DMList, setDMList] = useState([]);

	/*  FLAGS */
	const [success, setSuccess] = useState(false);
	const [newChannel, setNewChannel] = useState(0);

	/* Define URL */
	const url = 'http://206.189.91.54//api/v1';

	/* Initialize Headers */
	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('access-token', `${accessToken}`);
	myHeaders.append('client', `${client}`);
	myHeaders.append('expiry', `${expiry}`);
	myHeaders.append('uid', `${uid}`);

	// const registerUser = () => {
	// 	let myHeaders = new Headers();
	// 	myHeaders.append('Content-Type', 'application/json');

	// 	let raw = JSON.stringify({
	// 		email: 'usersample03@gmail.com',
	// 		password: '12345678',
	// 		password_confirmation: '12345678',
	// 	});

	// 	let requestOptions = {
	// 		method: 'POST',
	// 		headers: myHeaders,
	// 		body: raw,
	// 		redirect: 'follow',
	// 	};

	// 	// call fetch here
	// 	post('http://206.189.91.54//api/v1/auth', requestOptions)
	// 		.then((result) =>
	// 			console.log(`Data: ${result.data.email}\nStatus: ${result.status}`)
	// 		)
	// 		.catch((error) => console.log(error.errors));
	// };

	const loginUser = () => {
		let raw = JSON.stringify({
			email: 'user2@example.com', // already existing in the database beforehand
			// email: 'usersample03@gmail.com', // own registered test account
			password: '12345678',
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
							setAccessToken(item);
							break;
						case 'client':
							setClient(item);
							break;
						case 'expiry':
							setExpiry(item);
							break;
						case 'uid':
							setUID(item);
							break;
						default:
							break;
					}
				});
				if (response.status === 200) {
					// console.log('LOGIN SUCCESS');
					setSuccess(true);
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

	const sortList = (list) => {
		return list.sort(function (a, b) {
			if (a.created_at < b.created_at) return -1;
			if (a.created_at > b.created_at) return 1;
			return 0;
		});
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

		fetch('http://206.189.91.54//api/v1/users/recent', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				let updatedList = [];
				result.data.forEach((item) => {
					updatedList.push({
						id: item.id,
						uid: item.uid,
						created_at: item.created_at,
					});
				});
				updatedList = removeDuplicate(updatedList);
				setDMList(updatedList);
			})
			.catch((error) => console.log('error', error));
	};

	const removeDuplicate = (list) => {
		return list.filter(
			(item, index, self) => index === self.findIndex((t) => t.uid === item.uid)
		);
	};

	// const retrieveMessage = () => {
	// 	var myHeaders = new Headers();
	// 	myHeaders.append('access-token', `${accessToken}`);
	// 	myHeaders.append('client', `${client}`);
	// 	myHeaders.append('expiry', `${expiry}`);
	// 	myHeaders.append('uid', `${uid}`);

	// 	var requestOptions = {
	// 		method: 'GET',
	// 		headers: myHeaders,
	// 		redirect: 'follow',
	// 	};

	// 	// receiver_id: check id from recently DMs
	// 	// NOTE: receiver_id can also be the sender of the message to our user
	// 	// check the result.data.forEach(item.[sender/receiver].uid) to see who is sender/receiver

	// 	// receiver_class: [Channel/User]
	// 	fetch(
	// 		'http://206.189.91.54//api/v1/messages?receiver_class=User&receiver_id=496',
	// 		requestOptions
	// 	)
	// 		.then((response) => response.json())
	// 		.then((result) => console.log(result.data))
	// 		.catch((error) => console.log('error', error));
	// };

	// const getAllChannels = () => {
	// 	let myHeaders = new Headers();
	// 	myHeaders.append('access-token', `${accessToken}`);
	// 	myHeaders.append('client', `${client}`);
	// 	myHeaders.append('expiry', `${expiry}`);
	// 	myHeaders.append('uid', `${uid}`);

	// 	let requestOptions = {
	// 		method: 'GET',
	// 		headers: myHeaders,
	// 		redirect: 'follow',
	// 	};

	// 	fetch('http://206.189.91.54//api/v1/channels', requestOptions)
	// 		.then((response) => response.json())
	// 		.then((result) => {
	// 			let updatedList = [];
	// 			result.data.forEach((item) => {
	// 				updatedList.push({
	// 					name: item.name,
	// 					id: item.id,
	// 					owner_id: item.owner_id,
	// 				});
	// 			});
	// 			setChannelsList(updatedList);
	// 		})
	// 		.catch((error) => console.log('error', error));
	// };

	// const selectChannel = () => {
	// 	var myHeaders = new Headers();
	// 	myHeaders.append('access-token', `${accessToken}`);
	// 	myHeaders.append('client', `${client}`);
	// 	myHeaders.append('expiry', `${expiry}`);
	// 	myHeaders.append('uid', `${uid}`);

	// 	var requestOptions = {
	// 		method: 'GET',
	// 		headers: myHeaders,
	// 		redirect: 'follow',
	// 	};

	// 	fetch('http://206.189.91.54//api/v1/channels/676', requestOptions)
	// 		.then((response) => response.json())
	// 		.then((result) => console.log(result))
	// 		.catch((error) => console.log('error', error));
	// };

	// const addMember = () => {
	// 	var myHeaders = new Headers();
	// 	myHeaders.append('Content-Type', 'application/json');
	// 	myHeaders.append('access-token', `${accessToken}`);
	// 	myHeaders.append('client', `${client}`);
	// 	myHeaders.append('expiry', `${expiry}`);
	// 	myHeaders.append('uid', `${uid}`);

	// 	var raw = JSON.stringify({
	// 		id: 676,
	// 		member_id: 1,
	// 	});

	// 	var requestOptions = {
	// 		method: 'POST',
	// 		headers: myHeaders,
	// 		body: raw,
	// 		redirect: 'follow',
	// 	};

	// 	fetch('http://206.189.91.54//api/v1/channel/add_member', requestOptions)
	// 		.then((response) => response.text())
	// 		.then((result) => console.log(result))
	// 		.catch((error) => console.log('error', error));
	// };

	useEffect(() => {
		loginUser();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getMyChannels();
	}, [success, newChannel]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	if (success) {
	// 		console.log('LOGIN SUCCESSFUL!');
	// 		getAllChannels();
	// 	}
	// }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	if (success) getAllUsers();
	// }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		getDMs();
	}, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	console.log(DMList);
	// }, [DMList]);
	// useEffect(() => {
	// 	retrieveMessage();
	// }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	selectChannel();
	// }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	// useEffect(() => {
	// 	console.log(myChannels);
	// }, [myChannels]);

	// useEffect(() => {
	// 	console.log(DMList);
	// }, [DMList]);

	// useEffect(() => {
	// 	console.log(channelsList);
	// }, [channelsList]);

	// useEffect(() => {
	// 	console.log(usersList);
	// }, [usersList]);

	// useEffect(() => {
	// 	addMember();
	// }, [success]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className='App'>
			<header className='App-header'>
				<Router>
					<Switch>
						<Route path='/room'>
							{success ? (
								<Container>
									<Header name={uid} />
									<Main>
										<Sidebar
											channelsList={myChannels}
											addChannel={createNewChannel}
											DMList={DMList}
										/>
										<Route path='/room/:path/:id'>
											<Chat
												channelsList={myChannels}
												DMList={DMList}
												myHeaders={myHeaders}
												url={url}
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
							{success ? <Redirect to='/room/:path/:id' /> : <Register />}
						</Route>
						<Route path='/login'>
							{success ? <Redirect to='/room/:path/:id' /> : <Login />}
						</Route>

						<Route path='/'>
							{success ? <Redirect to='/room/:path/:id' /> : <Home />}
						</Route>
					</Switch>
				</Router>
			</header>
		</div>
	);
}

export default App;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: 38px auto;
`;

const Main = styled.div`
	// background: red;
	display: grid;
	grid-template-columns: 260px auto;
`;

const Login = () => {
	return <h1>Login Form</h1>;
};

const Register = () => {
	return <h1>Register Form</h1>;
};
