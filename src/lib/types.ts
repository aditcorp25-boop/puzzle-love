export interface Puzzle {
  id: string;
  title: string;
  artist: string;
  pieces: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  category: "Pixel Art" | "Cute Animals" | "Retro Landscapes" | "Cozy Illustrations" | "Coffee & Bakery";
  imageUrl: string;
  description: string;
  rows: number;
  cols: number;
  activePlayersCount?: number;
}

export interface Player {
  id: string;
  name: string;
  avatarText: string;
  color: string;
  isHost?: boolean;
}

export interface PieceState {
  id: number;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
  row: number;
  col: number;
  isLocked: boolean;
  lockedBy?: string;
  heldBy?: string;
}

export interface Room {
  id: string;
  title: string;
  puzzle: Puzzle;
  hostId: string;
  hostName: string;
  isPublic: boolean;
  status: "waiting" | "active" | "completed";
  players: Player[];
  pieces: PieceState[];
  progress: number;
  elapsedSeconds: number;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  color?: string;
}
