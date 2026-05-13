"use client";

import { useState, useEffect, useCallback } from "react";
import { ChallanData, ChallanItem } from "../types/challan";

const INITIAL_CHALLAN_NO = 1;

/**
 * Custom hook to manage Challan state, persistence, and logic.
 */
export function useChallan() {
  const [challan, setChallan] = useState<ChallanData>({
    id: crypto.randomUUID(),
    challanNo: INITIAL_CHALLAN_NO,
    date: new Date().toISOString().split("T")[0],
    name: "",
    address: "",
    buyer: "",
    attn: "",
    bookingNo: "",
    poOrderNo: "",
    items: [
      { id: crypto.randomUUID(), slNo: 1, description: "", orderQty: "", deliveryQty: "", remark: "" }
    ],
    createdAt: new Date().toISOString(),
  });

  const [history, setHistory] = useState<ChallanData[]>([]);

  // Load last challan number and history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("challan_history");
    const lastNo = localStorage.getItem("last_challan_no");

    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    if (lastNo) {
      setChallan(prev => ({ ...prev, challanNo: parseInt(lastNo) + 1 }));
    }
  }, []);

  const updateField = (field: keyof ChallanData, value: string | number) => {
    setChallan(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    setChallan(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: crypto.randomUUID(),
          slNo: prev.items.length + 1,
          description: "",
          orderQty: "",
          deliveryQty: "",
          remark: ""
        }
      ]
    }));
  };

  const removeItem = (id: string) => {
    setChallan(prev => {
      const filteredItems = prev.items.filter(item => item.id !== id);
      // Re-index Sl. No
      const reindexedItems = filteredItems.map((item, index) => ({
        ...item,
        slNo: index + 1
      }));
      return { ...prev, items: reindexedItems };
    });
  };

  const updateItem = (id: string, field: keyof ChallanItem, value: string | number) => {
    setChallan(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const calculateTotal = useCallback(() => {
    return challan.items.reduce((sum, item) => {
      const qty = parseFloat(String(item.deliveryQty)) || 0;
      return sum + qty;
    }, 0);
  }, [challan.items]);

  const saveChallan = () => {
    const newHistory = [challan, ...history];
    setHistory(newHistory);
    localStorage.setItem("challan_history", JSON.stringify(newHistory));
    localStorage.setItem("last_challan_no", String(challan.challanNo));
    
    // Prepare for next challan
    setChallan({
      id: crypto.randomUUID(),
      challanNo: challan.challanNo + 1,
      date: new Date().toISOString().split("T")[0],
      name: "",
      address: "",
      buyer: "",
      attn: "",
      bookingNo: "",
      poOrderNo: "",
      items: [
        { id: crypto.randomUUID(), slNo: 1, description: "", orderQty: "", deliveryQty: "", remark: "" }
      ],
      createdAt: new Date().toISOString(),
    });
  };

  const loadFromHistory = (data: ChallanData) => {
    setChallan({
      ...data,
      id: crypto.randomUUID(), // New ID for a new instance based on history
    });
  };

  const resetForm = () => {
    const lastNo = localStorage.getItem("last_challan_no");
    const nextNo = lastNo ? parseInt(lastNo) + 1 : INITIAL_CHALLAN_NO;
    
    setChallan({
      id: crypto.randomUUID(),
      challanNo: nextNo,
      date: new Date().toISOString().split("T")[0],
      name: "",
      address: "",
      buyer: "",
      attn: "",
      bookingNo: "",
      poOrderNo: "",
      items: [
        { id: crypto.randomUUID(), slNo: 1, description: "", orderQty: "", deliveryQty: "", remark: "" }
      ],
      createdAt: new Date().toISOString(),
    });
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `challan_history_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importHistory = (jsonData: string) => {
    try {
      const importedData = JSON.parse(jsonData);
      if (Array.isArray(importedData)) {
        // Merge with existing history or replace? User likely wants to merge/append
        // For simplicity and safety, let's merge unique IDs
        const existingIds = new Set(history.map(item => item.id));
        const newItems = importedData.filter(item => !existingIds.has(item.id));
        
        const updatedHistory = [...newItems, ...history];
        setHistory(updatedHistory);
        localStorage.setItem("challan_history", JSON.stringify(updatedHistory));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to import history:", e);
      return false;
    }
  };

  return {
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
  };
}
