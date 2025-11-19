"use client";
import React from "react";
import { apiIngest, apiMetrics } from "@/lib/api";
import {
  RefreshCw,
  Database,
  BookOpen,
  WholeWord,
  Timer,
  Brain,
  Cpu,
  BrainCog,
} from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value }) => (
  <div className="bg-white border border-gray-300 rounded-lg p-8 flex flex-col gap-3 w-full">
    <div className="flex gap-3 items-center">
      <div className="text-gray-900">{icon}</div>
      <span className="text-sm font-semibold text-gray-900">{label}</span>
    </div>
    <div className="text-4xl font-semibold text-gray-900">{value}</div>
  </div>
);

export default function AdminPanel() {
  const [metrics, setMetrics] = React.useState<any>(null);
  const [busy, setBusy] = React.useState(false);

  const refresh = async () => {
    const m = await apiMetrics();
    setMetrics(m);
  };

  const ingest = async () => {
    setBusy(true);
    try {
      await apiIngest();
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  React.useEffect(() => {
    refresh();
  }, []);

  // Extract metrics or provide defaults
  const totalDocs = metrics?.total_docs ?? 0;
  const totalChunks = metrics?.total_chunks ?? 0;
  const retrievalLatency = `${metrics?.avg_retrieval_latency_ms ?? 0}ms`;
  const generationLatency = `${metrics?.avg_generation_latency_ms ?? 0}ms`;
  const embeddingModel = metrics?.embedding_model ?? "local-384";
  const llmModel = metrics?.llm_model ?? "gpt-4o-mini";

  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Action Buttons */}
      <div className="flex gap-5">
        <button
          onClick={ingest}
          disabled={busy}
          className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-base"
        >
          {busy ? "Indexing..." : "Ingest Sample Docs"}
        </button>
        <button
          onClick={refresh}
          className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-semibold text-base flex items-center gap-2"
        >
          Refresh Metrics
        </button>
      </div>

      {/* Metrics Grid */}
      {metrics && (
        <div className="flex flex-col gap-10">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <MetricCard
              icon={<BookOpen className="w-6 h-6" />}
              label="Total Documents"
              value={totalDocs}
            />
            <MetricCard
              icon={<Timer className="w-6 h-6" />}
              label="Average Retrieval Latency"
              value={retrievalLatency}
            />
            <MetricCard
              icon={<Cpu className="w-6 h-6" />}
              label="Embedding Model"
              value={embeddingModel}
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <MetricCard
              icon={<WholeWord className="w-6 h-6" />}
              label="Total Chunks"
              value={totalChunks}
            />
            <MetricCard
              icon={<Brain className="w-6 h-6" />}
              label="Average Generation Latency"
              value={generationLatency}
            />
            <MetricCard
              icon={<BrainCog className="w-6 h-6" />}
              label="LLM Model"
              value={llmModel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
