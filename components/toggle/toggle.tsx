"use client";

import React from "react";

type ToggleProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = "md",
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  const sizeStyles = {
    sm: {
      wrapper: "w-10 h-6",
      circle: "w-5 h-5",
      translate: "translate-x-4",
    },
    md: {
      wrapper: "w-14 h-8",
      circle: "w-7 h-7",
      translate: "translate-x-6",
    },
    lg: {
      wrapper: "w-16 h-9",
      circle: "w-8 h-8",
      translate: "translate-x-7",
    },
  };

  const styles = sizeStyles[size];

  const wrapperClass = `
    ${styles.wrapper}
    relative inline-flex rounded-full
    ${checked ? "bg-green-500 dark:bg-green-600" : "bg-gray-300 dark:bg-gray-600"}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    transition-colors duration-300 ease-out
    focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500
    dark:focus-within:ring-offset-slate-950
  `;

  const circleClass = `
    ${styles.circle}
    absolute top-0.5 left-0.5
    bg-white shadow-md rounded-full
    ${checked ? styles.translate : "translate-x-0"}
    transition-transform duration-300 ease-out
  `;

  return (
    <div className="flex items-center gap-3">
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label || "Toggle"}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={wrapperClass}
      >
        <div className={circleClass} />
      </button>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
};

export default Toggle;
