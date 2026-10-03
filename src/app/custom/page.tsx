import { auth, signOut } from "@/lib/auth";
import { enabledSocialIds } from "@/lib/social";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginGate from "./login-gate";
import UploadClient from "./upload-client";

export default async function CustomUploadPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const user = (await auth())?.user ?? null;
  const authError = (await searchParams)?.error;

  return (
    <div className="min-h-screen bg-[#15101C] text-purple-50 font-sans flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-8 w-full flex-1 space-y-8">
        {/* Title Banner */}
        <div className="text-center space-y-2">
          <span className="bg-pink-500/20 text-pink-300 font-mono text-xs font-bold px-3 py-1 rounded-full border border-pink-500/30 inline-block">
            ✨ CUSTOM PUZZLE GENERATOR
          </span>
          <h1 className="font-mono text-3xl sm:text-4xl font-black text-white">
            {user ? "Upload Your Image" : "Login Required"}
          </h1>
          <p className="text-sm text-purple-300/70 max-w-md mx-auto">
            {user
              ? "Turn any photo, artwork, or meme into an interactive jigsaw puzzle room in seconds."
              : "Sign in first to upload your own puzzle image."}
          </p>
        </div>

        {user ? (
          <>
            <div className="flex items-center justify-center gap-3 text-xs font-mono text-purple-300/70">
              <span>
                ✅ Signed in as <b className="text-pink-300">{user.name ?? user.email}</b>
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/custom" });
                }}
              >
                <button
                  type="submit"
                  className="text-pink-400 hover:text-pink-300 underline underline-offset-2 cursor-pointer"
                >
                  Logout
                </button>
              </form>
            </div>
            <UploadClient />
          </>
        ) : (
          <LoginGate enabled={enabledSocialIds} error={authError} />
        )}
      </main>

      <Footer />
    </div>
  );
}
