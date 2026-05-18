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

  const handleDownloadPDF = async () => {
    saveChallan();
    
    const loader = document.createElement("div");
    loader.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); z-index: 999999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: sans-serif; pointer-events: all;">
        <div style="border: 4px solid #f3f3f3; border-top: 4px solid #10b981; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
        <p style="margin-top: 20px; font-weight: bold; font-size: 16px;">Generating Pixel-Perfect PDF...</p>
        <p style="margin-top: 6px; font-size: 12px; color: #a1a1aa;">Rendering copies client-side for consistent mobile output.</p>
        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
      </div>
    `;
    document.body.appendChild(loader);

    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");

      // Query the print container copies
      const containers = Array.from(document.querySelectorAll(".print-only-copy .challan-container"));
      
      if (containers.length === 0) {
        throw new Error("No print pages found.");
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      for (let idx = 0; idx < containers.length; idx++) {
        const container = containers[idx] as HTMLElement;
        const parent = container.parentElement as HTMLElement;

        // Apply temporary class to position copy properly for capturing
        parent.classList.add("html2canvas-capture");

        // Wait a frame for browser to render
        await new Promise((resolve) => setTimeout(resolve, 150));

        const canvas = await html2canvas(container, {
          scale: 2.2, // Extremely sharp resolution
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });

        parent.classList.remove("html2canvas-capture");

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        
        if (idx > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
      }

      pdf.save(`challan_${challan.challanNo || "draft"}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF. Falling back to native browser printing...");
      window.print();
    } finally {
      document.body.removeChild(loader);
    }
  };

  const handlePrint = () => {
    saveChallan();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      handleDownloadPDF();
    } else {
      window.print();
    }
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

  // Helper to estimate the number of row units a description takes up
  const getItemHeightUnits = (description: string): number => {
    if (!description) return 1;
    const lines = description.split('\n');
    let totalUnits = 0;
    for (const line of lines) {
      // 50 characters is a safe limit for one line in A4 description column
      totalUnits += Math.max(1, Math.ceil(line.length / 50));
    }
    return Math.max(1, totalUnits);
  };

  // Dynamic pagination logic:
  const MAX_HEIGHT_UNITS = 20;
  const chunkedItems: typeof challan.items[] = [];
  let currentChunk: typeof challan.items = [];
  let currentUnits = 0;

  for (const item of challan.items) {
    const itemUnits = getItemHeightUnits(item.description);
    
    if (currentUnits + itemUnits > MAX_HEIGHT_UNITS && currentChunk.length > 0) {
      chunkedItems.push(currentChunk);
      currentChunk = [item];
      currentUnits = itemUnits;
    } else {
      currentChunk.push(item);
      currentUnits += itemUnits;
    }
  }
  if (currentChunk.length > 0) {
    chunkedItems.push(currentChunk);
  }
  if (chunkedItems.length === 0) chunkedItems.push([]);

  const renderChallanPages = (colorClass: string, isReadOnly: boolean = true) => (
    <div className={colorClass}>
      {chunkedItems.map((chunk, index) => {
        const isLastPage = index === chunkedItems.length - 1;
        return (
          <div key={index} className={index > 0 ? "break-before-page mt-12 print:mt-0" : ""}>
            <ChallanForm
              data={challan}
              updateField={updateField}
              onPrint={handlePrint}
              onDownloadPDF={handleDownloadPDF}
              onSave={handleSave}
              isReadOnly={isReadOnly}
            >
              <ChallanTable
                items={chunk}
                onUpdateItem={updateItem}
                onAddItem={addItem}
                onRemoveItem={removeItem}
                total={calculateTotal()}
                suggestions={itemSuggestions}
                isLastPage={isLastPage}
                isReadOnly={isReadOnly}
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
              
              {/* INTERACTIVE SCREEN VERSION (Hidden on print) */}
              <div className="print:hidden">
                {renderChallanPages("screen-copy", false)}
              </div>

              {/* Copy 1: White (Print only) */}
              <div className="print-only-copy">
                {renderChallanPages("copy-1", true)}
              </div>

              {/* Copy 2: Pink/Purple (Print only) */}
              <div className="print-only-copy">
                {renderChallanPages("copy-2", true)}
              </div>

              {/* Copy 3: Yellow/Green (Print only) */}
              <div className="print-only-copy">
                {renderChallanPages("copy-3", true)}
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
