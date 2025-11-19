"use client";

import React from "react";
import {
  MessageSquare,
  Settings,
  HelpCircle,
  PanelLeft,
  Plus,
} from "lucide-react";

interface SidebarProps {
  activeTab?: "chat" | "admin";
  onTabChange?: (tab: "chat" | "admin") => void;
  onHelpClick?: () => void;
}

export default function Sidebar({
  activeTab = "chat",
  onTabChange,
  onHelpClick,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-bold">AQ</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">AQReight</h1>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {/* New Chat Button */}

          {/* Chat */}
          <button
            onClick={() => onTabChange?.("chat")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              activeTab === "chat"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Chat</span>
          </button>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        {/* Admin */}
        <button
          onClick={() => onTabChange?.("admin")}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            activeTab === "admin"
              ? "bg-white text-gray-900 shadow-sm border border-gray-200"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Admin</span>
        </button>

        {/* Help */}
        <button
          onClick={onHelpClick}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">How to use</span>
        </button>
      </div>
    </aside>
  );
}
