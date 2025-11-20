'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Chat from '@/components/Chat';
import AdminPanel from '@/components/AdminPanel';
import HelpModal from '@/components/HelpModal';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'chat' | 'admin'>('chat');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (tab: 'chat' | 'admin') => {
    setActiveTab(tab);
    // Close sidebar on mobile/tablet after tab change
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Mobile/Tablet Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile/tablet, visible on desktop */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          onHelpClick={() => setShowHelpModal(true)}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Mobile/Tablet Header with Menu Button */}
        <div className="lg:hidden flex items-center gap-4 border-b border-gray-200 px-4 py-3 bg-white">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">AQ</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">AQReight</h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'chat' && <Chat />}
          {activeTab === 'admin' && (
            <div className="p-4 sm:p-8">
              <AdminPanel />
            </div>
          )}
        </div>
      </main>

      {/* Help Modal */}
      <HelpModal 
        isOpen={showHelpModal} 
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
}
