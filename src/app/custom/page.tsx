"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";

const PIECE_COUNTS = [16, 24, 36, 48] as const;

export default function CustomUploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [roomName, setRoomName] = useState("My Cozy Puzzle Room #1");
  const [pieceCount, setPieceCount] = useState<number>(24);
  const [isPublic, setIsPublic] = useState(false);

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
                  <Icon className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </Icon>
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
              className="w-full btn-retro-pink font-mono font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>GENERATE PUZZLE ROOM</span>
              <Icon className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </Icon>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
