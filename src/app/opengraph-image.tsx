import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: 72,
        background: "#101416",
        color: "#d1cec5",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 820 }}>
        <div style={{ fontSize: 26, color: "#a84632" }}>{siteConfig.role}</div>
        <div style={{ fontSize: 74, lineHeight: 1.05, letterSpacing: "-0.05em", fontWeight: 600 }}>
          把复杂 AI 系统，做成可靠产品。
        </div>
      </div>
      <div style={{ display: "flex", width: 96, height: 96, border: "2px solid #a84632", alignItems: "center", justifyContent: "center", color: "#a84632", fontSize: 28 }}>
        {siteConfig.initials}
      </div>
    </div>,
    size,
  );
}
