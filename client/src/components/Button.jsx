import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", ...props }) => {
    const baseStyle = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary hover:bg-green-700 text-white shadow-lg shadow-green-500/30",
        secondary: "bg-secondary hover:bg-green-500 text-green-900 shadow-lg shadow-green-400/30",
        outline: "border-2 border-primary text-primary hover:bg-primary/10"
    };

    return (
        <button
            type={type}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
