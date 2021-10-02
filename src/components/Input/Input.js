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
  readOnly,
}) {
  return (
    <div
      className={divClass}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label className="Label" style={{ fontWeight: "bold" }}>
        {label}{" "}
      </label>
      <input
        className={inputClass}
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        onClick={onClick}
        style={style}
        readOnly={readOnly}
      />
    </div>
  );
}

export default Input;
