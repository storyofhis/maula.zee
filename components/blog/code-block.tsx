"use client";

import { useState, useRef, ReactNode } from "react";

export function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onCopy = async () => {
    try {
      if (!containerRef.current) return;

      // Get all text content from the pre > code element
      const codeElement = containerRef.current.querySelector("code");
      let textToCopy = "";

      if (codeElement) {
        // Get text node by node to preserve structure without HTML
        const walker = document.createTreeWalker(
          codeElement,
          NodeFilter.SHOW_TEXT,
          null
        );

        let node;
        while ((node = walker.nextNode())) {
          textToCopy += node.textContent;
        }
      } else {
        // Fallback to pre's textContent
        const preElement = containerRef.current.querySelector("pre");
        textToCopy = preElement?.textContent || "";
      }

      // Clean up the text
      textToCopy = textToCopy.trim();

      if (!textToCopy) {
        console.error("No code to copy");
        return;
      }

      // Copy to clipboard
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative group my-6 bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
    >
      <button
        onClick={onCopy}
        className="absolute right-3 top-3 px-2 py-1 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20 flex items-center gap-1.5"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h2V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1V4z" />
            </svg>
            Copy
          </>
        )}
      </button>
      <pre className="!m-0 !p-4 !bg-transparent overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}
