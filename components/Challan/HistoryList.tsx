"use client";

import React from "react";
import { X, Search, FileText, ChevronRight, History as HistoryIcon } from "lucide-react";
import { ChallanData } from "../../types/challan";

interface HistoryListProps {
  history: ChallanData[];
  onLoad: (data: ChallanData) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function HistoryList({ history, onLoad }: { history: ChallanData[], onLoad: (data: ChallanData) => void }) {
  const [search, setSearch] = React.useState("");

  const filteredHistory = history.filter(item => 
    item.challanNo.toString().includes(search) || 
    (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
    (item.buyer && item.buyer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col h-full no-print">
      <div className="p-4 border-b bg-gray-50/50 space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <HistoryIcon size={18} />
          </div>
          <h2 className="font-bold text-slate-800">Saved Challans</h2>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search by No. or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-100 border-none rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[calc(100vh-320px)]">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <FileText size={40} className="mx-auto mb-3 opacity-10" />
            <p className="text-xs font-medium">
              {search ? "No matches found" : "No history yet"}
            </p>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <button
              key={item.id}
              onClick={() => onLoad(item)}
              className="w-full text-left p-3 rounded-xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50 transition-all group relative"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-black text-slate-900">#{item.challanNo}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                </span>
              </div>
              <p className="text-xs text-slate-600 truncate font-semibold">
                {item.name || "N/A"}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-widest">
                  {item.items.length} Items
                </span>
                <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-all" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
