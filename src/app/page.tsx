"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RetroWindow from "@/components/RetroWindow";
import { GALLERY_PUZZLES } from "@/lib/puzzles";

export default function HomePage() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");

  const handleSupport = (tier: string) => {
    setSupportMessage(`Thank you for supporting Love Puzzle (${tier})! Your love keeps this server cozy and ad-free! ♥`);
  };

  return (
    <div className="min-h-screen bg-[#15101C] text-purple-50 font-sans flex flex-col selection:bg-pink-500 selection:text-white">
      <Navbar />

      {/* Hero Section with Retro Vine Pattern Motif */}
      <section className="relative overflow-hidden border-b border-purple-900/50 bg-gradient-to-b from-[#1E1726] via-[#191221] to-[#15101C] py-14 sm:py-20 px-4">
        {/* Retro Vine SVG Background Motif */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
          <svg
            className="w-full h-full text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 800 300"
            preserveAspectRatio="none"
          >
            <path d="M0 150 Q 200 50, 400 150 T 800 150" strokeWidth="4" strokeDasharray="8 8" />
            <path d="M0 80 Q 250 220, 500 80 T 800 220" strokeWidth="3" opacity="0.6" />
            <circle cx="150" cy="100" r="12" fill="currentColor" opacity="0.3" />
            <circle cx="350" cy="180" r="16" fill="currentColor" opacity="0.4" />
            <circle cx="600" cy="90" r="14" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          {/* Retro Online Badge */}
          <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/40 text-pink-300 px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-bold">● ONLINE</span>
            <span>— 1,420 Active Puzzle Solvers</span>
          </div>

          {/* Main Pixel Styled Title */}
          <div className="space-y-3">
            <h1 className="font-mono text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D8D] via-purple-300 to-[#FF6FA5] drop-shadow-[0_4px_16px_rgba(255,77,141,0.35)] flex items-center justify-center gap-3">
              <span className="text-[#FF4D8D] animate-pulse">♥</span> LOVE PUZZLE <span className="text-[#FF4D8D] animate-pulse">♥</span>
            </h1>
            <p className="text-base sm:text-xl text-purple-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Assemble jigsaw puzzles with friends, family, or community in real-time. Free, no ads, cozy retro vibes.
            </p>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 text-xs font-mono">
            <span className="bg-[#241B2D] border border-purple-800/60 px-3 py-1.5 rounded-lg text-purple-300 shadow-sm flex items-center gap-1.5">
              <span className="text-pink-500">♥</span> 100% Free & No Ads
            </span>
            <span className="bg-[#241B2D] border border-purple-800/60 px-3 py-1.5 rounded-lg text-purple-300 shadow-sm flex items-center gap-1.5">
              <span className="text-emerald-400">🌿</span> Tanggle-inspired Gameplay
            </span>
            <span className="bg-[#241B2D] border border-purple-800/60 px-3 py-1.5 rounded-lg text-purple-300 shadow-sm flex items-center gap-1.5">
              <span className="text-blue-400">👾</span> Retro Pixel Windows
            </span>
            <span className="bg-[#241B2D] border border-purple-800/60 px-3 py-1.5 rounded-lg text-purple-300 shadow-sm flex items-center gap-1.5">
              <span className="text-amber-400">👥</span> Real-time Co-op Rooms
            </span>
          </div>

          {/* Quick Play Button */}
          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/room/cozy-cottage"
              className="btn-retro-pink font-mono font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>QUICK PLAY NOW</span>
            </Link>
            <Link
              href="/rooms"
              className="bg-[#241B2D] hover:bg-purple-900/50 border border-purple-700/60 font-mono font-bold text-sm px-5 py-3 rounded-xl text-purple-200 transition-colors flex items-center gap-2"
            >
              <span>BROWSE ROOMS</span>
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Main Action Cards Section (Tanggle Layout from Canvas) */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Public Rooms */}
          <div className="relative group bg-[#241B2D] border border-purple-800/50 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:border-pink-500/60 transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-4 right-4 bg-pink-500/20 text-pink-300 font-mono text-xs px-2.5 py-1 rounded-full border border-pink-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              <span>18 live</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-purple-900/40 text-purple-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>

            <h3 className="font-mono text-xl font-bold text-purple-50 mb-2">Public rooms</h3>
            <p className="text-sm text-purple-300/70 mb-6 max-w-xs leading-relaxed">
              Assemble puzzles with strangers in active public co-op lobbies right now.
            </p>

            <Link
              href="/rooms"
              className="w-full mt-auto bg-purple-900/40 hover:bg-pink-500 hover:text-white text-purple-200 font-mono font-bold text-xs sm:text-sm py-2.5 rounded-xl border border-purple-700/50 transition-colors flex items-center justify-center gap-2"
            >
              <span>JOIN LOBBY</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Card 2: Gallery */}
          <div className="relative group bg-[#241B2D] border border-purple-800/50 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:border-pink-500/60 transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative w-full h-24 mb-4 flex items-center justify-center">
              <div className="absolute w-28 h-20 bg-purple-900/40 rounded-lg transform -rotate-6 scale-90 border border-purple-700/40"></div>
              <div className="absolute w-28 h-20 bg-pink-900/40 rounded-lg transform rotate-6 scale-95 border border-pink-700/40"></div>
              <div className="relative w-28 h-20 bg-gradient-to-tr from-pink-500/20 to-purple-600/40 rounded-lg border border-purple-400/40 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <h3 className="font-mono text-xl font-bold text-purple-50 mb-2">Gallery</h3>
            <p className="text-sm text-purple-300/70 mb-6 max-w-xs leading-relaxed">
              Pick puzzle from gallery of anime, pixel art, landscapes, and cozy illustrations.
            </p>

            <Link
              href="/gallery"
              className="w-full mt-auto bg-purple-900/40 hover:bg-pink-500 hover:text-white text-purple-200 font-mono font-bold text-xs sm:text-sm py-2.5 rounded-xl border border-purple-700/50 transition-colors flex items-center justify-center gap-2"
            >
              <span>BROWSE GALLERY</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Card 3: Custom Upload */}
          <div className="relative group bg-[#1E1727] border-2 border-dashed border-purple-700/60 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:border-pink-500 transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-pink-500/20 text-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>

            <h3 className="font-mono text-xl font-bold text-purple-50 mb-2">Custom</h3>
            <p className="text-sm text-purple-300/70 mb-6 max-w-xs leading-relaxed">
              Upload your own image, select piece count, and generate a private room link.
            </p>

            <Link
              href="/custom"
              className="w-full mt-auto btn-retro-pink font-mono font-bold text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
              <span>UPLOAD IMAGE</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Puzzles Quick Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-pink-500 text-lg">♥</span>
            <h2 className="font-mono text-xl font-bold text-purple-100">Popular Puzzles</h2>
          </div>
          <Link href="/gallery" className="font-mono text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1">
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PUZZLES.slice(0, 3).map((puzzle) => (
            <div
              key={puzzle.id}
              className="group bg-[#241B2D] border border-purple-800/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-pink-500/60 transition-all flex flex-col"
            >
              <div className="relative h-44 bg-purple-950/60 overflow-hidden flex items-center justify-center">
                <img
                  src={puzzle.imageUrl}
                  alt={puzzle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/20">
                  🧩 {puzzle.pieces} PCS
                </div>
                <div className="absolute top-3 right-3 bg-pink-500/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <span>● {puzzle.activePlayersCount || 24} playing</span>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-mono text-base font-bold text-purple-50 group-hover:text-pink-400 transition-colors">
                  {puzzle.title}
                </h3>
                <p className="text-xs text-purple-400 mb-4">{puzzle.artist}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                    {puzzle.difficulty}
                  </span>
                  <Link
                    href={`/room/${puzzle.id}`}
                    className="btn-retro-pink font-mono font-bold text-xs px-3 py-1.5 rounded-lg"
                  >
                    PLAY NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Us Section (Tanggle Inspired with Chibi Mascots from Canvas) */}
      <section className="max-w-5xl mx-auto px-4 my-8 sm:my-12 w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E1628] via-[#251C33] to-[#1E1628] border border-pink-500/30 p-8 sm:p-12 text-center shadow-xl">
          {/* Left Chibi Mascot (Chibi Mouse with Heart) */}
          <div className="hidden lg:flex absolute left-6 bottom-4 items-end pointer-events-none">
            <div className="flex flex-col items-center">
              <div className="text-xs font-mono bg-pink-500 text-white px-2 py-0.5 rounded-full mb-1 animate-bounce">
                Thank you! ♥
              </div>
              <div className="w-24 h-24 bg-pink-500/20 border-2 border-pink-500/40 rounded-2xl flex flex-col items-center justify-center p-2 text-pink-500">
                <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-[10px] font-mono font-bold text-purple-300">CHIBI MOUSE</span>
              </div>
            </div>
          </div>

          {/* Right Chibi Mascot (Pixel Cat) */}
          <div className="hidden lg:flex absolute right-6 bottom-4 items-end pointer-events-none">
            <div className="flex flex-col items-center">
              <div className="text-xs font-mono bg-emerald-500 text-white px-2 py-0.5 rounded-full mb-1 animate-pulse">
                Super Cozy! 🌿
              </div>
              <div className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-2xl flex flex-col items-center justify-center p-2 text-emerald-400">
                <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span className="text-[10px] font-mono font-bold text-purple-300">PIXEL CAT</span>
              </div>
            </div>
          </div>

          {/* Center Content */}
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <h2 className="font-mono text-2xl sm:text-3xl font-black text-[#FF4D8D] flex items-center justify-center gap-2">
              <span>♥</span> Support us <span>♥</span>
            </h2>
            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed font-medium">
              Love Puzzle is free to play, with no ads to interrupt your cozy puzzle sessions. You will help us a lot if you spread the word or become a supporter!
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="btn-retro-pink font-mono font-bold text-sm px-6 py-2.5 rounded-xl inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>Subscribe ($3/mo)</span>
              </button>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-4">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span className="w-2 h-2 rounded-full bg-purple-700"></span>
              <span className="w-2 h-2 rounded-full bg-purple-700"></span>
              <span className="w-2 h-2 rounded-full bg-purple-700"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Dialog (Retro Window) */}
      <RetroWindow
        title="SUPPORT LOVE PUZZLE"
        isOpen={isSupportModalOpen}
        onClose={() => {
          setIsSupportModalOpen(false);
          setSupportMessage("");
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white win95-inset rounded">
            <span className="text-3xl">🐱</span>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Pixel Supporter Club</h4>
              <p className="text-xs text-slate-600">Get cozy golden heart flair & custom puzzle presets</p>
            </div>
          </div>

          {supportMessage ? (
            <div className="p-3 bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-bold rounded">
              {supportMessage}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => handleSupport("Coffee Supporter - $3")}
                className="win95-btn py-2 px-3 font-bold flex flex-col items-center gap-1"
              >
                <span>☕ Buy Coffee</span>
                <span className="text-pink-600 font-extrabold">$3 / month</span>
              </button>
              <button
                onClick={() => handleSupport("Super Cat - $10")}
                className="win95-btn py-2 px-3 font-bold flex flex-col items-center gap-1"
              >
                <span>👑 Super Cat</span>
                <span className="text-emerald-700 font-extrabold">$10 / month</span>
              </button>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                setIsSupportModalOpen(false);
                setSupportMessage("");
              }}
              className="win95-btn px-4 py-1.5 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </RetroWindow>

      <Footer />
    </div>
  );
}
