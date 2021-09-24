import React, { useState } from 'react';
import Form from './components/Form/Form';
import './App.css';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');

	const submitFormHandler = (event) => {
		event.preventDefault();

		for (let i = 0; i < 3; i++) {
			if (event.target[i].value.length === 0) return;
		}

		event.target.reset();
		setEmail('');
		setPassword('');
		setConfirmation('');
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		switch (name) {
			case 'email':
				return setEmail(value);
			case 'password':
				return setPassword(value);
			case 'confirmation':
				return setConfirmation(value);
			default:
				break;
		}
	};

	const registerData = () => {
		// check if input data is updated
		if (
			email.length === 0 ||
			password.length === 0 ||
			confirmation.length === 0
		)
			return alert('Please fill up all input fields!');
		console.log(`Email: ${email}`);
		console.log(`Password: ${password}`);
		console.log(`Confirmation: ${confirmation}`);

		// call fetch here
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			email: `${email}`,
			password: `${password}`,
			password_confirmation: `${confirmation}`,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		// call fetch here
		post('http://206.189.91.54//api/v1/auth', requestOptions)
			.then((result) =>
				console.log(
					`Data: ${result.data.email}\nStatus: ${result.status}`
				)
			)
			.catch((error) => console.log(error.errors));

		// fetch('http://206.189.91.54//api/v1/auth/', requestOptions)
		// 	.then((response) => response.text())
		// 	.then((result) => {
		// 		console.log(`${result}`);
		// 		console.log(typeof(result));
		// 		console.log(`${result.success}`);
		// 	})
		// 	.catch((error) => console.log('error', error));
		
	};

	async function post(url = '', requestOptions = {}) {
		const response = await fetch(url, requestOptions);
		return response.json();
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>User Registration</h1>
				<Form
					className='Form'
					onSubmit={submitFormHandler}
					onChange={handleChange}
					onClick={registerData}
				/>
			</header>
		</div>
	);
}

export default App;
