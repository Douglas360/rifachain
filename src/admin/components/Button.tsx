import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick, ...rest }) => {
  return (
    <button onClick={onClick} {...rest}>
      {icon}
      {icon && <span className="ml-2"></span>}
      {text}
    </button>
  );
};

export default Button;
