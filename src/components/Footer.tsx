import Link from "next/link";
import Icon from "@/components/Icon";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-purple-900/50 bg-[#110D17] text-purple-300 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-500 flex items-center justify-center border border-pink-500/30">
                <Icon className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </Icon>
              </div>
              <span className="font-mono text-lg font-black tracking-wider text-[#FF4D8D]">
                LOVE PUZZLE
              </span>
            </div>
            <p className="text-xs text-purple-400 max-w-sm leading-relaxed">
              Assemble jigsaw puzzles with friends, family, or community in real-time. Free, no ads, cozy retro vibes inspired by classic pixel games.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-mono text-pink-400 font-semibold">
                Join the cozy pixel community! ♥
              </span>
            </div>
          </div>

          {/* Links Column 1: Puzzles */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-purple-100 tracking-wider uppercase">Puzzles</h4>
            <ul className="space-y-2 text-purple-400">
              <li>
                <Link href="/" className="hover:text-pink-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-pink-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:text-pink-400 transition-colors">
                  Public Lobbies
                </Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-pink-400 transition-colors">
                  Custom Upload
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Guides */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-purple-100 tracking-wider uppercase">Guides</h4>
            <ul className="space-y-2 text-purple-400">
              <li>
                <a href="#rules" className="hover:text-pink-400 transition-colors">
                  Co-op Rules
                </a>
              </li>
              <li>
                <a href="#shortcuts" className="hover:text-pink-400 transition-colors">
                  Shortcuts & Controls
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-pink-400 transition-colors">
                  Room Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Community */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="font-bold text-purple-100 tracking-wider uppercase">Community</h4>
            <ul className="space-y-2 text-purple-400">
              <li>
                <a href="#support" className="hover:text-pink-400 transition-colors">
                  Support Us
                </a>
              </li>
              <li>
                <a href="#discord" className="hover:text-pink-400 transition-colors">
                  Discord Server
                </a>
              </li>
              <li>
                <span className="text-emerald-400">● 100% Free & Open</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 border-t border-purple-900/40 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-400 font-mono">
          <p>© 2026 Love Puzzle Studio. Made with <span className="text-pink-500">♥</span> for cozy puzzle lovers.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-2">
            <span>Server status:</span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Operational
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
