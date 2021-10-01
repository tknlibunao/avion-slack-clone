import Input from '../Input/Input.js';
import { useHistory } from 'react-router';

const Register = ({
	onSubmit,
	inputUser,
	inputPassword,
	inputConfirmation,
	error,
}) => {
	let history = new useHistory();
	return (
		<div style={divStyle}>
			<form onSubmit={(e) => onSubmit(e)} style={formStyle}>
				<label style={labelStyle}>{error}</label>
				<Input
					divClass='Input'
					label='Email'
					inputClass='Input-field'
					type='text'
					name='email'
					autoComplete='off'
					onChange={inputUser}
					style={inputStyle}
				/>
				<br />
				<Input
					divClass='Input'
					label='Password'
					inputClass='Input-field'
					type='password'
					name='password'
					autoComplete='off'
					onChange={inputPassword}
					style={inputStyle}
				/>
				<br />
				<Input
					divClass='Input'
					label='Confirm Password'
					inputClass='Input-field'
					type='password'
					name='confirmation'
					autoComplete='off'
					onChange={inputConfirmation}
					style={inputStyle}
				/>
				<Input
					divClass='Button'
					inputClass='Submit-btn'
					type='submit'
					value='Register'
					style={btnStyle}
				/>

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
};

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

const labelStyle = {
	color: 'red',
};
export default Register;
