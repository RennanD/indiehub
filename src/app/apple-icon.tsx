/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
import { ImageResponse } from "next/og";

// Configuração do ícone para Apple
export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Gera o ícone Apple
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--primary)", // bg-primary (violet-600)
        borderRadius: "40px",
      }}
    >
      {/* Ícone Spline em SVG */}
      <svg
        width="110"
        height="110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24" // text-accent (amber-400)
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 6.5a2.5 2.5 0 0 1-2.5 2.5H17l-2 2v-2H7a2.5 2.5 0 0 1-2.5-2.5V4a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 18.5 4v2.5ZM7 15h7l2 2v-2h2.5A2.5 2.5 0 0 0 21 12.5V10" />
        <path d="M3 10v2.5A2.5 2.5 0 0 0 5.5 15H7" />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
