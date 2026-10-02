"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { GALLERY_PUZZLES } from "@/lib/puzzles";

const CATEGORIES = [
  "✨ All Categories",
  "👾 Pixel Art",
  "🐱 Cute Animals",
  "🌲 Retro Landscapes",
  "🎨 Cozy Illustrations",
  "☕ Coffee & Bakery",
] as const;

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("✨ All Categories");
  const [sortBy, setSortBy] = useState("Most Popular");

  const filteredPuzzles = useMemo(() => {
    return GALLERY_PUZZLES.filter((puzzle) => {
      const matchesSearch =
        puzzle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        puzzle.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        puzzle.category.toLowerCase().includes(searchQuery.toLowerCase());

      const rawCategory = selectedCategory.replace(/^[^\w\s]+\s*/, "");
      const matchesCategory =
        selectedCategory === "✨ All Categories" || puzzle.category === rawCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === "Most Popular") {
        return (b.activePlayersCount || 0) - (a.activePlayersCount || 0);
      }
      if (sortBy === "Easiest (100 pcs)") {
        return a.pieces - b.pieces;
      }
      if (sortBy === "Expert (1000 pcs)") {
        return b.pieces - a.pieces;
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#15101C] text-purple-50 font-sans flex flex-col">
      <Navbar />

      {/* Gallery Header Banner & Search Filters */}
      <section className="border-b border-purple-900/50 bg-[#1A1224] py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-pink-400 font-bold mb-1">
                <span>🖼️ EXPLORE 1,240+ ARTWORKS</span>
              </div>
              <h1 className="font-mono text-3xl sm:text-4xl font-black text-white">Puzzle Gallery</h1>
            </div>

            {/* Search Bar & Sort Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Icon
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </Icon>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search puzzles by title or tag..."
                  className="w-full bg-[#241B2D] border border-purple-800/60 rounded-xl pl-10 pr-4 py-2 text-sm text-purple-100 placeholder-purple-400 focus:outline-none focus:border-pink-500 font-sans shadow-sm"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#241B2D] border border-purple-800/60 rounded-xl px-3 py-2 text-xs font-mono text-purple-200 focus:outline-none focus:border-pink-500 shadow-sm cursor-pointer"
              >
                <option>Most Popular</option>
                <option>Newest First</option>
                <option>Easiest (100 pcs)</option>
                <option>Expert (1000 pcs)</option>
              </select>
            </div>
          </div>

          {/* Retro Category Filter Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "btn-retro-pink font-bold shadow-sm"
                      : "bg-[#241B2D] hover:border-pink-500 border border-purple-800/60 text-purple-300 font-semibold"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Puzzle Cards Grid */}
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-8 w-full flex-1">
        {filteredPuzzles.length === 0 ? (
          <div className="text-center py-16 space-y-3 font-mono">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-purple-200">No puzzles found</h3>
            <p className="text-xs text-purple-400">Try adjusting your search query or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPuzzles.map((puzzle) => (
              <div
                key={puzzle.id}
                className="group bg-[#241B2D] border border-purple-800/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-pink-500/60 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 bg-purple-950/50 overflow-hidden flex items-center justify-center">
                  <Image
                    src={puzzle.imageUrl}
                    alt={puzzle.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white font-mono text-[10px] px-2 py-0.5 rounded-full border border-white/20">
                    🧩 {puzzle.pieces} PCS
                  </div>
                  <div className="absolute top-3 right-3 bg-pink-500/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <span>● {puzzle.activePlayersCount || 20} playing</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-mono text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                      {puzzle.title}
                    </h3>
                  </div>
                  <p className="text-xs text-purple-400 mb-2">{puzzle.artist}</p>
                  <p className="text-xs text-purple-300/70 mb-4 line-clamp-2 leading-relaxed">
                    {puzzle.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                      {puzzle.difficulty}
                    </span>
                    <Link
                      href={`/room/${puzzle.id}`}
                      className="btn-retro-pink font-mono font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm"
                    >
                      PLAY NOW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-12 flex items-center justify-center gap-2 font-mono text-xs">
          <button className="w-9 h-9 rounded-xl bg-[#241B2D] border border-purple-800/60 text-purple-300 hover:border-pink-500 flex items-center justify-center cursor-pointer">
            ←
          </button>
          <button className="w-9 h-9 rounded-xl bg-pink-500 text-white font-bold flex items-center justify-center shadow-xs">
            1
          </button>
          <button className="w-9 h-9 rounded-xl bg-[#241B2D] border border-purple-800/60 text-purple-300 hover:border-pink-500 flex items-center justify-center cursor-pointer">
            2
          </button>
          <button className="w-9 h-9 rounded-xl bg-[#241B2D] border border-purple-800/60 text-purple-300 hover:border-pink-500 flex items-center justify-center cursor-pointer">
            3
          </button>
          <span className="px-1 text-purple-500">...</span>
          <button className="w-9 h-9 rounded-xl bg-[#241B2D] border border-purple-800/60 text-purple-300 hover:border-pink-500 flex items-center justify-center cursor-pointer">
            →
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
