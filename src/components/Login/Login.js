import React from 'react';
import Input from '../Input/Input';
import { useHistory } from 'react-router';

function Login({ onSubmit, inputUser, inputPassword }) {
	let history = new useHistory();
	return (
		<div style={divStyle}>
			<form onSubmit={onSubmit} style={formStyle}>
				<Input
					label='Email'
					style={inputStyle}
					type='text'
					placeholder='Enter email..'
					onChange={inputUser}
				/>
				<Input
					label='Password'
					style={inputStyle}
					type='password'
					placeholder='Enter password'
					onChange={inputPassword}
				/>
				<Input type='Submit' value='Login' style={btnStyle} readOnly={true} />
				<button
					onClick={() => {
						history.push('/');
					}}
					style={backBtnStyle}
				>
					Back
				</button>
			</form>
		</div>
	);
}

const divStyle = {
	background: '#f8f8f8',
	width: '100%',
	height: '100vh',
	display: 'flex',
	justifyContent: ' center',
	alignItems: 'center',
};

const formStyle = {
	background: 'white',
	display: 'flex',
	flexDirection: 'column',
	height: '500px',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '100px',
	borderRadius: '5px',
	boxShadow: ' 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
};

const inputStyle = {
	fontSize: '1.5rem',
	margin: '0.5rem',
	outline: '0',
	paddingLeft: '0.5rem',
};

const btnStyle = {
	backgroundColor: '#4a154b',
	color: 'white',
	width: '150px',
	height: '40px',
	marginTop: '50px',
	fontSize: '15px',
	border: ' none',
	borderRadius: '4px',
	cursor: ' pointer',
};

const backBtnStyle = {
	backgroundColor: '#36C5F0',
	color: 'white',
	width: '150px',
	height: '40px',
	marginTop: '10px',
	fontSize: '15px',
	border: ' none',
	borderRadius: '4px',
	cursor: ' pointer',
};
export default Login;
