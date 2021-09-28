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
  style,
  placeholder,
  readOnly,
}) {
  return (
    <div className={divClass}>
      <label className="Label">{label} </label>
      <input
        className={inputClass}
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        onClick={onClick}
        style={style}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
}

export default Input;
