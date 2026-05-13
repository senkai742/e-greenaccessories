"use client";

import { Plus } from "lucide-react";
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
    loadFromHistory,
    resetForm
  } = useChallan();

  const handlePrint = () => {
    saveChallan();
    window.print();
  };

  const handleSave = () => {
    saveChallan();
    alert("Challan saved to history!");
  };

  const handleNew = () => {
    if (confirm("Are you sure you want to start a new challan? Any unsaved changes will be lost.")) {
      resetForm();
    }
  };

  return (
    <main className="min-h-screen bg-slate-200 py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 no-print flex justify-between items-center bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-200">EG</div>
              Digital Challan
            </h1>
            <button
              onClick={handleNew}
              className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-sm active:scale-95"
            >
              <Plus size={18} />
              New Challan
            </button>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-[10px]">Next Serial</span>
            <div className="bg-emerald-600 text-white px-6 py-1 rounded-full text-2xl font-black shadow-lg shadow-emerald-200">
              #{challan.challanNo}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          <section className="relative">
            <ChallanForm
              data={challan}
              updateField={updateField}
              onPrint={handlePrint}
              onSave={handleSave}
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

          <aside className="sticky top-12">
            <HistoryList
              history={history}
              onLoad={loadFromHistory}
            />
          </aside>
        </div>

        <footer className="mt-12 text-center text-slate-400 text-xs no-print pb-8 font-bold uppercase tracking-widest opacity-50">
          &copy; {new Date().getFullYear()} E-Green Accessories &bull; Internal Management Portal
        </footer>
      </div>
    </main>
  );
}
