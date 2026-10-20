"use client";

import { useState } from "react";
import { Images, Users } from "lucide-react";
import AdminMembersManager from "@/components/AdminMembersManager";
import AdminAboutPhotosManager from "@/components/AdminAboutPhotosManager";

type AdminTab = "about-photos" | "members";

export default function AdminDashboardTabs() {
  const [activeTab, setActiveTab] = useState<AdminTab>("about-photos");

  return (
    <div className="space-y-6">
      {/* Tab Navigation Controls */}
      <div className="flex items-center gap-2 p-1.5 bg-gray-100/90 rounded-2xl w-fit border border-gray-200/70 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab("about-photos")}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "about-photos"
              ? "bg-white text-primary-dark shadow-sm"
              : "text-text-light hover:text-text-dark hover:bg-white/50"
          }`}
        >
          <Images className="w-4 h-4" />
          <span>About Us Photos</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("members")}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === "members"
              ? "bg-white text-primary-dark shadow-sm"
              : "text-text-light hover:text-text-dark hover:bg-white/50"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team Members</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "about-photos" ? (
          <AdminAboutPhotosManager />
        ) : (
          <AdminMembersManager />
        )}
      </div>
    </div>
  );
}
