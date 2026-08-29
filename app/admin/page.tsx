import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, ShieldCheck, UserCheck, ArrowLeft } from "lucide-react";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard - Premadhu Gau Seva Samiti",
  description: "Administrative dashboard for Premadhu Gau Seva Samiti.",
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-light/40 via-white to-bg-light/20 p-4 sm:p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/New_logo.png"
                alt="Premadhu Gau Seva Samiti"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-dark">
                Premadhu Admin Portal
              </h1>
              <p className="text-xs text-text-light">
                Secured Administrative Gate
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-text-light hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Website</span>
            </Link>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-dark font-medium text-sm rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-text-light" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-dark">
                Authentication Successful
              </h2>
              <p className="text-sm text-text-light">
                You are securely signed in to the admin portal.
              </p>
            </div>
          </div>

          {/* User Session Info Card */}
          <div className="p-5 bg-bg-light/60 border border-primary/20 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-text-dark">
              <UserCheck className="w-4 h-4 text-primary" />
              <span>Current Admin Session</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm">
              <div>
                <span className="text-xs text-text-light block">Email Address</span>
                <span className="font-semibold text-text-dark">{session.user.email}</span>
              </div>
              {session.user.name && (
                <div>
                  <span className="text-xs text-text-light block">Name</span>
                  <span className="font-semibold text-text-dark">{session.user.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Placeholder Notice */}
          <div className="p-6 border border-dashed border-gray-200 rounded-2xl text-center space-y-2">
            <h3 className="font-semibold text-text-dark text-base">
              Admin Panel Under Construction
            </h3>
            <p className="text-sm text-text-light max-w-lg mx-auto">
              The Google OAuth authentication gate is active and verified. Admin panel features (managing members, content updates, donation logs) will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
