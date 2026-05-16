"use client";

import React from "react";

export function ChallanFooter() {
  return (
    <div className="mt-auto pt-4 space-y-4">
      <p className="text-center text-xs font-bold italic">
        Disclaimer. It is requested to give inventory report within two days after delivery.
      </p>

      <div className="flex justify-between items-end pt-8 px-4">
        <div className="text-center w-48">
          <div className="border-t-[1.5px] border-black pt-1 text-xs font-bold">
            Receiver Signature
          </div>
        </div>
        <div className="text-center w-48">
          <div className="border-t-[1.5px] border-black pt-1 text-xs font-bold">
            Delivery By
          </div>
        </div>
        <div className="text-center w-48">
          <div className="border-t-[1.5px] border-black pt-1 text-xs font-bold">
            Authorized Signature
          </div>
        </div>
      </div>
    </div>
  );
}
