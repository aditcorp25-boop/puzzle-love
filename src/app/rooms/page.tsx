"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { GALLERY_PUZZLES } from "@/lib/puzzles";

const INITIAL_ROOMS = [
  {
    id: "cozy-cottage",
    name: "Cozy Stream Sunday Chill",
    puzzleTitle: "Cozy Cottage Stream",
    pieces: 24,
    playersCount: 3,
    maxPlayers: 4,
    progress: 75,
    host: "@PixelCat",
    imageUrl: GALLERY_PUZZLES[0].imageUrl,
  },
  {
    id: "cyber-neon-city",
    name: "Night Owls Cyber Jam",
    puzzleTitle: "Retro Cyber Neon City",
    pieces: 30,
    playersCount: 2,
    maxPlayers: 4,
    progress: 40,
    host: "@NeonRider",
    imageUrl: GALLERY_PUZZLES[1].imageUrl,
  },
  {
    id: "sunset-coffee-bakery",
    name: "Morning Matcha & Bakery",
    puzzleTitle: "Sunset Coffee Bakery",
    pieces: 20,
    playersCount: 1,
    maxPlayers: 4,
    progress: 10,
    host: "@MochiLover",
    imageUrl: GALLERY_PUZZLES[2].imageUrl,
  },
  {
    id: "magical-forest-shrine",
    name: "Forest Spirit Gathering",
    puzzleTitle: "Magical Forest Shrine",
    pieces: 24,
    playersCount: 4,
    maxPlayers: 4,
    progress: 90,
    host: "@TotoroFan",
    imageUrl: GALLERY_PUZZLES[3].imageUrl,
  },
];

export default function RoomsPage() {
  const [filter, setFilter] = useState<"all" | "open" | "nearly-done">("all");

  const filteredRooms = INITIAL_ROOMS.filter((room) => {
    if (filter === "open") return room.playersCount < room.maxPlayers;
    if (filter === "nearly-done") return room.progress >= 70;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#15101C] text-purple-50 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-6xl mx-auto py-10 px-4 sm:px-8 w-full flex-1 space-y-8">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/50 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE MULTIPLAYER LOBBIES</span>
            </div>
            <h1 className="font-mono text-3xl sm:text-4xl font-black text-white">Public Rooms</h1>
            <p className="text-xs text-purple-300/70 mt-1">
              Hop into any open lobby to co-solve puzzles in real-time with fellow players!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/custom"
              className="btn-retro-pink font-mono font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Icon className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </Icon>
              <span>HOST NEW ROOM</span>
            </Link>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === "all"
                ? "btn-retro-pink font-bold"
                : "bg-[#241B2D] border border-purple-800 text-purple-300 hover:border-pink-500"
            }`}
          >
            All Lobbies ({INITIAL_ROOMS.length})
          </button>
          <button
            onClick={() => setFilter("open")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === "open"
                ? "btn-retro-pink font-bold"
                : "bg-[#241B2D] border border-purple-800 text-purple-300 hover:border-pink-500"
            }`}
          >
            Open Slots Only
          </button>
          <button
            onClick={() => setFilter("nearly-done")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === "nearly-done"
                ? "btn-retro-pink font-bold"
                : "bg-[#241B2D] border border-purple-800 text-purple-300 hover:border-pink-500"
            }`}
          >
            Nearly Finished (≥70%)
          </button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRooms.map((room) => {
            const isFull = room.playersCount >= room.maxPlayers;
            return (
              <div
                key={room.id}
                className="bg-[#241B2D] border border-purple-800/60 rounded-2xl p-5 shadow-lg flex gap-4 hover:border-pink-500/60 transition-all"
              >
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-purple-950 flex-shrink-0 relative border border-purple-700/50">
                  <img
                    src={room.imageUrl}
                    alt={room.puzzleTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs font-mono text-[9px] text-white px-1.5 py-0.5 rounded">
                    {room.pieces} PCS
                  </div>
                </div>

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-sm font-bold text-white leading-tight">
                        {room.name}
                      </h3>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isFull
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        {room.playersCount}/{room.maxPlayers} Players
                      </span>
                    </div>
                    <p className="text-xs text-purple-400 mt-1">Host: {room.host}</p>
                    <p className="text-xs text-purple-300/80">{room.puzzleTitle}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 my-2">
                    <div className="flex justify-between text-[10px] font-mono text-purple-400">
                      <span>Progress</span>
                      <span className="font-bold text-pink-400">{room.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#171120] rounded-full overflow-hidden border border-purple-800/40">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-emerald-400 rounded-full transition-all duration-300"
                        style={{ width: `${room.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Join Action */}
                  <div className="flex justify-end pt-1">
                    <Link
                      href={`/room/${room.id}`}
                      className="btn-retro-pink font-mono font-bold text-xs px-4 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <span>JOIN ROOM</span>
                      <Icon className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </Icon>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
