'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Chat from '@/components/Chat';
import AdminPanel from '@/components/AdminPanel';
import HelpModal from '@/components/HelpModal';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'chat' | 'admin'>('chat');
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onHelpClick={() => setShowHelpModal(true)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'admin' && (
          <div className="flex-1 overflow-auto p-8">
            <AdminPanel />
          </div>
        )}
      </main>

      {/* Help Modal */}
      <HelpModal 
        isOpen={showHelpModal} 
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
}
