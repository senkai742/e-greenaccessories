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
    resetForm,
    exportHistory,
    importHistory
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

  // Extract unique item descriptions from history for suggestions
  const itemSuggestions = Array.from(new Set(
    history.flatMap(c => c.items.map(i => i.description))
      .filter(d => d && d.trim().length > 0)
  ));

  // Pagination logic: Chunk items into groups of 14
  const ITEMS_PER_PAGE = 14;
  const chunkedItems: typeof challan.items[] = [];
  for (let i = 0; i < challan.items.length; i += ITEMS_PER_PAGE) {
    chunkedItems.push(challan.items.slice(i, i + ITEMS_PER_PAGE));
  }
  if (chunkedItems.length === 0) chunkedItems.push([]);

  const renderChallanPages = (colorClass: string) => (
    <div className={colorClass}>
      {chunkedItems.map((chunk, index) => {
        const isLastPage = index === chunkedItems.length - 1;
        return (
          <div key={index} className={index > 0 ? "break-before-page mt-12 print:mt-0" : ""}>
            <ChallanForm
              data={challan}
              updateField={updateField}
              onPrint={handlePrint}
              onSave={handleSave}
            >
              <ChallanTable
                items={chunk}
                onUpdateItem={updateItem}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                total={calculateTotal()}
                suggestions={itemSuggestions}
                isLastPage={isLastPage}
              />
              <ChallanFooter />
            </ChallanForm>
          </div>
        );
      })}
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-200 py-12 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      <div className="max-w-[1400px] mx-auto">
        <header className="mb-8 print:hidden flex flex-col md:flex-row justify-between items-start md:items-center bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <img src="/logo.png" alt="E-GREEN Logo" className="h-12 w-auto shadow-lg shadow-emerald-200 rounded-lg" />
              <span className="text-slate-300 font-thin ml-1 mr-1">|</span>
              <span className="text-xl text-slate-600 font-bold">Digital Challan</span>
            </h1>
            <button
              onClick={handleNew}
              className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-sm active:scale-95 w-full sm:w-auto justify-center"
            >
              <Plus size={18} />
              New Challan
            </button>
          </div>
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 border-t md:border-t-0 pt-4 md:pt-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-[10px]">Next Serial</span>
            <div className="bg-emerald-600 text-white px-6 py-1 rounded-full text-2xl font-black shadow-lg shadow-emerald-200">
              #{challan.challanNo}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start print:block print:gap-0">
          <section className="relative overflow-x-auto pb-4 print:pb-0 print:overflow-visible">
            <div className="min-w-[800px] md:min-w-0 print:min-w-0">
              {/* Copy 1: White (Original) */}
              {renderChallanPages("copy-1")}

              {/* Copy 2: Pink/Purple (Hidden on screen, visible on print) */}
              <div className="hidden print:block">
                {renderChallanPages("copy-2")}
              </div>

              {/* Copy 3: Yellow/Green (Hidden on screen, visible on print) */}
              <div className="hidden print:block">
                {renderChallanPages("copy-3")}
              </div>
            </div>
          </section>

          <aside className="sticky top-12 print:hidden">
            <HistoryList
              history={history}
              onLoad={loadFromHistory}
              onExport={exportHistory}
              onImport={(data) => {
                if (importHistory(data)) {
                  alert("History imported successfully!");
                } else {
                  alert("Failed to import history. Please check the file format.");
                }
              }}
            />
          </aside>
        </div>

        <footer className="mt-12 text-center text-slate-400 text-xs print:hidden pb-8 font-bold uppercase tracking-widest opacity-50">
          &copy; {new Date().getFullYear()} E-Green Accessories &bull; Internal Management Portal
        </footer>
      </div>
    </main>
  );
}
