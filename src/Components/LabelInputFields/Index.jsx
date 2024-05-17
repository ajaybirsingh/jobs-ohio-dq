import React from "react";
import "./Style.css";
const LabelInput = ({ label, type, onChange , onBlur,value, maxLength , disabled , placeholder }) => {

  const handleFocus = () => {;
  };
  const handleBlur = (e) => {
    if (!e?.target?.value) {
      onBlur && onBlur(e);
    }
  };
  return (
    <div>
      <label className="label-floating">{label}</label>
      <input
       autoComplete="current-password"
        className="input-floating-label"
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LabelInput;
