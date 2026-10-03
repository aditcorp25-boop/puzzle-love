// Metadata login sosial — boleh di-import dari client & server (tanpa secret).
export const SOCIAL_PROVIDERS = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
  { id: "facebook", label: "Facebook" },
] as const;

export type SocialId = (typeof SOCIAL_PROVIDERS)[number]["id"];

// Tombol hanya aktif kalau AUTH_<PROVIDER>_ID sudah diisi di .env.local
export const enabledSocialIds: string[] = SOCIAL_PROVIDERS.filter((p) =>
  process.env[`AUTH_${p.id.toUpperCase()}_ID`]
).map((p) => p.id);
