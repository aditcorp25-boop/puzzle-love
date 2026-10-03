"use client";

import { signIn } from "next-auth/react";
import Icon from "@/components/Icon";
import { SOCIAL_PROVIDERS } from "@/lib/social";

export default function LoginGate({
  enabled = [],
  error,
}: {
  enabled?: string[];
  error?: string;
}) {
  return (
    <div className="max-w-sm mx-auto bg-[#241B2D] border border-purple-800/50 rounded-3xl p-6 shadow-lg space-y-4 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
        <Icon className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </Icon>
      </div>
      <h3 className="font-mono text-lg font-bold text-purple-100">Please log in first</h3>
      <p className="text-xs text-purple-400">
        Uploading a custom puzzle is only available for logged-in players — no
        registration needed, just sign in with your account.
      </p>

      <div className="text-[10px] font-mono font-bold uppercase text-purple-500">
        sign in with
      </div>
      <div className="grid grid-cols-3 gap-2">
        {SOCIAL_PROVIDERS.map((p) => {
          const isOn = enabled.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              disabled={!isOn}
              title={isOn ? undefined : `Isi AUTH_${p.id.toUpperCase()}_ID di .env.local`}
              onClick={() => signIn(p.id)}
              className={`py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                isOn
                  ? "border-purple-800 text-purple-100 bg-[#191222] hover:border-pink-500 hover:text-pink-300 cursor-pointer"
                  : "border-purple-900/60 text-purple-500 bg-[#191222]/50 cursor-not-allowed opacity-60"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs font-mono text-pink-400">
          Sign-in failed ({error}). Please try again.
        </p>
      )}
      {enabled.length === 0 && (
        <p className="text-xs font-mono text-amber-400/90">
          Belum ada login aktif — isi AUTH_GOOGLE_ID / AUTH_GITHUB_ID /
          AUTH_FACEBOOK_ID di .env.local, lalu restart server.
        </p>
      )}
    </div>
  );
}
