"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetroWindow from "@/components/RetroWindow";

const PIECE_COUNTS = [16, 24, 36, 48] as const;

export default function CustomUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [roomName, setRoomName] = useState("My Cozy Puzzle Room #1");
  const [pieceCount, setPieceCount] = useState<number>(24);
  const [isPublic, setIsPublic] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Retro Dialog demo state
  const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateRoom = () => {
    setIsGenerating(true);
    setLoadingProgress(15);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            const customId = "custom-" + Date.now().toString(36);
            if (imagePreview) {
              sessionStorage.setItem(
                `love_puzzle_${customId}`,
                JSON.stringify({
                  title: roomName,
                  imageUrl: imagePreview,
                  pieces: pieceCount,
                  isPublic,
                })
              );
            }
            router.push(`/room/${customId}`);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#15101C] text-purple-50 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-8 w-full flex-1 space-y-8">
        {/* Title Banner */}
        <div className="text-center space-y-2">
          <span className="bg-pink-500/20 text-pink-300 font-mono text-xs font-bold px-3 py-1 rounded-full border border-pink-500/30 inline-block">
            ✨ CUSTOM PUZZLE GENERATOR
          </span>
          <h1 className="font-mono text-3xl sm:text-4xl font-black text-white">Upload Your Image</h1>
          <p className="text-sm text-purple-300/70 max-w-md mx-auto">
            Turn any photo, artwork, or meme into an interactive jigsaw puzzle room in seconds.
          </p>
        </div>

        {/* Drag & Drop Upload Zone + Settings Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-pink-500/40 bg-[#1F172B] rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:bg-[#251B35] transition-all cursor-pointer relative min-h-[320px] overflow-hidden"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {imagePreview ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center space-y-3">
                <img
                  src={imagePreview}
                  alt="Custom preview"
                  className="max-h-56 max-w-full rounded-xl object-contain border border-purple-700/60 shadow-md"
                />
                <span className="text-xs font-mono text-pink-400 font-bold bg-black/60 px-3 py-1 rounded-full border border-pink-500/30">
                  Click or drag to change image
                </span>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h3 className="font-mono text-lg font-bold text-purple-100 mb-1">
                  Drag & drop your image here
                </h3>
                <p className="text-xs text-purple-400 mb-4">Supports PNG, JPG, WEBP (Up to 20MB)</p>
                <button
                  type="button"
                  className="btn-retro-pink font-mono font-bold text-xs px-4 py-2 rounded-xl"
                >
                  BROWSE FILE
                </button>
              </>
            )}
          </div>

          {/* Puzzle Options & Settings */}
          <div className="bg-[#241B2D] border border-purple-800/50 rounded-3xl p-6 shadow-lg space-y-6">
            <h3 className="font-mono text-lg font-bold text-purple-50 flex items-center gap-2">
              <span>⚙️</span> Puzzle Settings
            </h3>

            {/* Room Title Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-purple-300">Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full bg-[#171120] border border-purple-800/60 rounded-xl px-3.5 py-2 text-sm font-sans text-purple-100 focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Piece Count Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-purple-300">Piece Count</label>
              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                {PIECE_COUNTS.map((count) => {
                  const isSelected = pieceCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setPieceCount(count)}
                      className={`py-2 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? "btn-retro-pink font-bold shadow-xs"
                          : "border border-purple-800 text-purple-300 hover:border-pink-500 bg-[#1A1222]"
                      }`}
                    >
                      {count} pcs
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Privacy Option */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-purple-300">Room Privacy</label>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`p-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    isPublic
                      ? "bg-pink-500/20 border-2 border-pink-500 text-pink-300"
                      : "bg-[#191222] border border-purple-800 text-purple-300 hover:border-purple-600"
                  }`}
                >
                  <span>🌐 Public Room</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`p-3 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    !isPublic
                      ? "bg-pink-500/20 border-2 border-pink-500 text-pink-300"
                      : "bg-[#191222] border border-purple-800 text-purple-300 hover:border-purple-600"
                  }`}
                >
                  <span>🔒 Private (Link)</span>
                </button>
              </div>
            </div>

            {/* Create Button */}
            <button
              type="button"
              onClick={handleGenerateRoom}
              disabled={isGenerating}
              className="w-full btn-retro-pink font-mono font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4m0 8v4m4-12h-4m12 4h-4" />
                  </svg>
                  <span>GENERATING MESH... {loadingProgress}%</span>
                </>
              ) : (
                <>
                  <span>GENERATE PUZZLE ROOM</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Retro Game UI Showcase from Canvas */}
        <section className="border-t border-purple-900/50 pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xl font-bold text-purple-100 flex items-center gap-2">
              <span>🎮</span> Retro Game UI Components (PRD Spec)
            </h2>
            <button
              onClick={() => setIsResetPopupOpen(true)}
              className="win95-btn px-3 py-1 text-xs font-mono font-bold cursor-pointer"
            >
              Open Win95 Popup
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Component 1: Retro Pixel Loading Bar (PRD 4.2 & Canvas) */}
            <div className="bg-[#1E1729] border border-purple-800/60 rounded-2xl p-6 font-mono space-y-4 shadow-md">
              <div className="flex items-center justify-between text-xs text-purple-300">
                <span className="font-bold text-pink-400">SYSTEM COMPONENT: LOADING SCREEN</span>
                <span>PRD 4.2</span>
              </div>

              <div className="bg-[#15101C] p-6 rounded-xl border border-purple-800/80 text-center space-y-4">
                <div className="text-xs font-bold text-[#FF4D8D] tracking-widest animate-pulse">
                  LOADING PUZZLE PIECES...
                </div>

                <div className="w-full max-w-xs mx-auto h-6 bg-[#2A2235] border-2 border-purple-700 p-1 flex gap-1">
                  <div className="h-full w-full bg-[#1C5FCC] border-r border-blue-400"></div>
                  <div className="h-full w-full bg-[#1C5FCC] border-r border-blue-400"></div>
                  <div className="h-full w-full bg-[#1C5FCC] border-r border-blue-400"></div>
                  <div className="h-full w-full bg-[#1C5FCC] border-r border-blue-400"></div>
                  <div className="h-full w-full bg-[#1C5FCC] border-r border-blue-400"></div>
                  <div className="h-full w-full bg-[#1C5FCC] border-r border-blue-400"></div>
                  <div className="h-full w-full bg-purple-900/40"></div>
                  <div className="h-full w-full bg-purple-900/40"></div>
                </div>

                <span className="text-[10px] text-purple-400 block font-bold">75% GENERATING MESH</span>
              </div>
            </div>

            {/* Component 2: Retro Window Confirmation Popup (Canvas preview) */}
            <div className="bg-[#1E1729] border border-purple-800/60 rounded-2xl p-6 font-mono space-y-4 shadow-md">
              <div className="flex items-center justify-between text-xs text-purple-300">
                <span className="font-bold text-blue-400">RETRO WINDOW POPUP</span>
                <span>PRD 4.1</span>
              </div>

              <div className="bg-[#D4D0C8] border-2 border-white rounded shadow-md overflow-hidden text-slate-900 win95-outset">
                <div className="bg-gradient-to-r from-[#1C5FCC] to-[#2E6FE0] px-2.5 py-1 text-white flex items-center justify-between text-[11px] font-bold">
                  <span>RESET PUZZLE ROOM</span>
                  <div className="w-4 h-4 bg-[#E63946] border border-white text-white flex items-center justify-center text-[10px]">
                    ×
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <p className="text-xs leading-relaxed font-bold">
                    DO YOU WANT TO RESET YOUR LOVE PUZZLE ROOM NOW? ALL PROGRESS WILL BE CLEARED.
                  </p>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => alert("Room Reset!")}
                      className="win95-btn px-4 py-1 text-xs font-bold"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {}}
                      className="win95-btn px-4 py-1 text-xs font-bold"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Confirmation Modal */}
      <RetroWindow
        title="CONFIRM RESET"
        isOpen={isResetPopupOpen}
        onClose={() => setIsResetPopupOpen(false)}
      >
        <div className="space-y-4 font-mono text-xs">
          <p className="font-bold leading-relaxed text-slate-900">
            ARE YOU SURE YOU WANT TO CLEAR THIS SESSION AND START FRESH?
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setImagePreview(null);
                setIsResetPopupOpen(false);
              }}
              className="win95-btn px-4 py-1.5 font-bold"
            >
              Yes
            </button>
            <button
              onClick={() => setIsResetPopupOpen(false)}
              className="win95-btn px-4 py-1.5 font-bold"
            >
              No
            </button>
          </div>
        </div>
      </RetroWindow>

      <Footer />
    </div>
  );
}
