import React from "react";
const Input = ({ name, label, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        type="text"
        id={name}
        name={name}
        onChange={onChange}
        className="form-control"
        autoComplete="off"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
