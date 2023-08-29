import React from 'react';

const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border rounded mt-2"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
