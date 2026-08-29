import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, Globe, ExternalLink, ShieldCheck } from "lucide-react";
import { auth, signOut } from "@/auth";
import AdminMembersManager from "@/components/AdminMembersManager";

export const metadata: Metadata = {
  title: "Admin Portal - Premadhu Gau Seva Samiti",
  description: "Administrative dashboard for Premadhu Gau Seva Samiti.",
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-light/40 via-white to-bg-light/20 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Navigation Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
              <Image
                src="/New_logo.png"
                alt="Premadhu Gau Seva Samiti"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-text-dark">
                  Premadhu Admin Portal
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary-dark">
                  <ShieldCheck className="w-3 h-3" />
                  Admin
                </span>
              </div>
              <p className="text-xs text-text-light">
                Signed in as <span className="font-medium text-text-dark">{session.user.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* View Public Members Page Link */}
            <Link
              href="/members"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-primary hover:text-primary-dark bg-primary/10 hover:bg-primary/15 rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Public Members Page</span>
            </Link>

            {/* View Website Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-text-light hover:text-text-dark bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>Website</span>
            </Link>

            {/* Sign Out Button */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </header>

        {/* Main Member Management System */}
        <main>
          <AdminMembersManager />
        </main>
      </div>
    </div>
  );
}
