"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = {
    label: string;
    href: string;
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const links: NavLink[] = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 px-4 py-6 flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`
                    pointer-events-auto
                    flex items-center gap-4 px-6 py-3 rounded-full 
                    transition-all duration-500 ease-in-out
                    ${scrolled 
                        ? "glass shadow-2xl shadow-zinc-950/10 dark:shadow-white/5 py-2 px-4" 
                        : "bg-transparent"}
                `}
            >
                {/* Logo */}
                {/* <Link href="/" className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mr-4">
                    ZEE<span className="text-zinc-400">.</span>
                </Link> */}

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 rounded-full text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block mx-2" /> */}

                {/* Theme Toggle */}
                {/* <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
                    aria-label="Toggle theme"
                >
                    {isMounted ? (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <div className="w-[18px] h-[18px]" />}
                </button> */}

                {/* Mobile Menu Toggle */}
                {/* <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button> */}
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 top-24 px-4 pointer-events-none md:hidden"
                    >
                        <div className="glass rounded-3xl p-6 pointer-events-auto space-y-4">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-500 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;