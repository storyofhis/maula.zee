"use client";

import { useState, useRef, ReactNode } from "react";

export function CodeBlock({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const textInput = useRef<HTMLDivElement>(null);

  const onCopy = async () => {
    if (!textInput.current) return;
    try {
      const text = textInput.current.innerText || textInput.current.textContent || "";
      
      if (navigator.clipboard && window.isSecureContext) {
        // Modern approach
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for iframes or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error("Fallback copy failed", error);
        } finally {
          textArea.remove();
        }
      }
      
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group my-6">
      <button
        onClick={onCopy}
        className="absolute right-3 top-3 px-3 py-1.5 bg-slate-700/80 hover:bg-slate-600 text-slate-300 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-1.5 text-xs font-medium backdrop-blur-sm border border-slate-600 shadow-sm"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span className="text-green-400">Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            Copy
          </>
        )}
      </button>
      <div ref={textInput} className="w-full">
        {children}
      </div>
    </div>
  );
}
