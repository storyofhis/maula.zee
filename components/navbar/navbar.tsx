"use client";

import React, { useState } from "react";
import Link from "next/link";
import Toggle from "@/components/toggle/toggle";
import { useTheme } from "@/components/providers/theme-provider";

type NavLink = {
    label: string;
    href: string;
};

type NavbarProps = {
    logo?: string;
    links?: NavLink[];
    onLinkClick?: (href: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({
    logo = "Portfolio",
    links = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
    ],
    onLinkClick,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleLinkClick = (href: string) => {
        setIsOpen(false);
        onLinkClick?.(href);
    };

    const handleThemeToggle = () => {
        toggleTheme();
    };

    return (
        <nav className="fixed top-0 w-full z-50">
            {/* Backdrop blur effect */}
            <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/30 backdrop-blur-2xl border-b border-white/20 dark:border-slate-800/30" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="text-2xl sm:text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
                        >
                            {logo}
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => handleLinkClick(link.href)}
                                className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 ease-out font-medium text-sm sm:text-base hover:text-slate-900 dark:hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Dark Mode Toggle */}
                        {/* <Toggle
                            checked={theme === "dark"}
                            onChange={handleThemeToggle}
                            size="md"
                        /> */}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className={`w-6 h-6 text-slate-700 dark:text-white transition-transform duration-300 ${
                                isOpen ? "rotate-90" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    isOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden border-t border-white/20 dark:border-slate-800/30 mt-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="bg-white/50 dark:bg-slate-950/50 backdrop-blur-2xl rounded-2xl m-2 p-2">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => handleLinkClick(link.href)}
                                    className="block px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300 font-medium text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {/* Dark Mode Toggle Mobile */}
                            {/* <div className="px-4 py-3">
                                <Toggle
                                    checked={theme === "dark"}
                                    onChange={handleThemeToggle}
                                    size="md"
                                    label="Dark Mode"
                                />
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;