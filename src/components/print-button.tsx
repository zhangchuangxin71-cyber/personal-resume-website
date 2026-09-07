"use client";

import { Printer } from "@phosphor-icons/react";

export function PrintButton() {
  return (
    <button className="button button-secondary print-hidden" type="button" onClick={() => window.print()}>
      打印简历 <Printer size={18} />
    </button>
  );
}
