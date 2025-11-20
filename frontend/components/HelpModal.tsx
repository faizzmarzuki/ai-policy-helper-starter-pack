"use client";

import React from "react";
import { X } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">How to use</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            <div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                This is an AI-powered policy and product assistant that helps you
                find answers quickly.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Getting Started
              </h3>
              <ol className="list-decimal list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700">
                <li>
                  Click{" "}
                  <span className="font-semibold">Ingest sample docs</span> in
                  the Admin tab to load the sample documents.
                </li>
                <li>
                  Navigate to the{" "}
                  <span className="font-semibold">Chat</span> tab.
                </li>
                <li>
                  Try asking questions like:
                  <ul className="list-disc list-inside ml-4 mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                    <li>
                      <i>Can a customer return a damaged blender after 20 days?</i>
                    </li>
                    <li>
                      <i>What's the shipping SLA to East Malaysia for bulky items?</i>
                    </li>
                  </ul>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Features
              </h3>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-700">
                <li>
                  <span className="font-semibold">Citations</span> - See which
                  documents were used to answer your question
                </li>
                <li>
                  <span className="font-semibold">Supporting Chunks</span> - View
                  the exact text that was referenced
                </li>
                <li>
                  <span className="font-semibold">Copy & Share</span> - Copy
                  responses or share them easily
                </li>
                <li>
                  <span className="font-semibold">Admin Panel</span> - Monitor
                  system metrics and ingest documents
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-blue-900">
                💡 <strong>Tip:</strong> The assistant will provide answers with
                citations to the relevant policy documents, ensuring you have
                accurate and traceable information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

