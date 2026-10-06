import React from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  variant?: "primary" | "secondary" | "text";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) => {
  const baseStyle =
    "relative inline-flex items-center justify-center whitespace-nowrap font-mono text-xs font-bold tracking-[0.06em] uppercase transition-colors duration-500 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "px-8 py-4 bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-[var(--btn-bg)] hover:bg-[var(--btn-hover-bg)] hover:text-[var(--btn-hover-fg)] hover:border-[var(--accent-edge)]";
      case "secondary":
        return "px-8 py-4 bg-transparent text-text-primary border border-[var(--line-strong)] hover:border-text-primary hover:bg-text-primary hover:text-background";
      case "text":
        return "px-0 py-2 bg-transparent text-text-primary hover:text-accent border-b border-transparent hover:border-accent rounded-none";
      default:
        return "";
    }
  };

  const content = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 select-none"
    >
      {children}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${getVariantStyles()} ${className}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`${baseStyle} ${getVariantStyles()} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${getVariantStyles()} ${className}`}
    >
      {content}
    </button>
  );
};
