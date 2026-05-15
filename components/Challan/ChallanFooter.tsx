"use client";

import React from "react";

export function ChallanFooter() {
  return (
    <div className="mt-auto pt-8 space-y-8">
      <p className="text-center text-sm font-bold italic">
        Disclaimer. It is requested to give inventory report within two days after delivery.
      </p>

      <div className="flex justify-between items-end pt-12 px-4">
        <div className="text-center w-48">
          <div className="border-t-[1.5px] border-black pt-1 text-sm font-bold">
            Receiver Signature
          </div>
        </div>
        <div className="text-center w-48">
          <div className="border-t-[1.5px] border-black pt-1 text-sm font-bold">
            Delivery By
          </div>
        </div>
        <div className="text-center w-48">
          <div className="border-t-[1.5px] border-black pt-1 text-sm font-bold">
            Authorized Signature
          </div>
        </div>
      </div>
    </div>
  );
}
