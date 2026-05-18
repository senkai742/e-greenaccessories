"use client";

import React from "react";
import { Printer, Save, Download } from "lucide-react";
import { ChallanData } from "../../types/challan";

interface ChallanFormProps {
  data: ChallanData;
  updateField: (field: keyof ChallanData, value: string | number) => void;
  onPrint: () => void;
  onDownloadPDF?: () => void;
  onSave: () => void;
  children?: React.ReactNode;
  isReadOnly?: boolean;
}

export function ChallanForm({ data, updateField, onPrint, onDownloadPDF, onSave, children, isReadOnly = false }: ChallanFormProps) {
  return (
    <>
      {/* SCREEN UI ONLY: Completely isolated from the printable container */}
      <div className="block print:hidden no-print bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 max-w-[210mm] mx-auto">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
          >
            <Printer size={18} />
            Print Challan
          </button>
          {onDownloadPDF && (
            <button
              onClick={onDownloadPDF}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-md active:scale-95"
            >
              <Download size={18} />
              Download PDF
            </button>
          )}
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <Save size={18} />
            Save to History
          </button>
        </div>
      </div>

      {/* PRINT CANVAS: Isolated size constraints strictly target A4 specifications */}
      <div className="challan-container font-sans relative bg-white text-black mx-auto w-full max-w-[210mm] min-h-[297mm] p-0 print:p-0 overflow-visible flex flex-col justify-between">
        
        {/* Wrapper to group content together to accurately calculate heights */}
        <div className="w-full flex-1 flex flex-col">
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 z-0">
            <img src="/logo.png" alt="Watermark" className="w-[80%] max-w-[600px] object-contain" />
          </div>

          {/* Header Section */}
          <div className="relative z-10 flex justify-center items-center mb-2 border-b-2 border-black pb-2">
            <div className="flex gap-4 items-center">
              <img src="/logo.png" alt="E-GREEN Logo" className="h-16 w-auto" />
              <div className="border-l-2 border-black pl-4">
                <h1 className="text-5xl font-bold tracking-[3px] text-black leading-snug font-serif">E-Green Accessories</h1>
                <p className="text-sm font-semibold tracking-wide">(One Stop Services For Garments Accessories)</p>
              </div>
            </div>
          </div>

          {/* Address & Contact Info */}
          <div className="text-center text-xs font-bold space-y-0.5 border-b border-black pb-1 mb-4">
            <p>Address: 291, Jomidar Palace, Fokirapool, Motijheel, Dhaka-1000</p>
            <p>Phone: 01810-424400, E-mail: egreenaccessoriesbd@gmail.com</p>
          </div>

          {/* Challan Badge & No. */}
          <div className="relative flex justify-center mb-6 pt-2">
            <div className="absolute left-0 top-0 flex items-center gap-2">
              <span className="font-bold text-sm">No.</span>
              {isReadOnly ? (
                <div className="text-xl font-bold px-1 min-w-[6rem]">{data.challanNo}</div>
              ) : (
                <input
                  type="number"
                  value={data.challanNo}
                  onChange={(e) => updateField("challanNo", parseInt(e.target.value) || 0)}
                  className="text-xl font-bold bg-transparent outline-none border-b border-dotted border-transparent hover:border-gray-300 focus:border-black w-24"
                />
              )}
            </div>
            <span className="bg-gray-800 text-white px-6 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
              CHALLAN/GATE PASS
            </span>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-[1fr_auto] gap-x-12 gap-y-3 mb-6 px-2 text-sm w-full">
            <div className="space-y-3 min-w-0">
              <div className="flex items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">Name:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  {isReadOnly ? <div className="w-full px-1">{data.name}</div> : (
                    <input type="text" value={data.name || ""} onChange={(e) => updateField("name", e.target.value)} className="w-full bg-transparent outline-none px-1" />
                  )}
                </div>
              </div>
              <div className="flex items-start gap-1 relative">
                <span className="font-bold whitespace-nowrap leading-[22px]">Address:</span>
                <div className="flex-1 relative min-h-[44px] min-w-0">
                  <div className="absolute inset-0 flex flex-col pointer-events-none">
                    <div className="border-b border-dotted border-black h-[22px]"></div>
                    <div className="border-b border-dotted border-black h-[22px]"></div>
                  </div>
                  <div className="relative z-10 w-full h-full">
                    {isReadOnly ? (
                      <div className="w-full px-1 break-words whitespace-pre-wrap leading-[22px] min-h-[44px]">
                        {data.address}
                      </div>
                    ) : (
                      <textarea
                        value={data.address || ""}
                        onChange={(e) => updateField("address", e.target.value)}
                        className="w-full h-[44px] bg-transparent outline-none px-1 resize-none leading-[22px] overflow-hidden"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-wrap items-baseline gap-4">
                <div className="flex-1 flex items-baseline gap-1 min-w-[180px]">
                  <span className="font-bold whitespace-nowrap">Attn:</span>
                  <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                    {isReadOnly ? <div className="w-full px-1">{data.attn}</div> : (
                      <input type="text" value={data.attn || ""} onChange={(e) => updateField("attn", e.target.value)} className="w-full bg-transparent outline-none px-1" />
                    )}
                  </div>
                </div>
                <div className="flex-1 flex items-baseline gap-1 min-w-[180px]">
                  <span className="font-bold whitespace-nowrap">Booking No:</span>
                  <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                    {isReadOnly ? <div className="w-full px-1">{data.bookingNo}</div> : (
                      <input type="text" value={data.bookingNo || ""} onChange={(e) => updateField("bookingNo", e.target.value)} className="w-full bg-transparent outline-none px-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 w-64">
              <div className="flex items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">Date:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  {isReadOnly ? <div className="w-full px-1 text-center">{data.date}</div> : (
                    <input type="text" value={data.date || ""} onChange={(e) => updateField("date", e.target.value)} className="w-full bg-transparent outline-none px-1 text-center" />
                  )}
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">Buyer:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  {isReadOnly ? <div className="w-full px-1">{data.buyer}</div> : (
                    <input type="text" value={data.buyer || ""} onChange={(e) => updateField("buyer", e.target.value)} className="w-full bg-transparent outline-none px-1" />
                  )}
                </div>
              </div>
              <div className="flex items-baseline gap-1 pt-6">
                <span className="font-bold whitespace-nowrap">Po/Order No:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  {isReadOnly ? <div className="w-full px-1">{data.poOrderNo}</div> : (
                    <input type="text" value={data.poOrderNo || ""} onChange={(e) => updateField("poOrderNo", e.target.value)} className="w-full bg-transparent outline-none px-1" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Item Table Target Container */}
          <div className="w-full flex-1 flex flex-col min-h-0 relative z-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}