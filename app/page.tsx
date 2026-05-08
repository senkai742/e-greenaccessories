"use client";

import { useState } from "react";
import { useChallan } from "../hooks/useChallan";
import { ChallanForm } from "../components/Challan/ChallanForm";
import { ChallanTable } from "../components/Challan/ChallanTable";
import { ChallanFooter } from "../components/Challan/ChallanFooter";
import { HistoryList } from "../components/Challan/HistoryList";

export default function ChallanDashboard() {
  const {
    challan,
    history,
    updateField,
    addItem,
    removeItem,
    updateItem,
    calculateTotal,
    saveChallan,
    loadFromHistory
  } = useChallan();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    saveChallan();
    alert("Challan saved to history!");
  };

  return (
    <main className="min-h-screen bg-slate-200 py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 no-print flex justify-between items-center bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xl">EG</div>
              Digital Challan
            </h1>
            <p className="mt-1 text-slate-500 font-medium">
              E-Green Accessories Management System
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Next Serial</span>
            <div className="bg-emerald-600 text-white px-4 py-1 rounded-full text-lg font-bold shadow-lg shadow-emerald-200">
              #{challan.challanNo}
            </div>
          </div>
        </header>

        <section className="relative">
          <ChallanForm
            data={challan}
            updateField={updateField}
            onPrint={handlePrint}
            onSave={handleSave}
            onToggleHistory={() => setIsHistoryOpen(true)}
          >
            <ChallanTable
              items={challan.items}
              onUpdateItem={updateItem}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              total={calculateTotal()}
            />
            <ChallanFooter />
          </ChallanForm>
        </section>

        <HistoryList
          history={history}
          onLoad={loadFromHistory}
          onClose={() => setIsHistoryOpen(false)}
          isOpen={isHistoryOpen}
        />

        <footer className="mt-12 text-center text-gray-400 text-sm no-print pb-8">
          &copy; {new Date().getFullYear()} E-Green Accessories. Digital Challan System v1.0
        </footer>
      </div>
    </main>
  );
}
