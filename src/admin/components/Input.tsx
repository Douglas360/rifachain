import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...inputProps }) => {
  return (
    <div className="mb-1">
      {label && (
        <label className="block  text-slate-700" htmlFor={inputProps.id}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className="px-3 py-2 border rounded-md w-full focus:outline-none focus:border-primary"
      />
    </div>
  );
};

export default Input;
