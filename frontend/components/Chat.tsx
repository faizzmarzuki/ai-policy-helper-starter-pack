"use client";
import React, { useRef, useEffect } from "react";
import { apiAsk } from "@/lib/api";
import { Copy, RotateCw, Share2, SendIcon } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";

type Message = {
  role: "user" | "assistant";
  content: string;
  citations?: { title: string; section?: string }[];
  chunks?: { title: string; section?: string; text: string }[];
};

export default function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [q, setQ] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const send = async () => {
    if (!q.trim()) return;
    const my = { role: "user" as const, content: q };
    setMessages((m) => [...m, my]);
    setLoading(true);
    try {
      const res = await apiAsk(q);
      const ai: Message = {
        role: "assistant",
        content: res.answer,
        citations: res.citations,
        chunks: res.chunks,
      };
      setMessages((m) => [...m, ai]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Error: " + e.message },
      ]);
    } finally {
      setLoading(false);
      setQ("");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center px-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Start a conversation
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Ask questions about policies or products
              </p>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                m.role === "user"
                  ? "max-w-xs sm:max-w-sm md:max-w-2xl bg-gray-100 text-gray-900 rounded-2xl px-3 sm:px-4 py-2 sm:py-3"
                  : "w-full"
              }`}
            >
              {m.role === "user" ? (
                <p className="text-sm">{m.content}</p>
              ) : (
                <div className="space-y-3">
                  <div className="text-sm text-gray-800 leading-relaxed">
                    {m.content}
                  </div>

                  {m.citations && m.citations.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 mb-2">
                        Sources
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {m.citations.map((c, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-green-100 border border-green-300 text-green-700 text-xs px-3 py-1 rounded-full"
                            title={c.section || ""}
                          >
                            {c.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {m.chunks && m.chunks.length > 0 && (
                    <details className="pt-2">
                      <summary className="text-xs font-semibold text-gray-600 cursor-pointer hover:text-gray-900">
                        View supporting chunks
                      </summary>
                      <div className="mt-2 space-y-2">
                        {m.chunks.map((c, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-50 border border-gray-200 rounded p-2 text-xs"
                          >
                            <div className="font-semibold text-gray-900">
                              {c.title}
                              {c.section ? " — " + c.section : ""}
                            </div>
                            <div className="text-gray-700 whitespace-pre-wrap mt-1">
                              {c.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => copyToClipboard(m.content)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Copy"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Shimmer loading indicator - below messages */}
        {loading && (
          <div className="flex justify-start pt-4">
            <TextShimmer
              duration={1}
              className="text-sm text-gray-600 font-medium"
            >
              Thinking...
            </TextShimmer>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white">
        <div className="flex gap-2 sm:gap-3">
          <input
            placeholder="Ask about policy or products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
          />
          <button
            onClick={send}
            disabled={loading || !q.trim()}
            className="px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <SendIcon className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
