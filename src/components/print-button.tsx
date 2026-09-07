"use client";

import { Printer } from "@phosphor-icons/react";
import { siteConfig } from "@/lib/site";

export function PrintButton() {
  return (
    <button
      className="button button-secondary print-hidden"
      type="button"
      onClick={() => {
        window.open(siteConfig.resumePdf, "_blank", "noopener,noreferrer");
      }}
    >
      打印 PDF <Printer size={18} />
    </button>
  );
}
