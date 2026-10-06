import React from 'react';
import { X, Trash2, Clock, ExternalLink, ChevronRight, Bookmark } from 'lucide-react';
import { CarPart } from '../data/partsData';

export interface HistoryItem {
  id: string;
  part: CarPart;
  imageSrc: string;
  timestamp: string;
}

interface ScanHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const ScanHistoryDrawer: React.FC<ScanHistoryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Garage Scan History</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold tabular-nums">
              {items.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-rose-400 hover:text-rose-300 p-1 flex items-center gap-1"
                title="Clear History"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-20 text-slate-500 text-xs">
              <p>No saved scans yet.</p>
              <p className="mt-1 text-slate-600">Scan or upload an automotive part to record it here.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectHistoryItem(item);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer flex gap-3.5 items-center group"
              >
                <img
                  src={item.imageSrc}
                  alt={item.part.name}
                  className="w-16 h-16 rounded-xl object-contain bg-slate-950 border border-slate-800 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className="text-cyan-400 font-medium">{item.part.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{item.timestamp}</span>
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {item.part.name}
                  </h4>

                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    {item.part.manufacturer}
                  </p>

                  <div className="flex items-center justify-between mt-1 text-[10px]">
                    <span className="text-slate-500 font-mono">
                      {item.part.oemNumbers[0]}
                    </span>
                    <span className="text-emerald-400 font-semibold tabular-nums">
                      {item.part.confidence}% match
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
