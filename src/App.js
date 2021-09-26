import React, { useState } from 'react';
import Form from './components/Form/Form';
import './App.css';
import Mainpage from './components/MainPage/MainPage'

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
		// console.log(name, value);
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

	const submitData = () => {
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

		var body = {
			email: `${email}`,
			password: `${password}`,
			password_confirmation: `${confirmation}`,
		};

		// call fetch here
		post('{{url}}/api/v1/auth/', body)
			.then((result) =>
				console.log(
					`Success: ${result.success}
					\nError: ${result.errors}
					\nStatus: ${result.status}`
				)
			)
			.catch((error) => console.log(error.errors));
	};

	async function post(url = '', data = {}) {
		const response = await fetch(url, {
			method: 'POST',
			headers: ('Content-Type','application/json'),
			body: JSON.stringify(data),
			redirect: 'follow',
		});
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
					onClick={submitData}
				/>
			</header>
		</div>
	);
}

export default App;
