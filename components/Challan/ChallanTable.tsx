"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { ChallanItem } from "../../types/challan";

interface ChallanTableProps {
  items: ChallanItem[];
  onUpdateItem: (id: string, field: keyof ChallanItem, value: string | number) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  total: number;
  suggestions?: string[];
  isLastPage?: boolean;
  isReadOnly?: boolean;
}

export function ChallanTable({ items, onUpdateItem, onAddItem, onRemoveItem, total, suggestions = [], isLastPage = true, isReadOnly = false }: ChallanTableProps) {
  return (
    <div className="w-full">
      <datalist id="description-suggestions">
        {suggestions.map((suggestion, idx) => (
          <option key={idx} value={suggestion} />
        ))}
      </datalist>
      <table className="w-full border-collapse border-[1.5px] border-black text-xs">
        <thead>
          <tr className="bg-transparent">
            <th className="border border-black px-1 py-0.5 w-[40px] text-[9px]">Sl. No</th>
            <th className="border border-black px-2 py-0.5 text-center font-bold text-sm">Description</th>
            <th className="border border-black px-1 py-0.5 w-[100px] text-[10px]">Order Qty</th>
            <th className="border border-black px-1 py-0.5 w-[110px] text-[10px]">Delivery Qty</th>
            <th className="border border-black px-1 py-0.5 w-[80px] text-[10px]">Remark</th>
            <th className="border border-black px-1 py-0.5 w-[60px] no-print">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="h-[23px]">
              <td className="border border-black px-1 py-1 text-center font-bold">{item.slNo}</td>
              <td className="border border-black px-0 py-0 relative">
                {isReadOnly ? (
                  <div className="w-full px-2 py-0 h-full leading-[23px]">{item.description}</div>
                ) : (
                  <input
                    type="text"
                    value={item.description}
                    list="description-suggestions"
                    onChange={(e) => onUpdateItem(item.id, "description", e.target.value)}
                    className="w-full px-2 py-0 bg-transparent outline-none h-full"
                  />
                )}
                {/* Vertical line separator inside Description if needed to match image exactly */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-black opacity-20"></div>
              </td>
              <td className="border border-black px-0 py-0">
                {isReadOnly ? (
                  <div className="w-full px-1 py-0 text-center">{item.orderQty}</div>
                ) : (
                  <input
                    type="text"
                    value={item.orderQty}
                    onChange={(e) => onUpdateItem(item.id, "orderQty", e.target.value)}
                    className="w-full px-1 py-0 text-center bg-transparent outline-none"
                  />
                )}
              </td>
              <td className="border border-black px-0 py-0">
                {isReadOnly ? (
                  <div className="w-full px-1 py-0 text-center">{item.deliveryQty}</div>
                ) : (
                  <input
                    type="number"
                    value={item.deliveryQty}
                    onChange={(e) => onUpdateItem(item.id, "deliveryQty", e.target.value)}
                    className="w-full px-1 py-0 text-center bg-transparent outline-none"
                  />
                )}
              </td>
              <td className="border border-black px-0 py-0">
                {isReadOnly ? (
                  <div className="w-full px-1 py-0 text-center">{item.remark}</div>
                ) : (
                  <input
                    type="text"
                    value={item.remark}
                    onChange={(e) => onUpdateItem(item.id, "remark", e.target.value)}
                    className="w-full px-1 py-0 text-center bg-transparent outline-none"
                  />
                )}
              </td>
              <td className="border border-black px-2 py-1 text-center no-print">
                {!isReadOnly && (
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </td>
            </tr>
          ))}
          {isLastPage && (
            <tr className="h-6">
              <td colSpan={3} className="border border-black px-4 py-0.5 text-right font-bold text-sm">Total:</td>
              <td className="border border-black px-1 py-0.5 text-center font-bold text-sm">{total}</td>
              <td className="border border-black"></td>
              <td className="border border-black no-print"></td>
            </tr>
          )}
        </tbody>
      </table>
      
      {isLastPage && (
        <div className="mt-4 no-print flex justify-start">
          <button
            onClick={onAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-sm active:scale-95"
          >
            <Plus size={18} />
            Add Row
          </button>
        </div>
      )}
    </div>
  );
}
