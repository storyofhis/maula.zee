import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
};

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled,
    variant = "primary",
    size = "md",
}) => {
    const baseStyles =
        "font-medium rounded-2xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 backdrop-blur-sm";

    const sizeStyles = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };

    const variantStyles = {
        primary: disabled
            ? "bg-gray-200/50 text-gray-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"
            : "bg-gradient-to-br from-slate-900 to-slate-800 text-white hover:shadow-xl hover:shadow-slate-900/20 focus:ring-slate-700 active:from-slate-800 active:to-slate-700 dark:from-white dark:to-slate-200 dark:text-slate-900 dark:hover:shadow-white/20 dark:focus:ring-white dark:active:from-slate-200 dark:active:to-slate-300",
        secondary: disabled
            ? "bg-gray-200/50 text-gray-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-500"
            : "bg-gray-100 text-slate-900 hover:bg-gray-200 hover:shadow-md hover:shadow-gray-300/30 focus:ring-gray-300 active:bg-gray-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:hover:shadow-slate-900/50 dark:focus:ring-slate-700 dark:active:bg-slate-600",
        outline: disabled
            ? "border-2 border-gray-300 text-gray-400 cursor-not-allowed dark:border-slate-700 dark:text-slate-500"
            : "border-2 border-slate-300 text-slate-900 hover:bg-slate-50/50 hover:shadow-md hover:border-slate-400 focus:ring-slate-300 active:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800/50 dark:hover:border-slate-600 dark:focus:ring-slate-700 dark:active:bg-slate-800",
    };

    const classNames = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;

    return (
        <button onClick={onClick} disabled={disabled} className={classNames}>
            {children}
        </button>
    );
};

export default Button;