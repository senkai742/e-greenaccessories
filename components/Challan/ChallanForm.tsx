"use client";

import React from "react";
import { Mail, Phone, MapPin, Printer, Save } from "lucide-react";
import { ChallanData } from "../../types/challan";

interface ChallanFormProps {
  data: ChallanData;
  updateField: (field: keyof ChallanData, value: string | number) => void;
  onPrint: () => void;
  onSave: () => void;
  children?: React.ReactNode;
}

export function ChallanForm({ data, updateField, onPrint, onSave, children }: ChallanFormProps) {
  return (
    <div className="space-y-6">
      {/* Action Buttons - Hidden on print */}
      <div className="flex justify-between items-center no-print bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex gap-3">
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md active:scale-95"
          >
            <Printer size={18} />
            Print Challan
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <Save size={18} />
            Save to History
          </button>
        </div>
      </div>

      <div className="challan-container font-sans relative">
        {/* Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 z-0">
          <img src="/logo.png" alt="Watermark" className="w-[80%] max-w-[600px] object-contain" />
        </div>

        {/* Header Section */}
        <div className="relative z-10 flex justify-between items-start mb-2 border-b-2 border-black pb-2">
          <div className="flex gap-4 items-center">
            {/* E-GREEN Branding Logo Image */}
            <img src="/logo.png" alt="E-GREEN Logo" className="h-16 w-auto" />
            <div className="border-l-2 border-black pl-4">
              <h1 className="text-4xl font-bold tracking-tight text-black leading-tight">E-Green Accessories</h1>
              <p className="text-sm font-semibold">(One Stop Services For Garments Accessories)</p>
            </div>
          </div>
        </div>

        {/* Address & Contact Info */}
        <div className="text-center text-xs font-bold space-y-0.5 border-b border-black pb-1 mb-4">
          <p>Address: 291, Inner circular road, Motijheel, Lift-7. Dhaka-1000</p>
          <p>Phone: 01810-424400, E-mail: egreenaccessoriesbd@gmail.com</p>
        </div>

        {/* Challan Badge & No. */}
        <div className="relative flex justify-center mb-6 pt-2">
          <div className="absolute left-0 top-0 flex items-center gap-2">
            <span className="font-bold text-sm">No.</span>
            <input
              type="number"
              value={data.challanNo}
              onChange={(e) => updateField("challanNo", parseInt(e.target.value) || 0)}
              className="text-xl font-bold bg-transparent outline-none border-b border-dotted border-transparent hover:border-gray-300 focus:border-black w-24"
            />
          </div>
          <span className="bg-gray-800 text-white px-6 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
            CHALLAN/GATE PASS
          </span>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] print:grid-cols-[1fr_auto] gap-x-12 gap-y-3 mb-6 px-2">
            <div className="space-y-3">
              <div className="flex items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">Name:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full bg-transparent outline-none px-1"
                  />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">Address:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full bg-transparent outline-none px-1"
                  />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <div className="flex-1 border-b border-dotted border-black min-h-[20px]">
                  {/* Second line of address if needed */}
                </div>
              </div>
              <div className="flex flex-wrap items-baseline gap-4">
                <div className="flex-1 flex items-baseline gap-1 min-w-[200px]">
                  <span className="font-bold whitespace-nowrap">Attn:</span>
                  <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                    <input
                      type="text"
                      value={data.attn}
                      onChange={(e) => updateField("attn", e.target.value)}
                      className="w-full bg-transparent outline-none px-1"
                    />
                  </div>
                </div>
                <div className="flex-1 flex items-baseline gap-1 min-w-[200px]">
                  <span className="font-bold whitespace-nowrap">Booking No:</span>
                  <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                    <input
                      type="text"
                      value={data.bookingNo}
                      onChange={(e) => updateField("bookingNo", e.target.value)}
                      className="w-full bg-transparent outline-none px-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 w-full md:w-64 print:w-64">
              <div className="flex items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">Date:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  <input
                    type="text"
                    value={data.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className="w-full bg-transparent outline-none px-1 text-center"
                  />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-bold whitespace-nowrap">Buyer:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  <input
                    type="text"
                    value={data.buyer}
                    onChange={(e) => updateField("buyer", e.target.value)}
                    className="w-full bg-transparent outline-none px-1"
                  />
                </div>
              </div>
              <div className="flex items-baseline gap-1 pt-0 md:pt-6 print:pt-6">
                <span className="font-bold whitespace-nowrap">Po/Order No:</span>
                <div className="flex-1 border-b border-dotted border-black min-h-[20px] flex items-end">
                  <input
                    type="text"
                    value={data.poOrderNo}
                    onChange={(e) => updateField("poOrderNo", e.target.value)}
                    className="w-full bg-transparent outline-none px-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* The Item Table Section - This will grow to fill space */}
          <div className="flex-1 flex flex-col min-h-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
