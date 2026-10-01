"use client";

import React from "react";

interface RetroWindowProps {
  title: string;
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function RetroWindow({
  title,
  isOpen,
  onClose,
  children,
  icon,
  className = "",
}: RetroWindowProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={`w-full max-w-lg bg-[#D4D0C8] border-2 border-white rounded shadow-[8px_8px_0_0_rgba(0,0,0,0.6)] font-mono text-slate-900 win95-outset ${className}`}
      >
        {/* Retro Blue Chrome Title Bar */}
        <div className="bg-gradient-to-r from-[#1C5FCC] to-[#2E6FE0] px-3 py-1.5 flex items-center justify-between text-white border-b-2 border-[#1448A0]">
          <div className="flex items-center gap-2">
            {icon || (
              <svg className="w-4 h-4 fill-current text-pink-300" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            <span className="text-xs font-bold tracking-wider uppercase drop-shadow-xs">
              {title}
            </span>
          </div>

          {/* Retro Red [X] Close Box */}
          {onClose && (
            <button
              onClick={onClose}
              className="w-5 h-5 bg-[#E63946] hover:bg-rose-500 border border-white text-white flex items-center justify-center text-xs font-black shadow-xs leading-none active:translate-y-px"
              aria-label="Close window"
            >
              ×
            </button>
          )}
        </div>

        {/* Modal Window Content */}
        <div className="p-4 sm:p-6 bg-[#D4D0C8] text-slate-900">{children}</div>
      </div>
    </div>
  );
}
