function Input({
	divClass,
	label,
	inputClass,
	type,
	name,
	value,
	onChange,
	onClick,
	autoComplete,
}) {
	return (
		<div className={divClass}>
			<label className='Label'>{label} </label>
			<input
				className={inputClass}
				type={type}
				name={name}
				value={value}
				autoComplete={autoComplete}
				onChange={(e) => onChange(e)}
				onClick={onClick}
			/>
		</div>
	);
}

export default Input;
