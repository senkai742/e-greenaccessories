"use client";

import React from "react";
import { X, Search, FileText, ChevronRight } from "lucide-react";
import { ChallanData } from "../../types/challan";

interface HistoryListProps {
  history: ChallanData[];
  onLoad: (data: ChallanData) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function HistoryList({ history, onLoad, onClose, isOpen }: HistoryListProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col no-print">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Search className="text-gray-400" size={20} />
            Challan History
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>No saved challans found.</p>
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onLoad(item);
                  onClose();
                }}
                className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-bold text-gray-900">#{item.challanNo}</span>
                  <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-600 truncate font-medium">{item.name || "Unnamed Buyer"}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                    {item.items.length} Items
                  </span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-emerald-500 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
