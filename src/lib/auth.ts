import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";

// Login hanya via sosial (tanpa registrasi, tanpa tabel user).
// clientId/clientSecret dibaca otomatis dari AUTH_GOOGLE_ID/SECRET, dst.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google, GitHub, Facebook],
});
