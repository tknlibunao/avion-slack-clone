import Input from '../Input/Input.js';

const Form = ({ className, onSubmit, onChange, onClick }) => {
	return (
		<form className={className} onSubmit={(e) => onSubmit(e)}>
			<Input
				divClass='Input'
				label='Email'
				inputClass='Input-field'
				type='text'
				name='email'
				autoComplete='off'
				onChange={onChange}
			/>
			<br />
			<Input
				divClass='Input'
				label='Password'
				inputClass='Input-field'
				type='password'
				name='password'
				autoComplete='off'
				onChange={onChange}
			/>
			<br />
			<Input
				divClass='Input'
				label='Confirm Password'
				inputClass='Input-field'
				type='password'
				name='confirmation'
				autoComplete='off'
				onChange={onChange}
			/>
			<Input
				divClass='Button'
				inputClass='Submit-btn'
				type='submit'
				value='Register'
				onClick={onClick}
			/>
		</form>
	);
};

export default Form;
