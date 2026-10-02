"use client";

import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import { GALLERY_PUZZLES } from "@/lib/puzzles";
import { Puzzle, Player, PieceState, ChatMessage } from "@/lib/types";
import RetroWindow from "@/components/RetroWindow";
import Icon from "@/components/Icon";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RoomPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const roomId = resolvedParams.id;

  // Board and piece config - initialize to null for SSR hydration safety
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [pieces, setPieces] = useState<PieceState[]>([]);
  const [isGuideVisible, setIsGuideVisible] = useState(true);
  const [edgeOnly, setEdgeOnly] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Dragging state
  const [activePieceId, setActivePieceId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Co-op chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "PixelCat (Host)",
      text: "Welcome everyone! Let's start with the edge pieces first ✨",
      timestamp: "12:00",
      color: "#FF4D8D",
    },
    {
      id: "2",
      sender: "Ax",
      text: "Got the top-left corner piece! Cozy vibes here :3",
      timestamp: "12:01",
      color: "#4CAF7D",
    },
  ]);
  const [inputChat, setInputChat] = useState("");

  const boardRef = useRef<HTMLDivElement>(null);

  // Active players
  const players: Player[] = [
    { id: "1", name: "You", avatarText: "YOU", color: "bg-pink-500" },
    { id: "2", name: "Ax", avatarText: "AX", color: "bg-emerald-500" },
    { id: "3", name: "Mochi", avatarText: "MC", color: "bg-blue-500" },
  ];

  // Initialize puzzle
  useEffect(() => {
    // Check if custom puzzle in sessionStorage
    const customData = typeof window !== "undefined" ? sessionStorage.getItem(`love_puzzle_${roomId}`) : null;
    let selected: Puzzle;

    if (customData) {
      try {
        const parsed = JSON.parse(customData);
        selected = {
          id: roomId,
          title: parsed.title || "Custom Puzzle Room",
          artist: "@You (Custom)",
          pieces: parsed.pieces || 24,
          difficulty: "Medium",
          category: "Pixel Art",
          imageUrl: parsed.imageUrl,
          description: "Custom uploaded puzzle room.",
          rows: 4,
          cols: 6,
        };
      } catch {
        selected = GALLERY_PUZZLES.find((p) => p.id === roomId) || GALLERY_PUZZLES[0];
      }
    } else {
      selected = GALLERY_PUZZLES.find((p) => p.id === roomId) || GALLERY_PUZZLES[0];
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPuzzle(selected);

    // Generate puzzle pieces
    const initialPieces: PieceState[] = [];

    // Board container dimensions (540 x 360)
    const boardW = 540;
    const boardH = 360;
    const pieceW = boardW / selected.cols;
    const pieceH = boardH / selected.rows;

    for (let r = 0; r < selected.rows; r++) {
      for (let c = 0; c < selected.cols; c++) {
        const id = r * selected.cols + c;
        const targetX = c * pieceW;
        const targetY = r * pieceH;

        // Scatter randomly around board tray
        const angle = Math.random() * Math.PI * 2;
        const dist = 320 + Math.random() * 120;
        const randX = Math.max(10, Math.min(800, 270 + Math.cos(angle) * dist));
        const randY = Math.max(10, Math.min(500, 180 + Math.sin(angle) * dist));

        // Start with 2 initial corner pieces locked for instant gratification
        const shouldInitialLock = id === 0 || id === selected.cols - 1;

        initialPieces.push({
          id,
          row: r,
          col: c,
          targetX,
          targetY,
          currentX: shouldInitialLock ? targetX : randX,
          currentY: shouldInitialLock ? targetY : randY,
          isLocked: shouldInitialLock,
          lockedBy: shouldInitialLock ? "Ax" : undefined,
        });
      }
    }

    setPieces(initialPieces);
  }, [roomId]);

  // Timer
  useEffect(() => {
    if (isVictoryOpen) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isVictoryOpen]);

  // Format timer MM:SS
  const formatTime = (secs: number) =>
    new Date(secs * 1000).toISOString().slice(14, 19);

  // Calculate progress
  const lockedCount = pieces.filter((p) => p.isLocked).length;
  const progressPercent =
    pieces.length > 0 ? Math.round((lockedCount / pieces.length) * 100) : 0;

  // Check victory condition
  useEffect(() => {
    if (pieces.length > 0 && lockedCount === pieces.length && !isVictoryOpen) {
      setTimeout(() => {
        setIsVictoryOpen(true);
      }, 500);
    }
  }, [lockedCount, pieces.length, isVictoryOpen]);

  // Mouse drag handlers
  const handlePieceMouseDown = (
    e: React.MouseEvent,
    piece: PieceState
  ) => {
    if (piece.isLocked) return;
    e.preventDefault();

    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();

    setActivePieceId(piece.id);
    setDragOffset({
      x: e.clientX - rect.left - piece.currentX,
      y: e.clientY - rect.top - piece.currentY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (activePieceId === null) return;
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();

    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setPieces((prev) =>
      prev.map((p) => (p.id === activePieceId ? { ...p, currentX: newX, currentY: newY } : p))
    );
  };

  const handleMouseUp = () => {
    if (activePieceId === null) return;

    // Check snap distance
    setPieces((prev) =>
      prev.map((p) => {
        if (p.id === activePieceId) {
          const dx = Math.abs(p.currentX - p.targetX);
          const dy = Math.abs(p.currentY - p.targetY);
          const snapRadius = 35; // px

          if (dx < snapRadius && dy < snapRadius) {
            // SNAP & LOCK!
            return {
              ...p,
              currentX: p.targetX,
              currentY: p.targetY,
              isLocked: true,
              lockedBy: "You",
            };
          }
        }
        return p;
      })
    );

    setActivePieceId(null);
  };

  // Co-op Auto Solve (for testing & presentation)
  const handleQuickSolve = () => {
    setPieces((prev) =>
      prev.map((p) => ({
        ...p,
        currentX: p.targetX,
        currentY: p.targetY,
        isLocked: true,
        lockedBy: "You",
      }))
    );
  };

  // Reset puzzle
  const handleResetPuzzle = () => {
    setIsVictoryOpen(false);
    setElapsedSeconds(0);
    setPieces((prev) =>
      prev.map((p) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 320 + Math.random() * 100;
        return {
          ...p,
          currentX: 270 + Math.cos(angle) * dist,
          currentY: 180 + Math.sin(angle) * dist,
          isLocked: false,
          lockedBy: undefined,
        };
      })
    );
  };

  // Copy room link
  const handleInvite = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2500);
    }
  };

  // Send in-game chat
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "You",
      text: inputChat.trim(),
      timestamp: formatTime(elapsedSeconds),
      color: "#FF4D8D",
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setInputChat("");

    // Simulate co-op companion response
    setTimeout(() => {
      const coOpResponses = [
        "Nice piece snap! ♥",
        "Let's look for the bottom border next!",
        "Almost done, great teamwork!",
        "Love this cozy retro aesthetic :D",
      ];
      const randomReply = coOpResponses[Math.floor(Math.random() * coOpResponses.length)];
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "Ax",
          text: randomReply,
          timestamp: formatTime(elapsedSeconds + 1),
          color: "#4CAF7D",
        },
      ]);
    }, 1500);
  };

  // Loading skeleton during SSR and client initial mount to eliminate hydration mismatch
  if (!puzzle) {
    return (
      <div className="min-h-screen bg-[#120D18] text-purple-100 font-mono flex flex-col items-center justify-center p-4">
        <div className="p-8 bg-[#1B1424] border border-purple-800/60 rounded-2xl shadow-xl flex flex-col items-center gap-4 text-center max-w-sm w-full">
          <div className="text-xs font-bold text-[#FF4D8D] tracking-widest animate-pulse">
            LOADING PUZZLE ROOM...
          </div>
          <div className="w-48 h-3 bg-[#120D18] rounded-full overflow-hidden border border-purple-800/60">
            <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse w-3/4" />
          </div>
          <span className="text-[10px] text-purple-400">INITIALIZING BOARD MESH...</span>
        </div>
      </div>
    );
  }

  const boardW = 540;
  const boardH = 360;
  const pieceW = boardW / puzzle.cols;
  const pieceH = boardH / puzzle.rows;

  return (
    <div
      className="relative min-h-screen bg-[#120D18] text-purple-100 font-sans flex flex-col overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* In-Game Top Toolbar */}
      <header className="z-30 w-full bg-[#1B1424]/90 border-b border-purple-900/50 px-4 py-2.5 flex items-center justify-between backdrop-blur-md">
        {/* Left: Back & Room Info */}
        <div className="flex items-center gap-4">
          <Link
            href="/rooms"
            className="p-2 rounded-xl bg-purple-900/40 hover:bg-pink-500 hover:text-white transition-colors text-purple-300 flex items-center gap-1.5 font-mono text-xs"
          >
            <Icon className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </Icon>
            <span>LOBBY</span>
          </Link>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-sm font-bold text-white">{puzzle.title}</h2>
              <span className="bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-mono px-2 py-0.5 rounded">
                {puzzle.pieces} PCS
              </span>
            </div>
            <span className="text-[10px] font-mono text-purple-400">
              ROOM ID: #{roomId.toUpperCase().slice(0, 8)} • HOST: {puzzle.artist}
            </span>
          </div>
        </div>

        {/* Center: Co-op Player Avatars & Timer */}
        <div className="flex items-center gap-6">
          {/* Live Timer */}
          <div className="bg-black/40 border border-purple-800/60 rounded-xl px-3 py-1 flex items-center gap-2 font-mono text-xs text-pink-400">
            <Icon className="w-4 h-4 animate-spin text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </Icon>
            <span className="font-bold">{formatTime(elapsedSeconds)}</span>
          </div>

          {/* Active Co-op Players */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-xs font-mono text-purple-300 mr-1">PLAYERS:</span>
            <div className="flex -space-x-2">
              {players.map((p) => (
                <div
                  key={p.id}
                  className={`w-7 h-7 rounded-full ${p.color} border-2 border-[#1B1424] flex items-center justify-center text-[10px] font-bold text-white shadow-xs`}
                  title={p.name}
                >
                  {p.avatarText}
                </div>
              ))}
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold ml-1">
              ● {players.length}/4
            </span>
          </div>
        </div>

        {/* Right Controls: Invite & Progress */}
        <div className="flex items-center gap-3">
          {/* Progress Indicator */}
          <div className="hidden md:flex flex-col items-end">
            <div className="text-[10px] font-mono text-purple-300">
              PROGRESS: <span className="text-pink-400 font-bold">{progressPercent}%</span> ({lockedCount}/{pieces.length})
            </div>
            <div className="w-28 h-2 bg-purple-950 rounded-full overflow-hidden border border-purple-800/50 mt-0.5">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Share Room Link */}
          <button
            onClick={handleInvite}
            className="btn-retro-pink font-mono font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Icon className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </Icon>
            <span>{inviteCopied ? "COPIED! ♥" : "INVITE"}</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Workspace */}
      <main className="relative flex-1 bg-[#120D18] flex items-center justify-center overflow-hidden p-4">
        {/* Subtle Pixel Radial Grid Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF4D8D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        {/* Puzzle Board Container */}
        <div
          ref={boardRef}
          style={{
            width: `${boardW}px`,
            height: `${boardH}px`,
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center",
            transition: "transform 0.15s ease",
          }}
          className="relative bg-[#1E1727] border-2 border-purple-700/60 rounded-2xl shadow-2xl overflow-visible group"
        >
          {/* Guide Overlay Image */}
          {isGuideVisible && (
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden opacity-25 pointer-events-none transition-opacity"
              style={{
                backgroundImage: `url(${puzzle.imageUrl})`,
                backgroundSize: `${boardW}px ${boardH}px`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          )}

          {/* Grid Cut Guides */}
          <div
            className="absolute inset-0 grid border border-purple-500/20 divide-x divide-y divide-purple-500/20 rounded-2xl pointer-events-none opacity-40"
            style={{
              gridTemplateColumns: `repeat(${puzzle.cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${puzzle.rows}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: puzzle.rows * puzzle.cols }).map((_, i) => (
              <div key={i} className="border-purple-500/10"></div>
            ))}
          </div>

          {/* Render Puzzle Pieces */}
          {pieces.map((piece) => {
            const isEdge =
              piece.row === 0 ||
              piece.row === puzzle.rows - 1 ||
              piece.col === 0 ||
              piece.col === puzzle.cols - 1;

            if (edgeOnly && !isEdge && !piece.isLocked) {
              return null;
            }

            const isDragging = activePieceId === piece.id;

            return (
              <div
                key={piece.id}
                onMouseDown={(e) => handlePieceMouseDown(e, piece)}
                style={{
                  width: `${pieceW}px`,
                  height: `${pieceH}px`,
                  left: `${piece.currentX}px`,
                  top: `${piece.currentY}px`,
                  backgroundImage: `url(${puzzle.imageUrl})`,
                  backgroundSize: `${boardW}px ${boardH}px`,
                  backgroundPosition: `-${piece.col * pieceW}px -${piece.row * pieceH}px`,
                  zIndex: isDragging ? 50 : piece.isLocked ? 10 : 20,
                  cursor: piece.isLocked ? "default" : isDragging ? "grabbing" : "grab",
                }}
                className={`absolute select-none transition-shadow rounded-sm ${
                  piece.isLocked
                    ? "border border-emerald-400/40 shadow-xs"
                    : isDragging
                    ? "border-2 border-pink-400 shadow-[0_8px_20px_rgba(255,77,141,0.5)] scale-105"
                    : "border border-purple-400/50 shadow-md hover:border-pink-400"
                }`}
              >
                {/* Locked indicator mini badge */}
                {piece.isLocked && (
                  <div className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-400 shadow-xs pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Dock Controls from Canvas */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1C1426]/90 border border-purple-700/60 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-3 shadow-2xl z-40 font-mono text-xs">
          {/* Zoom In */}
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
            className="p-2 rounded-xl bg-purple-900/40 hover:bg-pink-500 hover:text-white transition-colors text-purple-300 cursor-pointer"
            title="Zoom In"
          >
            <Icon className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </Icon>
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
            className="p-2 rounded-xl bg-purple-900/40 hover:bg-pink-500 hover:text-white transition-colors text-purple-300 cursor-pointer"
            title="Zoom Out"
          >
            <Icon className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </Icon>
          </button>

          <div className="h-6 w-px bg-purple-800"></div>

          {/* Toggle Guide Background */}
          <button
            onClick={() => setIsGuideVisible((g) => !g)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isGuideVisible
                ? "bg-pink-500 text-white"
                : "bg-purple-900/40 hover:bg-pink-500 hover:text-white text-purple-300"
            }`}
            title="Toggle Guide Image"
          >
            <Icon className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </Icon>
          </button>

          {/* Edge Pieces Only */}
          <button
            onClick={() => setEdgeOnly((e) => !e)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              edgeOnly
                ? "bg-pink-500 text-white"
                : "bg-purple-900/40 hover:bg-pink-500 hover:text-white text-purple-300"
            }`}
            title="Filter Edge Pieces"
          >
            <Icon className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </Icon>
          </button>

          {/* Quick Solve Helper */}
          <button
            onClick={handleQuickSolve}
            className="p-2 rounded-xl bg-purple-900/40 hover:bg-emerald-500 hover:text-white transition-colors text-purple-300 cursor-pointer text-[10px] font-bold"
            title="Solve All (Test & Preview Victory)"
          >
            ⚡ SOLVE
          </button>

          <div className="h-6 w-px bg-purple-800"></div>

          {/* Toggle Chat */}
          <button
            onClick={() => setIsChatOpen((c) => !c)}
            className={`p-2 rounded-xl font-bold px-3 flex items-center gap-1.5 cursor-pointer ${
              isChatOpen
                ? "btn-retro-pink text-white"
                : "bg-purple-900/40 hover:bg-pink-500 hover:text-white text-purple-300"
            }`}
          >
            <span>💬 CHAT ({chatMessages.length})</span>
          </button>
        </div>

        {/* Co-op In-Game Chat Drawer */}
        {isChatOpen && (
          <aside className="absolute bottom-20 right-6 w-80 bg-[#1C1426]/95 border border-purple-700/80 rounded-2xl shadow-2xl p-4 flex flex-col z-40 backdrop-blur-md font-mono text-xs">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-white">CO-OP ROOM CHAT</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-purple-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Messages list */}
            <div className="h-56 overflow-y-auto space-y-2 pr-1 mb-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="bg-black/30 rounded-lg p-2 border border-purple-900/40">
                  <div className="flex items-center justify-between text-[10px] text-purple-400 mb-0.5">
                    <span style={{ color: msg.color || "#FF4D8D" }} className="font-bold">
                      {msg.sender}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p className="text-purple-100 text-xs leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={inputChat}
                onChange={(e) => setInputChat(e.target.value)}
                placeholder="Say something cozy..."
                className="flex-1 bg-[#120D18] border border-purple-800/80 rounded-xl px-3 py-1.5 text-xs text-purple-100 placeholder-purple-500 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                className="btn-retro-pink font-bold px-3 py-1.5 rounded-xl cursor-pointer"
              >
                Send
              </button>
            </form>
          </aside>
        )}
      </main>

      {/* Signature Retro Window Victory Popup Modal from Canvas */}
      <RetroWindow
        title="PUZZLE COMPLETED!"
        isOpen={isVictoryOpen}
        onClose={() => setIsVictoryOpen(false)}
      >
        <div className="space-y-6">
          {/* Victory Banner & Pixel Cat Mascot */}
          <div className="flex items-center gap-4 bg-purple-100 p-4 rounded-xl border border-purple-300">
            <div className="w-16 h-16 rounded-xl bg-pink-500/20 text-pink-500 border-2 border-pink-500/40 flex flex-col items-center justify-center p-1 flex-shrink-0 animate-bounce">
              <Icon className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </Icon>
              <span className="text-[8px] font-bold">PIXEL CAT</span>
            </div>
            <div>
              <span className="text-xs text-pink-600 font-bold uppercase tracking-wider">
                🎉 CONGRATULATIONS!
              </span>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                YOU & CO-OP TEAM SOLVED IT!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Completion time:{" "}
                <span className="text-emerald-700 font-bold">
                  {formatTime(elapsedSeconds)}
                </span>{" "}
                (New Room Record!)
              </p>
            </div>
          </div>

          {/* Retro Stats Box (Inset Bevel Style) */}
          <div className="bg-white p-4 rounded win95-inset space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-purple-100 pb-1.5">
              <span className="text-slate-600">Total Pieces:</span>
              <span className="font-bold text-slate-900">
                {pieces.length} / {pieces.length}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-purple-100 pb-1.5">
              <span className="text-slate-600">Active Players:</span>
              <span className="font-bold text-pink-600">3 Players</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Score Bonus:</span>
              <span className="font-bold text-emerald-700">+1,450 XP</span>
            </div>
          </div>

          {/* Retro Windows 95 Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleResetPuzzle}
              className="win95-btn text-slate-900 text-xs font-bold px-4 py-2 cursor-pointer"
            >
              [ Replay Puzzle ]
            </button>

            <Link
              href="/gallery"
              className="btn-retro-pink text-white text-xs font-bold px-5 py-2 rounded shadow-md cursor-pointer inline-block text-center"
            >
              [ Next Puzzle → ]
            </Link>
          </div>
        </div>
      </RetroWindow>
    </div>
  );
}
