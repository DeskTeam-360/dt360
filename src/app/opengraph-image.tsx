import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #060818 0%, #0b0d2a 45%, #1a0f2e 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "linear-gradient(135deg, #ff8a3d 0%, #ff4d8d 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 800,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            D
          </div>
          <span
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "white",
              letterSpacing: -1,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {siteConfig.name}
          </span>
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: 900,
            fontSize: 34,
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.88)",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {siteConfig.description.slice(0, 160)}
          {siteConfig.description.length > 160 ? "…" : ""}
        </p>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#ff5a9a",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            Stop outsourcing · Start insourcing
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
