"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-zinc-950 z-[100] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50"
        >
          ZEE<span className="text-zinc-400">.</span>
        </motion.div>
        
        <div className="w-48 h-[1px] bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 w-full h-full bg-zinc-900 dark:bg-zinc-100"
          />
        </div>
      </div>
    </div>
  );
}
