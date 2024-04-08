import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
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
